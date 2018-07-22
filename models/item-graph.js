const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const graphSchema = new Schema({
  
    data: { type: Array },
    updated: { type: Date, default: Date.now }
  
});


const graph = mongoose.model("graph", graphSchema);

module.exports = graph;