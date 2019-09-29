const express = require('express');
const app = express();
const agreementRoutes = express.Router();

// Require 'Agreement' model in our routes module
let Agreement = require('../models/Agreement');

// Defined store route
agreementRoutes.route('/add').post(function (req, res) {
  let agreement = new Agreement(req.body);
  agreement.save()
    .then(agreement => {
      res.status(200).json({'agreement': 'Agreement is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
agreementRoutes.route('/').get(function (req, res) {
    Agreement.find(function (err, agreements){
    if(err){
      console.log(err);
    }
    else {
      res.json(agreements);
      
    }
  });
});

// Defined edit route
agreementRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Agreement.findById(id, function (err, agreement){
      res.json(agreement);
  });
});

//  Defined update route
agreementRoutes.route('/update/:id').post(function (req, res) {
    Agreement.findById(req.params.id, function(err, agreement) {
    if (!agreement)
      return next(new Error('Could not load Document'));
    else {
        agreement.vendor_rating = req.body.vendor_rating;
        agreement.agreement_comment = req.body.agreement_comment;
        agreement.agreement_status = req.body.agreement_status;

        agreement.save().then(agreement => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});




agreementRoutes.route('/show').get(function (req, res) {
  var query = Agreement.findOne().sort({agreement_no:-1.0}).limit(1);
  query.exec(function (err, agreementNo){
    if(err){
      console.log(err);
    }
    else {
      res.json(agreementNo);
        
    }
});

});




module.exports = agreementRoutes;