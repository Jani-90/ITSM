const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AgreementRenewal
let AgreementRenewal = new Schema({
    agreement_no: {
    type: String
  },
    renew_date: {
    type: Date
  },
    new_end_date: {
    type: Date
  },
    vendor_rating: {
    type: String
  },
    comment: {
    type: String
  }

},{
    collection: 'AgreementRenewal'
});

module.exports = mongoose.model('AgreementRenewal', AgreementRenewal);