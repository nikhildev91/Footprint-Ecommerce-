var express = require('express');
var router = express.Router();

const isUser = true;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index', { isUser , isUserIndex : true });
});

router.get('/search-result', function(req, res, next) {
  res.render('user/search-result', {isUser});
});



router.get('/category-men', function(req, res, next) {
  res.render('user/mencategoryprodudts', {isUser});
});

router.get('/product-details', function(req, res, next) {
  res.render('user/product-details', {isUser});
});

module.exports = router;
