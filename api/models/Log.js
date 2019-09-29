const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Log
let Log = new Schema({
    log_type: {
    type: String
  },
    log_id: {
    type: String
  },
    log_date: {
    type: Date
  },
    log_status: {
    type: String
  },
    log_comment: {
    type: String
  }

},{
    collection: 'log'
});

module.exports = mongoose.model('Log', Log);