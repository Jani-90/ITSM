const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Asset
let Asset = new Schema({
    asset_category: {
    type: String
  },
    asset_type: {
    type: String
  },
    asset_serial: {
    type: String
  },
    asset_barcode: {
    type: String
  },
    asset_name: {
    type: String
  },
    asset_classification: {
    type: String
  },
    asset_location: {
    type: String
  },
    asset_owner_IT: {
    type: String
  },
    asset_branch: {
    type: String
  },
    asset_owner_branch: {
    type: String
  },
    asset_company: {
    type: String
  },
    asset_code: {
    type: String
  },
    asset_make: {
    type: String
  },
    asset_model: {
    type: String
  },
    asset_status: {
    type: String
  },
    processor: {
    type: String
  },
    RAM: {
    type: String
  },
    hard_disk: {
    type: String
  },
    display: {
    type: String
  },
    os: {
    type: String
  },
    installed_sw: {
    type: String
  },
    description: {
    type: String
  },
    purchased_date: {
    type: Date
  },
    warranty_period: {
    type: String
  }
},{
    collection: 'asset'
});

module.exports = mongoose.model('Asset', Asset);