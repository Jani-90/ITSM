const express = require('express');
const app = express();
const categoryRoutes = express.Router();

// Require 'Category' model in our routes module
let Category = require('../models/Category');

// Defined store route
categoryRoutes.route('/add').post(function (req, res) {
  let category = new Category(req.body);
  category.save()
    .then(category => {
      res.status(200).json({'category': 'Category is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
categoryRoutes.route('/').get(function (req, res) {
    Category.find(function (err, categories){
    if(err){
      console.log(err);
    }
    else {
      res.json(categories);
      
    }
  });
});

// Defined edit route
categoryRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Category.findById(id, function (err, category){
      res.json(category);
  });
});

//  Defined update route
categoryRoutes.route('/update/:id').post(function (req, res) {
    Category.findById(req.params.id, function(err, category) {
    if (!category)
      return next(new Error('Could not load Document'));
    else {
        category.category_id = req.body.category_id;
        category.category_name = req.body.category_name;
        category.category_status = req.body.category_status;

        category.save().then(category => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});




categoryRoutes.route('/show').get(function (req, res) {
  var query = Category.findOne().sort({category_id:-1.0}).limit(1);
  query.exec(function (err, categoryId){
    if(err){
      console.log(err);
    }
    else {
      res.json(categoryId);
      //console.log(makeCode);   
    }
});

});




module.exports = categoryRoutes;