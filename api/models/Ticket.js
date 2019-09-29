const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Ticket
let Ticket = new Schema({
    ticket_no: {
    type: String
  },
    asset_serial: {
    type: String
  },
    identified_issue: {
    type: String
  },
    criticality_rating: {
    type: String
  },
    ticket_branch: {
    type: String
  },
    authorized_person: {
    type: String
  },
    sender: {
    type: String
  },
    sender_name: {
    type: String
  },
    received_by: {
    type: String
  },
    received_by_name: {
    type: String
  },
    ticket_status: {
    type: String
  },
    tracking_status: {
    type: String
  },
    ticket_create_date: {
    type    : Date,
  },
    ticket_received_date: {
    type    : Date
  },
    ticket_closing_comment: {
    type    : String,
  },
    ticket_closing_date: {
    type    : Date
  }

},{
    collection: 'ticket'
});

module.exports = mongoose.model('Ticket', Ticket);