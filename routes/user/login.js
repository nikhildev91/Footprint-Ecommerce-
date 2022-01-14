var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper');
require('dotenv').config()

const serviceSSID = process.env.serviceSSID
const accountSSID = process.env.accountSSID
const authToken = process.env.authToken


const client = require('twilio')(accountSSID, authToken)


const isUser = true;

let category;
router.use(function(req, res, next) {
  
  category = req.session.category;
   
  next();
});


/* GET users listing. */

router.get('/logout', function(req, res, next) {
  req.session.isLoggedin = null;
  req.session.user = null;
  res.redirect('/login');
});

router.get('/', function(req, res, next) {
  if(req.session.isLoggedin || req.session.otpUserLoggedin || req.session.isFreshUserLoggedin){
    res.redirect('/');
  }else{
    userHelper.takeCategory().then((category)=>{
    let loginMob = req.session.loginMob;
    req.session.loginMob = null;
    var errMsg = req.session.errMsg
    req.session.errMsg = null;
    res.render('user/login',{isUser, errMsg, loginMob, category});
    })
    
  }
  
});

router.post('/', function(req, res, next) {



var userLoginData = req.body;


userHelper.findUser(userLoginData).then((response)=>{
 
  if(response.user){
    req.session.user = response.user;
    req.session.isLoggedin = response.status;
    
    res.redirect('/');
  }else{
    req.session.errMsg = response.errorMsg
    res.redirect('/login');
  }
})

 
});

router.post('/mobile', (req, res, next)=>{
  let number = req.body.phone

  userHelper.findPhone(number).then((response)=>{
    if(response){
      client.verify
      .services(serviceSSID)
      .verifications.create({
      to: `+91${number}`,
      channel: "sms"
      })
      .then((resp)=>{
        req.session.loginOtpMobNum = number
      res.redirect('/login')
      });

    }else{
      req.session.loginMob = "Sorry You Haven't Account"
      res.redirect('/login')
    }
  })
});

router.post('/otp',(req, res, next)=>{
  let otpCode = req.body.otp;
  console.log(otpCode);


  let otpNumber = req.session.loginOtpMobNum

  client.verify
.services(serviceSSID)
.verificationChecks.create({
  to: `+91${otpNumber}`,
  code: otpCode
}).then((resp)=>{

  console.log(resp.valid);

  if(resp.valid){

    userHelper.findUserWithOtpPhone(otpNumber).then((response)=>{

      if(response.status){
        req.session.userOtp = response.otpUser
        req.session.otpUserLoggedin = response.status
        res.redirect('/')
      }

    })


  }else{

    res.redirect('/login')
   
  }

 

}).catch((err)=>{
  console.log(err);
})



})

module.exports = router;
