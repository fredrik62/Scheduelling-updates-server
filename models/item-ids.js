const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemIdSchema = new Schema({
  
    id: { type: Array },
  
  
});


const itemId = mongoose.model("digit", itemIdSchema);

module.exports = itemId;
