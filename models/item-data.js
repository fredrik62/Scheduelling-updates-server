const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
  
    data: { type: Object },
    // id: { type: Number },
    // name: { type: String},
    // members: { type: String},
    // sp: { type: Number },
    // buy_average: { type: Number },
    // buy_quantity: { type: Number },
    // sell_average: { type: Number },
    // sell_quantity: { type: Number },
    // overall_average: { type: Number },
    // overall_quantity: { type: Number },
   
  
});


const item = mongoose.model("item", itemSchema);

module.exports = item;

