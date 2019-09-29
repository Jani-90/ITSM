const express = require('express');
const app = express();
const assetRoutes = express.Router();

// Require 'Asset' model in our routes module
let Asset = require('../models/Asset');

// Defined store route
assetRoutes.route('/add').post(function (req, res) {
  let asset = new Asset(req.body);
  asset.save()
    .then(asset => {
      res.status(200).json({'asset': 'Asset is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
assetRoutes.route('/').get(function (req, res) {
  var query = Employee.find({"employee_type" : "ICT Staff"});
  query.exec(function (err, employees){
    if(err){
      console.log(err);
    }
    else {
      res.json(employees);
      
    }
  });
});

// Defined edit route
assetRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Employee.findById(id, function (err, employee){
      res.json(employee);
  });
});

// Defined edit route
assetRoutes.route('/editAsset/:id').get(function (req, res) {
  let id = req.params.id;
  Asset.findById(id, function (err, asset){
      res.json(asset);
  });
});

assetRoutes.route('/search/:asset_serial').get(function (req, res) {
  let asset_serial = req.params.asset_serial;
  var query = Asset.find({"asset_serial" : asset_serial});
  query.exec(function (err, searchSerial){
      res.json(searchSerial);
  });
});

assetRoutes.route('/search1/:asset_code').get(function (req, res) {
  let asset_code = req.params.asset_code;
  var query = Asset.find({"asset_code" : asset_code});
  query.exec(function (err, searchCode){
      res.json(searchCode);
  });
});

assetRoutes.route('/search2/:asset_barcode').get(function (req, res) {
  let asset_barcode = req.params.asset_barcode;
  var query = Asset.find({"asset_barcode" : asset_barcode});
  query.exec(function (err, searchBarcode){
      res.json(searchBarcode);
  });
});

//  Defined update route
/*assetRoutes.route('/update/:id').post(function (req, res) {
  Employee.findById(req.params.id, function(err, employee) {
    if (!employee)
      return next(new Error('Could not load Document'));
    else {
      employee.employee_type = req.body.employee_type;
      employee.employee_no = req.body.employee_no;
      employee.employee_name = req.body.employee_name;
      employee.username = req.body.username;
      employee.password = req.body.password;
      employee.employee_branch = req.body.employee_branch;
      employee.designation = req.body.designation;
      employee.company = req.body.company;
      employee.employee_status = req.body.employee_status;

      employee.save().then(employee => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});*/

assetRoutes.route('/update/:id').post(function (req, res) {
  Asset.findById(req.params.id, function(err, asset) {
    if (!asset)
      return next(new Error('Could not load Document'));
    else {
      asset.asset_make = req.body.asset_make;
      asset.asset_model = req.body.asset_model;
      asset.asset_name = req.body.asset_name;
      asset.asset_classification = req.body.asset_classification;
      asset.asset_location = req.body.asset_location;
      asset.asset_owner_IT = req.body.asset_owner_IT;
      asset.asset_branch = req.body.asset_branch;
      asset.asset_owner_branch = req.body.asset_owner_branch;
      asset.asset_company = req.body.asset_company;
      asset.processor = req.body.processor;
      asset.RAM = req.body.RAM;
      asset.hard_disk = req.body.hard_disk;
      asset.display = req.body.display;
      asset.os = req.body.os;
      asset.installed_sw = req.body.installed_sw;
      asset.description = req.body.description;
      asset.asset_status = req.body.asset_status;
      asset.purchased_date = req.body.purchased_date;
      asset.warranty_period = req.body.warranty_period;


      asset.save().then(asset => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


assetRoutes.route('/showAssetCode1/:asset_type').get(function (req, res) {
  let asset_type = req.params.asset_type;
  var query = Asset.findOne({"asset_type" : asset_type}).sort({_id:-1.0}).limit(1);
  query.exec(function (err, searchCode){
      res.json(searchCode);
  });
});

assetRoutes.route('/searchAsset/:asset_category/:asset_type').get(function (req, res) {
  let asset_category = req.params.asset_category;
  let asset_type = req.params.asset_type;
  var query = Asset.find({"asset_category" : asset_category, "asset_type" : asset_type });
  query.exec(function (err, searchAst){
      res.json(searchAst);
  });
});

assetRoutes.route('/CheckSerialValidity/:asset_serial').get(function (req, res) {
  let asset_serial = req.params.asset_serial;
  var query = Asset.find({"asset_serial" : asset_serial});
  query.exec(function (err, checkSerial){
      res.json(checkSerial);
  });
});

assetRoutes.route('/CheckSerialValidity1/:asset_barcode').get(function (req, res) {
  let asset_barcode = req.params.asset_barcode;
  var query = Asset.find({"asset_barcode" : asset_barcode});
  query.exec(function (err, checkBarcode){
      res.json(checkBarcode);
  });
});


module.exports = assetRoutes;