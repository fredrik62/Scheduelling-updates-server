var express = require('express');
var router = express.Router();
const Item = require('../models/item-data');

router.get('/', function (req, res) {
  Item.find({}, function (err, data) {
    if (err) {
      res.send("Oops, something went wrong");
      next();
    }
    res.json(data);

  })


})
 


module.exports = router;