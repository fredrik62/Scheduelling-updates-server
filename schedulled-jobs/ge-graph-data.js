const express = require('express');
const router = express.Router();
const axios = require('axios');
const base_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
const graph_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/graph/';

//db collections
const Item = require('../models/item-data');
const ItemId = require('../models/item-ids');

//FINAL COLLECTION WHERE THE WANTED DATA IS

const GraphData = require('../models/item-graph');



const getItem = (id) => {
  
  // return axios.get(base_URL + id);

  for (var i = 0; i < id.length; i++) {
    console.log(base_URL + id[i])
  }
 
}

const getItemGraph = (id) => {

    // return axios.get(graph_URL + id);
    for (var i = 0; i < id.length; i++) {
      console.log(graph_URL + id[i])
    }
  
}


module.exports = {
  
  getMeGraphData: function (req, res) {
  let linkId = [];
   Item.find( {} )
   .then((res) => {
     //removes all the previous ids so we don't store same information over and over again..
    ItemId.remove({})
    .then(() => {
      console.log("ids deleted");
       GraphData.remove({})
      .then(() => {
        console.log("graphs deleted");
        
      })
    })
     for (var key in res[0].data) {
       if (res[0].data.hasOwnProperty(key)) {
         //pushes all item ids to this array
         let id = {
           itemId: res[0].data[key].id
         }

         linkId.push(id.itemId);
         var numberIds = linkId.filter(Number); 
        }
      }

   
     //item-ids.js model
     var sendIdsToDB = ItemId({
     id: numberIds
     })
      //saves item ids to the database
      sendIdsToDB.save()
     .then(item => {
        console.log("saved to database");
        //go into the item id collection and get all the item ids for the axios request
        ItemId.find({}) 
        .then((item) => {
         const itemIdArray =  item[0].id;

        getItem(itemIdArray);
        getItemGraph(itemIdArray);
        
        // axios.all([getItem(), getItemGraph()])
        // .then(axios.spread((item, price) => {
            
        //     console.log(item);
        //     console.log(price);
  
            // const data = {
            //     itemData: itemData,
            //     graphData: graphData
            // }
          //   var graphInfo = GraphData({
          //     item: data.itemData,
          //     graph: data.graphData
          //     })

          //     //saves item and graph data for that item
          //     graphInfo.save()
          //    .then(item => {
          //     console.log(item + "graph data saved to database");
          //  })
  
        // }
      // ))
    })
                .catch((error) => {
                  console.log(error);
                  
                 })
  })  
  
      
 
})
}}

      
  
  
  

  
  
  

  
  
