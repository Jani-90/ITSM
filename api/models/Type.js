const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Model
let Type = new Schema({
    type_id: {
    type: Number
  },
    type_category_name: {
    type: String
  },
    type_name: {
    type: String
  },
    code_pattern: {
    type: String
  },
    configuration_type: {
    type: String
  },
    type_status: {
    type: String
  }
},{
    collection: 'type'
});

module.exports = mongoose.model('Type', Type);