const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Category
let Category = new Schema({
    category_id: {
    type: Number
  },
    category_name: {
    type: String
  },
    category_status: {
    type: String
  }
},{
    collection: 'category'
});

module.exports = mongoose.model('Category', Category);