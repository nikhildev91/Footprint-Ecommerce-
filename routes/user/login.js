var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper')


const isUser = true;


/* GET users listing. */

router.get('/logout', function(req, res, next) {
  req.session.isLoggedin = null;
  req.session.user = null;
  res.redirect('/login');
});

router.get('/', function(req, res, next) {
  if(req.session.isLoggedin){
    res.redirect('/');
  }else{
    var errMsg = req.session.errMsg
    req.session.errMsg = null;
    res.render('user/login',{isUser, errMsg});
    
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

module.exports = router;
