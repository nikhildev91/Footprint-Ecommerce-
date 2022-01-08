var express = require('express');
var router = express.Router();
var adminHelper = require('../../helpers/admin-helper')

const isadmin = true

/* GET users listing. */

router.get('/', function(req, res, next) {
  if(req.session.isadminLoggedin){

    res.render('admin/index',{isadmin});
  }else{
    res.redirect('/admin/login');
  }
});

router.get('/login', function(req, res, next) {
  if(req.session.isadminLoggedin){
    res.redirect('/admin');
  }else{

    res.render('admin/login',{isadmin, adminLogin : true});
  }
  });

  router.post('/login',(req, res, next)=>{
    var adminLoginData = req.body;
    adminHelper.findAdmin(adminLoginData).then((adminResponse)=>{

      if(adminResponse){
        req.session.admin = adminResponse.admin;
        req.session.isadminLoggedin = adminResponse.status;

        res.redirect('/admin')
      }else{
        res.redirect('/admin/login')
      }

    })

  });

  router.get('/logout',(req,res,next)=>{
    console.log("admin Logout");
    req.session.isadminLoggedin =null;
    req.session.admin =null;
    res.redirect('/admin/login')
  })

router.get('/add-product', function(req, res, next) {
    res.render('admin/add-product',{isadmin});
  });

  router.get('/edit-product', function(req, res, next) {
    res.render('admin/edit-product',{isadmin});
  });

  router.get('/manage-products', function(req, res, next) {
    res.render('admin/manage-products',{isadmin});
  });

  router.get('/manage-users', function(req, res, next) {
    res.render('admin/manage-user',{isadmin});
  });







module.exports = router;