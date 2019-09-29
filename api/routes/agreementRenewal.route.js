const express = require('express');
const app = express();
const agreementRenewalRoutes = express.Router();

// Require 'AgreementRenewal' model in our routes module
let AgreementRenewal = require('../models/AgreementRenewal');

// Defined store route
agreementRenewalRoutes.route('/add').post(function (req, res) {
  let agreementRenewal = new AgreementRenewal(req.body);
  agreementRenewal.save()
    .then(agreementRenewal => {
      res.status(200).json({'agreementRenewal': 'Agreement is renewed successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
/*agreementRenewalRoutes.route('/').get(function (req, res) {
    Vendor.find(function (err, vendors){
    if(err){
      console.log(err);
    }
    else {
      res.json(vendors);
      
    }
  });
});

// Defined edit route
agreementRenewalRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Vendor.findById(id, function (err, vendor){
      res.json(vendor);
  });
});

//  Defined update route
agreementRenewalRoutes.route('/update/:id').post(function (req, res) {
  Vendor.findById(req.params.id, function(err, vendor) {
    if (!vendor)
      return next(new Error('Could not load Document'));
    else {
      vendor.vendor_code = req.body.vendor_code;
      vendor.vendor_name = req.body.vendor_name;
      vendor.vendor_address = req.body.vendor_address;
      vendor.vendor_contact_no1 = req.body.vendor_contact_no1;
      vendor.vendor_contact_no2 = req.body.vendor_contact_no2;
      vendor.vendor_email = req.body.vendor_email;
      vendor.telephone_no = req.body.telephone_no;
      vendor.mobile_no = req.body.mobile_no;
      vendor.email = req.body.email;
      vendor.vendor_status = req.body.vendor_status;

      vendor.save().then(vendor => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});




agreementRenewalRoutes.route('/show').get(function (req, res) {
  var query = Vendor.findOne().sort({vendor_code:-1.0}).limit(1);
  query.exec(function (err, vendorCode){
    if(err){
      console.log(err);
    }
    else {
      res.json(vendorCode);
      
    }
});

});*/




module.exports = agreementRenewalRoutes;