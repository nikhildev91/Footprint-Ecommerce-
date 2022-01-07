var express = require('express');
var router = express.Router();

const isUser = true;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/signup', { isUser });
});

module.exports = router;
