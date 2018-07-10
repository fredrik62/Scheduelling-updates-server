var express = require('express');
var router = express.Router();
const axios = require('axios');
const geAPI = "https://rsbuddy.com/exchange/summary.json";

(function getMeData(req, res) {
  axios.get(geAPI)
    .then(function (response) {
      console.log("running a task every minute");
      // var data = response.data;  //response.data contains 3000 objects
// res.send(data);  says that data is undefined though? timining issue perhaps? with breakpoints ,
      //I am able to see the correct data
      
    })
    .catch(function (error) {
     console.log(error);
    });
})();



module.exports = router;