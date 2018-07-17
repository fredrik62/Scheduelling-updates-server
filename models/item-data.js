const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
  
    data: { type: Array },
    updated: { type: Date, default: Date.now }
  
});


const item = mongoose.model("item", itemSchema);

module.exports = item;

