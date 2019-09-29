const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Vendor
let Vendor = new Schema({
    vendor_code: {
    type: String
  },
    vendor_name: {
    type: String
  },
    vendor_address: {
    type: String
  },
    vendor_contact_no1: {
    type: String
  },
    vendor_contact_no2: {
    type: String
  },
    vendor_email: {
    type: String
  },
    contact_person: {
    type: String
  },
    telephone_no: {
    type: String
  },
    mobile_no: {
    type: String
  },
    email: {
    type: String
  },
    vendor_status: {
    type: String
  }
},{
    collection: 'vendor'
});

module.exports = mongoose.model('Vendor', Vendor);