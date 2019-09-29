const express = require('express');
const app = express();
const ticketReceivedRoutes = express.Router();

// Require 'Branch' model in our routes module
let Ticket = require('../models/Ticket');

// Defined store route
/*ticketReceivedRoutes.route('/branch/add').post(function (req, res) {
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
ticketReceivedRoutes.route('/branch').get(function (req, res) {
    Branch.find(function (err, branch){
    if(err){
      console.log(err);
    }
    else {
      res.json(branch);
      
    }
  });
});*/

// Defined edit route
ticketReceivedRoutes.route('/view/:id').get(function (req, res) {
    
  let id = req.params.id;
  Ticket.findById(id, function (err, ticket){
      res.json(ticket);
  });
});

//  Defined update route
ticketReceivedRoutes.route('/update/:id').post(function (req, res) {
  Ticket.findById(req.params.id, function(err, ticket) {
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.received_by = req.body.received_by;
      ticket.ticket_status = req.body.ticket_status;
      ticket.ticket_received_date = req.body.ticket_received_date;

      ticket.save().then(ticket => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined update route
ticketReceivedRoutes.route('/update1/:id').post(function (req, res) {
  Ticket.findById(req.params.id, function(err, ticket) {
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.ticket_status = req.body.ticket_status;
      ticket.tracking_status = req.body.tracking_status;

      ticket.save().then(ticket => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


// Defined get Branch Id route
/*ticketReceivedRoutes.route('/branch/show').get(function (req, res) {
  var query = Branch.findOne().sort({branch_id:-1.0}).limit(1);
  query.exec(function (err, branchId){
    if(err){
      console.log(err);
    }
    else {
      res.json(branchId);
     
    }
});

});*/

module.exports = ticketReceivedRoutes;