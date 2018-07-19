const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemIdSchema = new Schema({
  
    id: { type: Array },
    updated: { type: Date, default: Date.now }
  
  
});


const itemId = mongoose.model("item-id", itemIdSchema);

module.exports = itemId;
