var express = require('express');
var router = express.Router();
const ItemGraph = require('../models/item-graph');

router.get('/:id', function (req, res) {
  const itemId = req.params.id


  ItemGraph.find({}, function (err, data) {
    if (err) {
      console.log("Oops, something went wrong");
       next();
    }
    res.json(data);

  })


})
 


module.exports = router;