const express = require('express');
const app = express();
const makeRoutes = express.Router();

// Require 'Make' model in our routes module
let Make = require('../models/Make');

// Defined store route
makeRoutes.route('/add').post(function (req, res) {
  let make = new Make(req.body);
  make.save()
    .then(make => {
      res.status(200).json({'make': 'Make is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
makeRoutes.route('/').get(function (req, res) {
    Make.find(function (err, makes){
    if(err){
      console.log(err);
    }
    else {
      res.json(makes);
      
    }
  });
});

// Defined edit route
makeRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Make.findById(id, function (err, make){
      res.json(make);
  });
});

//  Defined update route
makeRoutes.route('/update/:id').post(function (req, res) {
  Make.findById(req.params.id, function(err, make) {
    if (!make)
      return next(new Error('Could not load Document'));
    else {
      make.make_id = req.body.make_id;
      make.make_name = req.body.make_name;
      make.make_status = req.body.make_status;

      make.save().then(make => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});




makeRoutes.route('/show').get(function (req, res) {
  var query = Make.findOne().sort({make_id:-1.0}).limit(1);
  query.exec(function (err, makeCode){
    if(err){
      console.log(err);
    }
    else {
      res.json(makeCode);
      //console.log(makeCode);   
    }
});

});




module.exports = makeRoutes;