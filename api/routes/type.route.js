const express = require('express');
const app = express();
const typeRoutes = express.Router();

// Require 'Model' model in our routes module
let Type = require('../models/Type');

// Defined store route
typeRoutes.route('/type/add').post(function (req, res) {
  let type = new Type(req.body);
  type.save()
    .then(type => {
      res.status(200).json({'type': 'Model is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
typeRoutes.route('/type').get(function (req, res) {
    Type.find(function (err, types){
    if(err){
      console.log(err);
    }
    else {
      res.json(types);
      
    }
  });
});

// Defined edit route
typeRoutes.route('/type/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Type.findById(id, function (err, type){
      res.json(type);
  });
});

//  Defined update route
typeRoutes.route('/type/update/:id').post(function (req, res) {
  Type.findById(req.params.id, function(err, type) {
    if (!type)
      return next(new Error('Could not load Document'));
    else {
      type.type_id = req.body.type_id;
      type.type_category_name = req.body.type_category_name;
      type.type_name = req.body.type_name;
      type.code_pattern = req.body.code_pattern;
      type.configuration_type = req.body.configuration_type;
      type.type_status = req.body.type_status;

      type.save().then(type => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


// Defined get Type Id route
typeRoutes.route('/type/show').get(function (req, res) {
  var query = Type.findOne().sort({type_id:-1.0}).limit(1);
  query.exec(function (err, typeId){
    if(err){
      console.log(err);
    }
    else {
      res.json(typeId);
     
    }
});

});

typeRoutes.route('/type/showType/:asset_category').get(function (req, res) {
  let asset_category = req.params.asset_category;
  var query = Type.find({"type_category_name" : asset_category});
  query.exec(function (err, searchtype){
      res.json(searchtype);
  });
});

typeRoutes.route('/type/showAssetCode/:asset_type').get(function (req, res) {
  let asset_type = req.params.asset_type;
  var query = Type.findOne({"type_name" : asset_type});
  query.exec(function (err, searchCode){
      res.json(searchCode);
  });
});

module.exports = typeRoutes;