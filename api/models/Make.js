const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Make
let Make = new Schema({
    make_id: {
    type: String
  },
  make_name: {
    type: String
  },
  make_status: {
    type: String
  }
},{
    collection: 'make'
});

module.exports = mongoose.model('Make', Make);