var express = require('express');
var router = express.Router();
const itemId = require('../models/item-ids');

router.get('/', function (req, res) {
  itemId.find({}, function (err, data) {
    if (err) {
      console.log("Oops, something went wrong");
       next();
    }
    res.json(data);

  })


})
 


module.exports = router;