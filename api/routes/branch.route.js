const express = require('express');
const app = express();
const branchRoutes = express.Router();

// Require 'Branch' model in our routes module
let Branch = require('../models/Branch');

// Defined store route
branchRoutes.route('/branch/add').post(function (req, res) {
  let branch = new Branch(req.body);
  branch.save()
    .then(branch => {
      res.status(200).json({'branch': 'Branch is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
branchRoutes.route('/branch').get(function (req, res) {
    Branch.find(function (err, branch){
    if(err){
      console.log(err);
    }
    else {
      res.json(branch);
      
    }
  });
});

// Defined edit route
branchRoutes.route('/branch/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Branch.findById(id, function (err, branch){
      res.json(branch);
  });
});

//  Defined update route
branchRoutes.route('/branch/update/:id').post(function (req, res) {
    Branch.findById(req.params.id, function(err, branch) {
    if (!branch)
      return next(new Error('Could not load Document'));
    else {
        branch.branch_id = req.body.branch_id;
        branch.branch_name = req.body.branch_name;
        branch.branch_code = req.body.branch_code;
        branch.branch_status = req.body.branch_status;

        branch.save().then(branch => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


// Defined get Branch Id route
branchRoutes.route('/branch/show').get(function (req, res) {
  var query = Branch.findOne().sort({branch_id:-1.0}).limit(1);
  query.exec(function (err, branchId){
    if(err){
      console.log(err);
    }
    else {
      res.json(branchId);
     
    }
});

});

module.exports = branchRoutes;