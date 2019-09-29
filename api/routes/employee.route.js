const express = require('express');
const app = express();
const employeeRoutes = express.Router();

// Require 'Employee' model in our routes module
let Employee = require('../models/Employee');

// Defined store route
employeeRoutes.route('/add').post(function (req, res) {
  let employee = new Employee(req.body);
  employee.save()
    .then(employee => {
      res.status(200).json({'employee': 'Employee is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
employeeRoutes.route('/').get(function (req, res) {
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

// Defined get data(index or listing) route
employeeRoutes.route('/emp').get(function (req, res) {
  var query = Employee.find();
  query.exec(function (err, employees1){
    if(err){
      console.log(err);
    }
    else {
      res.json(employees1);
      
    }
  });
});

// Defined edit route
employeeRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Employee.findById(id, function (err, employee){
      res.json(employee);
  });
});

employeeRoutes.route('/search/:search_employee_no').get(function (req, res) {
  let search_employee_no = req.params.search_employee_no;
  var query = Employee.find({"employee_no" : search_employee_no});
  query.exec(function (err, searchEmp){
      res.json(searchEmp);
  });
});

//  Defined update route
employeeRoutes.route('/update/:id').post(function (req, res) {
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


employeeRoutes.route('/login/:username/:password').get(function (req, res) {
  let username = req.params.username;
  let password = req.params.password;
  
  var query = Employee.findOne({$and:[{"username" : username}, {"password" : password}]});
  query.exec(function (err, searchLogin){
      res.json(searchLogin);
  });
});



employeeRoutes.route('/updateUserRole/:employee_no').post(function (req, res) {
  let employee_no = req.params.employee_no;
  var query = Employee.findOne({"employee_no" : employee_no});
  
    query.exec(function (err, employee){
    if (!employee)
      return next(new Error('Could not load Document'));
    else {
      employee.user_role = req.body.user_role;

      employee.save().then(employee => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


module.exports = employeeRoutes;