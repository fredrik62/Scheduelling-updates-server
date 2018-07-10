var express = require('express');
var router = express.Router();
const axios = require('axios');
const Item = require('../models/item-data');
const geAPI = "https://rsbuddy.com/exchange/summary.json";

module.exports = {

  getMeData: function (req, res) {
    axios.get(geAPI)
      .then(function (response) {
        console.log("running a task every minute");
        const priceData = response.data;
        var newItemData = Item({
         data: priceData
          
      
          

      })
      newItemData.save()
      .then(item => {
        console.log(item + " saved to database");
      })
      .catch(function (error) {
        console.log(error);
      });
          
      })

  
  
  }
}