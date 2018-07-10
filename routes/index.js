var express = require('express');
var router = express.Router();
const cron = require("node-cron");
const fs = require("fs");
const axios = require('axios');

const geAPI = "https://rsbuddy.com/exchange/summary.json";

/* GET home page. */
cron.schedule("* * * * *", function() {
router.get('/', function(req, res, next) {
    axios.get(geAPI)
    .then(function (response) {
      console.log(response)
      console.log("running a task every minute");
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status === 404) {
            return res.status(404).json({code: 'Item not found'});
        }
        
      }
    });
    
  });
});

module.exports = router;
