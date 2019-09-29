const express = require('express');
const app = express();
const activityLogRoutes = express.Router();

// Require 'Activity Log' model in our routes module
let ActivityLog = require('../models/ActivityLog');

// Defined store route
activityLogRoutes.route('/add').post(function (req, res) {
  let activityLog = new ActivityLog(req.body);
  activityLog.save()
    .then(activityLog => {
      res.status(200).json({'activityLog': 'Activity Log is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
activityLogRoutes.route('/').get(function (req, res) {
  var query = ActivityLog.find().sort({_id:-1}).limit(5);;
  query.exec(function (err, actlog){
    if(err){
      console.log(err);
    }
    else {
      res.json(actlog);
      
    }
  });
});

// Defined edit route
/*activityLogRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Employee.findById(id, function (err, employee){
      res.json(employee);
  });
});

activityLogRoutes.route('/search/:asset_serial').get(function (req, res) {
  let asset_serial = req.params.asset_serial;
  var query = Asset.find({"asset_serial" : asset_serial});
  query.exec(function (err, searchSerial){
      res.json(searchSerial);
  });
});

//  Defined update route
activityLogRoutes.route('/update/:id').post(function (req, res) {
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


activityLogRoutes.route('/showLogID/:log_type').get(function (req, res) {
  let log_type = req.params.log_type;
  var query = Log.findOne({"log_type" : log_type}).sort({_id:-1.0}).limit(1);
  query.exec(function (err, searchCode){
      res.json(searchCode);
  });
});

activityLogRoutes.route('/search/:log_type/:from_date/:to_date').get(function (req, res) {
  let log_type = req.params.log_type;
  let from_date = req.params.from_date;
  let to_date = req.params.to_date;
  
  var query = Log.find({"log_type" : log_type, "log_date" : { $gt : from_date, $lt : to_date }  });
  //var query = Log.find({"log_type" : log_type ,"log_date" : { $gt : ISODate(from_date), $lt : ISODate(to_date)} });
  query.exec(function (err, searchLogs){
      res.json(searchLogs);
  });
});*/


module.exports = activityLogRoutes;