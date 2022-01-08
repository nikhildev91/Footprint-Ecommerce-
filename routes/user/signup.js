var express = require('express');
var router = express.Router();

const isUser = true;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/signup', { isUser });
});

router.get('/otp-verification',(req, res, next)=>{
  res.render('user/signup-otp',{isUser, otpverify:true})
});

router.post('/',(req, res, next)=>{

  console.log(req.body);
  res.render('user/signup-otp',{isUser, otpverify:true})
})

module.exports = router;
