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
router.get('/', function(req, res, next) {
  if (req.session.isLoggedin || req.session.otpUserLoggedin || req.session.isFreshUserLoggedin){
    res.redirect('/')

  }else{
    userHelper.takeCategory().then((category)=>{
    let err = req.session.SignupErr 
    req.session.SignupErr = null
    res.render('user/signup', { isUser, err, category});
    })

  }
});


router.post('/',(req, res, next)=>{
var NewUserData = req.body;
userHelper.checkIsUser(NewUserData.phone, NewUserData.email).then((response)=>{
  if(response){
    req.session.SignupErr = "Your Email and Mobile Number is already existed"
    res.redirect('/signup')
  }else{

    req.session.newUser = NewUserData

    

        client.verify
        .services(serviceSSID)
        .verifications.create({
        to: `+91${NewUserData.phone}`,
        channel: "sms"
        })
        .then((resp)=>{
        res.redirect('/signup/otp')
        }).catch((resp)=>{
          res.send(resp)
        })
      }
})
});
router.get('/otp',(req, res, next)=>{

  if(req.session.isLoggedin || req.session.otpUserLoggedin || req.session.isFreshUserLoggedin){
    res.redirect('/')
  }else{

    let otperr = req.session.otpErr
  
    req.session.otpErr = null;
    res.render('user/otp',{isUser, otpverify:true, otperr})
  }


});

router.post('/otp', (req, res,next)=>{
  // console.log(req.body.code);

  console.log(req.session.newUser);

  var phoneNumber = req.session.newUser.phone

  client.verify
.services(serviceSSID)
.verificationChecks.create({
  to: `+91${phoneNumber}`,
  code: req.body.code
}).then((resp)=>{

  console.log(resp.valid);

  if(resp.valid){

    userHelper.insertNewUserData(req.session.newUser).then((response)=>{
      if(response.status){
        req.session.freshUser = response.user;
        req.session.isFreshUserLoggedin = true;
        res.redirect('/')
      }
    })
    

  }else{
    req.session.otpErr = "Incorrect OTP"
    res.redirect('/signup')
  }

 

}).catch((err)=>{
  console.log(err);
})
})

module.exports = router;
