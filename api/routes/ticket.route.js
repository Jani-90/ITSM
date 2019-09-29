const express = require('express');
const app = express();
const ticketRoutes = express.Router();

// Require 'Ticket' model in our routes module
let Ticket = require('../models/Ticket');

// Defined store route
ticketRoutes.route('/add').post(function (req, res) {
  let ticket = new Ticket(req.body);
  ticket.save()
    .then(ticket => {
      res.status(200).json({'ticket': 'Ticket is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
ticketRoutes.route('/').get(function (req, res) {
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
ticketRoutes.route('/ticketSubmitted').get(function (req, res) {
  var query = Ticket.find({"tracking_status" : "Submitted"});
  query.exec(function (err, submitTickets){
    if(err){
      console.log(err);
    }
    else {
      res.json(submitTickets);
      
    }
  });
});

// Defined get data(index or listing) route
ticketRoutes.route('/ticketReceived').get(function (req, res) {
  var query = Ticket.find({"tracking_status" : "Received"});
  query.exec(function (err, receivedTickets){
    if(err){
      console.log(err);
    }
    else {
      res.json(receivedTickets);
      
    }
  });
});

// Defined get data(index or listing) route
ticketRoutes.route('/ticketOpened').get(function (req, res) {
  var query = Ticket.find({"tracking_status" : "Opened"});
  query.exec(function (err, openedTickets){
    if(err){
      console.log(err);
    }
    else {
      res.json(openedTickets);
      
    }
  });
});

// Defined get data(index or listing) route
ticketRoutes.route('/ticketClosed').get(function (req, res) {
  var query = Ticket.find({"tracking_status" : "Closed"});
  query.exec(function (err, closedTickets){
    if(err){
      console.log(err);
    }
    else {
      res.json(closedTickets);
      
    }
  });
});

// Defined search ticketroute
ticketRoutes.route('/searchTicket/:ticket_no').get(function (req, res) {
  let ticket_no = req.params.ticket_no;
  var query = Ticket.find({"ticket_no" : ticket_no});
  query.exec(function (err, searchTicket){
      res.json(searchTicket);
  });
});

ticketRoutes.route('/searchUserTickets/:currentUserEpf').get(function (req, res) {
  let currentUserEpf = req.params.currentUserEpf;
  var query = Ticket.find({"sender" : currentUserEpf});
  query.exec(function (err, searchTic){
      res.json(searchTic);
  });
});

ticketRoutes.route('/search/:asset_serial').get(function (req, res) {
  let asset_serial = req.params.asset_serial;
  var query = Asset.find({"asset_serial" : asset_serial});
  query.exec(function (err, searchSerial){
      res.json(searchSerial);
  });
});

//  Defined update route
ticketRoutes.route('/update/:id').post(function (req, res) {
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


ticketRoutes.route('/show').get(function (req, res) {
  var query = Ticket.findOne().sort({ticket_no:-1.0}).limit(1);
  query.exec(function (err, ticketNo){
    if(err){
      console.log(err);
    }
    else {
      res.json(ticketNo);
       
    }
});

});

//  Defined update route
ticketRoutes.route('/updateTicketVendor/:ticket_no').post(function (req, res) {
  let ticket_no = req.params.ticket_no;
  var query = Ticket.findOne({"ticket_no" : ticket_no});
  //Ticket.find(req.params.ticket_no, function(err, ticket) {
    query.exec(function (err, ticket){
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.ticket_status = req.body.ticket_status;

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
ticketRoutes.route('/UpdateTicketQuotation/:ticket_no').post(function (req, res) {
  let ticket_no = req.params.ticket_no;
  var query = Ticket.findOne({"ticket_no" : ticket_no});
  //Ticket.find(req.params.ticket_no, function(err, ticket) {
    query.exec(function (err, ticket){
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.ticket_status = req.body.ticket_status;

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
ticketRoutes.route('/UpdateTicketApproval/:ticket_no').post(function (req, res) {
  let ticket_no = req.params.ticket_no;
  var query = Ticket.findOne({"ticket_no" : ticket_no});
  //Ticket.find(req.params.ticket_no, function(err, ticket) {
    query.exec(function (err, ticket){
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.ticket_status = req.body.ticket_status;

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
ticketRoutes.route('/UpdateTicketPayment/:ticket_no').post(function (req, res) {
  let ticket_no = req.params.ticket_no;
  var query = Ticket.findOne({"ticket_no" : ticket_no});
  //Ticket.find(req.params.ticket_no, function(err, ticket) {
    query.exec(function (err, ticket){
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.ticket_status = req.body.ticket_status;

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
ticketRoutes.route('/UpdateTicketVendorReceived/:ticket_no').post(function (req, res) {
  let ticket_no = req.params.ticket_no;
  var query = Ticket.findOne({"ticket_no" : ticket_no});
  //Ticket.find(req.params.ticket_no, function(err, ticket) {
    query.exec(function (err, ticket){
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.ticket_status = req.body.ticket_status;

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
ticketRoutes.route('/UpdateTicketInhouseClose/:ticket_no').post(function (req, res) {
  let ticket_no = req.params.ticket_no;
  var query = Ticket.findOne({"ticket_no" : ticket_no});
  //Ticket.find(req.params.ticket_no, function(err, ticket) {
    query.exec(function (err, ticket){
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.ticket_status = req.body.ticket_status;

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
ticketRoutes.route('/closeTicket/:ticket_no').post(function (req, res) {
  let ticket_no = req.params.ticket_no;
  var query = Ticket.findOne({"ticket_no" : ticket_no});
  //Ticket.find(req.params.ticket_no, function(err, ticket) {
    query.exec(function (err, ticket){
    if (!ticket)
      return next(new Error('Could not load Document'));
    else {
      ticket.ticket_closing_comment = req.body.ticket_closing_comment;
      ticket.ticket_status = req.body.ticket_status;
      ticket.tracking_status = req.body.tracking_status;
      ticket.ticket_closing_date = req.body.ticket_closing_date;

      ticket.save().then(ticket => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


// Defined get data(index or listing) route
ticketRoutes.route('/submitCount').get(function (req, res) {
  var query = Ticket.find({"tracking_status" : "Submitted"}).count();
  query.exec(function (err, submitTktCount){
    if(err){
      console.log(err);
    }
    else {
      res.json(submitTktCount);
      
    }
  });
});

// Defined get data(index or listing) route
ticketRoutes.route('/receiveCount').get(function (req, res) {
  var query = Ticket.find({"tracking_status" : "Received"}).count();
  query.exec(function (err, receiveTktCount){
    if(err){
      console.log(err);
    }
    else {
      res.json(receiveTktCount);
      
    }
  });
});

// Defined get data(index or listing) route
ticketRoutes.route('/openCount').get(function (req, res) {
  var query = Ticket.find({"tracking_status" : "Opened"}).count();
  query.exec(function (err, openTktCount){
    if(err){
      console.log(err);
    }
    else {
      res.json(openTktCount);
      
    }
  });
});

// Defined get data(index or listing) route
ticketRoutes.route('/closeCount').get(function (req, res) {
  var query = Ticket.find({"tracking_status" : "Closed"}).count();
  query.exec(function (err, closeTktCount){
    if(err){
      console.log(err);
    }
    else {
      res.json(closeTktCount);
      
    }
  });
});

ticketRoutes.route('/searchTicket/:from_date/:to_date').get(function (req, res) {
  let from_date = req.params.from_date;
  let to_date = req.params.to_date;
  
  var query = Ticket.find({ "ticket_create_date" : { $gt : from_date, $lt : to_date }  });
  //var query = Log.find({"log_type" : log_type ,"log_date" : { $gt : ISODate(from_date), $lt : ISODate(to_date)} });
  query.exec(function (err, searchTickets){
      res.json(searchTickets);
  });
});

module.exports = ticketRoutes;