const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Branch
let Branch = new Schema({
    branch_id: {
    type: Number
  },
    branch_name: {
    type: String
  },
    branch_code: {
    type: String
  },
    branch_status: {
    type: String
  }

},{
    collection: 'branch'
});

module.exports = mongoose.model('Branch', Branch);