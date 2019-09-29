const express = require('express');
const app = express();
const assetAuditTrailRoutes = express.Router();

// Require 'Asset Audit Trail' model in our routes module
let AssetAuditTrail = require('../models/AssetAuditTrail');

// Defined store route
assetAuditTrailRoutes.route('/add').post(function (req, res) {
  let assetAuditTrail = new AssetAuditTrail(req.body);
  assetAuditTrail.save()
    .then(assetAuditTrail => {
      res.status(200).json({'assetAuditTrail': 'Asset Audit Trail is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined edit route
assetAuditTrailRoutes.route('/showAuditTrail/:asset_serial').get(function (req, res) {
    let asset_serial = req.params.asset_serial;

    var query = AssetAuditTrail.find({"asset_serial" : asset_serial});
    query.exec(function (err, searchAudit){
        res.json(searchAudit);
    });
  });

// Defined get data(index or listing) route
/*assetAuditTrailRoutes.route('/').get(function (req, res) {
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



assetAuditTrailRoutes.route('/search/:asset_serial').get(function (req, res) {
  let asset_serial = req.params.asset_serial;
  var query = Asset.find({"asset_serial" : asset_serial});
  query.exec(function (err, searchSerial){
      res.json(searchSerial);
  });
});

//  Defined update route
assetAuditTrailRoutes.route('/update/:id').post(function (req, res) {
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
});


assetAuditTrailRoutes.route('/showLogID/:log_type').get(function (req, res) {
  let log_type = req.params.log_type;
  var query = Log.findOne({"log_type" : log_type}).sort({_id:-1.0}).limit(1);
  query.exec(function (err, searchCode){
      res.json(searchCode);
  });
});

assetAuditTrailRoutes.route('/search/:log_type/:from_date/:to_date').get(function (req, res) {
  let log_type = req.params.log_type;
  let from_date = req.params.from_date;
  let to_date = req.params.to_date;
  
  var query = Log.find({"log_type" : log_type, "log_date" : { $gt : from_date, $lt : to_date }  });
  //var query = Log.find({"log_type" : log_type ,"log_date" : { $gt : ISODate(from_date), $lt : ISODate(to_date)} });
  query.exec(function (err, searchLogs){
      res.json(searchLogs);
  });
});*/


module.exports = assetAuditTrailRoutes;