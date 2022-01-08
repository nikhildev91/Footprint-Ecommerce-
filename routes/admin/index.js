var express = require('express');
var router = express.Router();

const isadmin = true

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/index',{isadmin});
});

router.get('/login', function(req, res, next) {
    res.render('admin/login',{isadmin, adminLogin : true});
  });

  router.post('/login',(req, res, next)=>{
    console.log(req.body);
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