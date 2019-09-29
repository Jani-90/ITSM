const express = require('express');
const app = express();
const locationRoutes = express.Router();

// Require 'Make' model in our routes module
let Location = require('../models/Location');

// Defined store route
locationRoutes.route('/add').post(function (req, res) {
  let location = new Location(req.body);
  location.save()
    .then(location => {
      res.status(200).json({'location': 'Location is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
locationRoutes.route('/').get(function (req, res) {
    Location.find(function (err, locations){
    if(err){
      console.log(err);
    }
    else {
      res.json(locations);
      
    }
  });
});

// Defined edit route
locationRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Location.findById(id, function (err, location){
      res.json(location);
  });
});

//  Defined update route
locationRoutes.route('/update/:id').post(function (req, res) {
  Location.findById(req.params.id, function(err, location) {
    if (!location)
      return next(new Error('Could not load Document'));
    else {
      location.location_code = req.body.location_code;
      location.location_name = req.body.location_name;
      location.location_status = req.body.location_status;

      location.save().then(location => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});




locationRoutes.route('/show').get(function (req, res) {
  var query = Location.findOne().sort({location_code:-1.0}).limit(1);
  query.exec(function (err, locationCode){
    if(err){
      console.log(err);
    }
    else {
      res.json(locationCode);
      //console.log(makeCode);   
    }
});

});




module.exports = locationRoutes;