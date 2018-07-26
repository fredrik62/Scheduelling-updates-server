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

module.exports = {

  getMeGraphData: function (req, res) {
    let linkId = [];
    Item.find({})
      .then((res) => {
        //removes all the previous ids so we don't store same information over and over again..
        ItemId.remove({})
          .then(() => {
            console.log("ids deleted");
            GraphData.remove({})
              .then(() => {
                console.log("graphs deleted");

                for (var key in res[0].data) {
                  if (res[0].data.hasOwnProperty(key)) {
                    //pushes all item ids to this array
                    //these ids will be sent to a db collection then also used in this file
                    let id = {
                      itemId: res[0].data[key].id
                    }

                    linkId.push(id.itemId);
                    var numberIds = linkId.filter(Number);
                  }
                }

                //item-ids.js model
                //here the ids get sent to db
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
                        const itemIdArray = item[0].id;
                        //length of idarray (arrlength)
                        const arrLength = itemIdArray.length;
                        for (var j = 0; j < arrLength; j++) {
                          let urlArray = [base_URL + itemIdArray[j], graph_URL + itemIdArray[j] + '.json'] // unknown # of urls (1 or more)

                          let promiseArray = urlArray.map(url => axios.get(url));
                          axios.all(promiseArray)
                            .then(function (results) {

                              var temp = results.map(r => r.data.item);
                              console.log(temp);
                              var graph = GraphData({
                                item: temp

                              })

                              graph.save()
                                .then(item => {
                                  console.log("graphdata saved to db!!!");
                                })

                                .catch((error) => {
                                  console.log(error);

                                })
                            })



                        }

                      })
                  })

              })
          })
      })
  }
}