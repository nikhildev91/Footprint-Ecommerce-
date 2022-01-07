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

router.get('/add-product', function(req, res, next) {
    res.render('admin/add-product',{isadmin});
  });




module.exports = router;