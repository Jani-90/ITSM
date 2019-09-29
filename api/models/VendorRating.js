const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for VendorRating
let VendorRating = new Schema({
    vendor: {
    type: String
  },
    comment: {
    type: String
  },
    vendor_rating: {
    type: String
  },
    create_date: {
    type    : Date
  }

},{
    collection: 'VendorRating'
});

module.exports = mongoose.model('VendorRating', VendorRating);