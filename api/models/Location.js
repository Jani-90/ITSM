const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Make
let Location = new Schema({
    location_code: {
    type: String
  },
    location_name: {
    type: String
  },
    location_status: {
    type: String
  }
},{
    collection: 'location'
});

module.exports = mongoose.model('Location', Location);