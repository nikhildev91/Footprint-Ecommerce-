var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper');


const isUser = true;

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.isLoggedin){
    res.redirect('/')
  }else{
    
    res.render('user/signup', { isUser });
  }
});

router.get('/otp-verification',(req, res, next)=>{
  res.render('user/signup-otp',{isUser, otpverify:true})
});

router.post('/',(req, res, next)=>{

  console.log(req.body);
var NewUserData = req.body;

userHelper.insertNewUserData(NewUserData).then((response)=>{
  if (response.status){
    req.session.user = response.user;
    req.session.isLoggedin = response.status;
    res.redirect('/');
  }else{
    res.redirect('/signup');
  }
})



})

module.exports = router;
