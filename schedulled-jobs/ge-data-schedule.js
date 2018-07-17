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
        const allItemData = [];
        Item.remove({})
        .then(() => {
          console.log("database deleted");
        })

        for (var key in priceData) {
          if (priceData.hasOwnProperty(key)) {
            let data = {
              id: priceData[key].id,
              name: priceData[key].name,
              members: priceData[key].members,
              sp: priceData[key].sp,
              buy_average: priceData[key].buy_average,
              buy_quantity: priceData[key].buy_quantity,
              sell_average: priceData[key].sell_average,
              sell_quantity: priceData[key].sell_quantity,
              overall_average: priceData[key].overall_average,
              overall_quantity: priceData[key].overall_quantity,
            }
             allItemData.push(data);
          }
      }
        
         var newItemData = Item({
         data: allItemData
    
          
         })
        newItemData.save()
        .then(item => {
          // console.log(item + " saved to database");
         })

        .catch(function (error) {
          console.log(error);
        });
        
      })
      
      
    
    }
  }
  
  
  
  