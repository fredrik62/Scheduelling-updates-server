var express = require('express');
var router = express.Router();
const ItemGraph = require('../models/item-graph');

router.get('/', function (req, res) {
  ItemGraph.find({}, function (err, data) {
    if (err) {
      console.log("Oops, something went wrong");
       next();
    }
    res.json(data);

  })


})
 


module.exports = router;