var express = require('express');
var router = express.Router();

const isUser = true;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index', { isUser , isUserIndex : true });
});

module.exports = router;
