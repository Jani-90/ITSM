const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AssetAuditTrail
let AssetAuditTrail = new Schema({
    asset_code: {
    type: String
  },
    asset_serial: {
    type: String
  },
    asset_barcode: {
    type: String
  },
    action: {
    type: String
  },
    create_by: {
    type: String
  },
    create_date: {
    type: Date
  },
  create_by_name: {
    type: String
  }

},{
    collection: 'assetAuditTrail'
});

module.exports = mongoose.model('AssetAuditTrail', AssetAuditTrail);