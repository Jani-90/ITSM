const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Model
let Model = new Schema({
    model_id: {
    type: String
  },
    model_make_name: {
    type: String
  },
    model_name: {
    type: String
  },
    model_status: {
    type: String
  }
},{
    collection: 'model'
});

module.exports = mongoose.model('Model', Model);