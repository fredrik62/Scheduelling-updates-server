const express = require('express');
const router = express.Router();
const axios = require('axios');
const base_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
const graph_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/graph/';

//db collections
const Item = require('../models/item-data');
const ItemId = require('../models/item-ids');


let linkId = [];

const getItem = () => {
  return axios.get(base_URL + linkId);
}

const getItemGraph = () => {
  return axios.get(graph_URL + linkId +".json");
}


module.exports = {

  getMeGraphData: function (req, res) {
   Item.find( {} )
   .then((res) => {
     for (var key in res[0].data) {
       if (res[0].data.hasOwnProperty(key)) {
         //pushes all item ids to this array
         
         linkId.push(res[0].data[key].id);
        }
      }

     var numberIds = linkId.filter(Number); 

     var sendIdsToDB = ItemId({
     id: numberIds
  
       
      })

      sendIdsToDB.save()
     .then(item => {
        console.log("saved to database");
      })
      ItemId.find({}) 
      .then((ids) => {
        
      })  
      

      
     .catch((error) => {
       console.log(error);
       
      })
      
   })
  }}
  
  
  
  

  
  
  

  
  

  // axios.all([getItem(), getItemGraph()])
  //     .then(axios.spread((item, price) => {
          
  //         const itemData = item.data;
  //         const graphData = price.data;

  //         const data = {
  //             itemData: itemData,
  //             graphData: graphData
  //         }
  //     console.log(data);

  //     }
  // ))