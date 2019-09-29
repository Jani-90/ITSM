const express = require('express');
const app = express();
const modelRoutes = express.Router();

// Require 'Model' model in our routes module
let Model = require('../models/Model');

// Defined store route
modelRoutes.route('/model/add').post(function (req, res) {
  let model = new Model(req.body);
  model.save()
    .then(model => {
      res.status(200).json({'model': 'Model is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
modelRoutes.route('/model').get(function (req, res) {
    Model.find(function (err, models){
    if(err){
      console.log(err);
    }
    else {
      res.json(models);
      
    }
  });
});

// Defined edit route
modelRoutes.route('/model/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Model.findById(id, function (err, model){
      res.json(model);
  });
});

//  Defined update route
modelRoutes.route('/model/update/:id').post(function (req, res) {
  Model.findById(req.params.id, function(err, model) {
    if (!model)
      return next(new Error('Could not load Document'));
    else {
        model.model_id = req.body.model_id;
        model.model_make_name = req.body.model_make_name;
        model.model_name = req.body.model_name;
        model.model_status = req.body.model_status;

        model.save().then(model => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


// Defined get Model Code route
modelRoutes.route('/model/show').get(function (req, res) {
  var query = Model.findOne().sort({model_id:-1.0}).limit(1);
  query.exec(function (err, modelCode){
    if(err){
      console.log(err);
    }
    else {
      res.json(modelCode);
     
    }
});

});

modelRoutes.route('/model/showModel/:asset_make').get(function (req, res) {
  let asset_make = req.params.asset_make;
  var query = Model.find({"model_make_name" : asset_make});
  query.exec(function (err, searchmodel){
      res.json(searchmodel);
  });
});

module.exports = modelRoutes;