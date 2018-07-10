var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/index', function(req, res, next) {
  console.log('respond with a resource');
});

module.exports = router;
