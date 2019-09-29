const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Agreement
let Agreement = new Schema({
    agreement_no: {
    type: String
  },
    vendor: {
    type: String
  },
    agreement_name: {
    type: String
  },
    agreement_type: {
    type: String
  },
    agreement_category: {
    type: String
  },
    start_date: {
    type: Date
  },
    renewal_period: {
    type: String
  },
    end_date: {
    type: Date
  },
    agreement_status: {
    type: String
  },
    vendor_rating: {
    type: String
  },
    agreement_comment: {
    type: String
  }

},{
    collection: 'agreement'
});

module.exports = mongoose.model('Agreement', Agreement);