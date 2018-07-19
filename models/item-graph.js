const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const graphSchema = new Schema({
  
    item: { type: Object },
    graph: { type: Object },
    updated: { type: Date, default: Date.now }
  
});


const graph = mongoose.model("graph", graphSchema);

module.exports = graph;