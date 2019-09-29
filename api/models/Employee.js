const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Employee
let Employee = new Schema({
    employee_no: {
    type: String
  },
    employee_name: {
    type: String
  },
    employee_type: {
    type: String
  },
    designation: {
    type: String
  },
    company: {
    type: String
  },
    employee_branch: {
    type: String
  },
    employee_status: {
    type: String
  },
    username: {
    type: String
  },
    password: {
    type: String
  },
    user_role: {
    type: String
  }
},{
    collection: 'employee'
});

module.exports = mongoose.model('Employee', Employee);