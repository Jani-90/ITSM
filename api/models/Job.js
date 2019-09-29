const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Job
let Job = new Schema({
    jobNo: {
    type: String
  },
    ticket_no: {
    type: String
  },
    inspection_comment: {
    type: String
  },
    repairing_method: {
    type: String
  },
    jobCreated_by: {
    type: String
  },
    job_status: {
    type: String
  },
    job_create_date: {
    type    : Date
  },
    vendor_selected: {
    type: String
  },
    vendor_comment: {
    type: String
  },
    vendor_send_date: {
    type    : Date
  },
    quotation_no: {
    type: String
  },
    quotation_refNo: {
    type: String
  },
    quotation_amount: {
    type    : String
  },
    quotation_date: {
    type: Date
  },
    quotation_description: {
    type: String
  },
    quotation_attachment: {
    type    : String
  },
    quotation_approved_date: {
    type: Date
  },
    quotation_approvedBy: {
    type    : String
  },
    bill_no: {
    type: String
  },
    payment_amount: {
    type    : String
  },
    payment_date: {
    type: Date
  },
    payment_description: {
    type: String
  },
    payment_attachment: {
    type    : String
  },
    vendor_receive_date: {
    type: Date
  },
    vendor_rating: {
    type: String
  },
    vendor_receive_comment: {
    type    : String
  },
    inhouse_closing_comment: {
    type    : String
  }

},{
    collection: 'job'
});

module.exports = mongoose.model('Job', Job);