var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper')

const isUser = true;
let userSession;

router.use(function(req, res, next) {
  userSession = req.session.user;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index', { isUser , isUserIndex : true, userSession });
});

router.get('/search-result', function(req, res, next) {
  res.render('user/search-result', {isUser, userSession});
});



router.get('/category-men', function(req, res, next) {

  userHelper.getMenProducts().then((menProducts)=>{

    res.render('user/mencategoryprodudts', {isUser, userSession, menProducts});
  })
  


});

router.get('/product-details', function(req, res, next) {
  res.render('user/product-details', {isUser, userSession});
});

module.exports = router;
