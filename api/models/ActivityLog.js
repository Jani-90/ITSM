const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Activity Log
let ActivityLog = new Schema({
    activity: {
    type: String
  },
    create_by: {
    type: String
  },
    create_date: {
    type: Date
  }

},{
    collection: 'activityLog'
});

module.exports = mongoose.model('ActivityLog', ActivityLog);