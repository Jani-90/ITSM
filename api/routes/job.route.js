const express = require('express');
const app = express();
const jobRoutes = express.Router();

// Require 'Ticket' model in our routes module
let Job = require('../models/Job');

// Defined store route
jobRoutes.route('/add').post(function (req, res) {
  let job = new Job(req.body);
  job.save()
    .then(job => {
      res.status(200).json({'job': 'New Job is created successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
jobRoutes.route('/view/:ticket_no').get(function (req, res) {
  let ticket_no = req.params.ticket_no;

  var query = Job.find({"ticket_no" : ticket_no});
  query.exec(function (err, jobList){
    if(err){
      console.log(err);
    }
    else {
      res.json(jobList);
      
    }
  });
});

// Defined get data(index or listing) route
jobRoutes.route('/viewTop/:ticket_no').get(function (req, res) {
  let ticket_no = req.params.ticket_no;
  //var query = Job.findOne().sort({quotation_no:-1.0}).limit(1);
  var query = Job.findOne({"ticket_no" : ticket_no}).sort({jobNo:-1.0}).limit(1);
  query.exec(function (err, jobList){
    if(err){
      console.log(err);
    }
    else {
      res.json(jobList);
      
    }
  });
});

// Defined search ticketroute
jobRoutes.route('/viewJob/:id').get(function (req, res) {
  let id = req.params.id;
  var query = Job.find({"_id" : id});
  query.exec(function (err, searchJob){
      res.json(searchJob);
  });
});

// Defined get data(index or listing) route
/*jobRoutes.route('/ticketSubmitted').get(function (req, res) {
  var query = Ticket.find({"ticket_status" : "IT_Submitted"});
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
jobRoutes.route('/ticketReceived').get(function (req, res) {
  var query = Ticket.find({"ticket_status" : "IT_Received"});
  query.exec(function (err, receivedTickets){
    if(err){
      console.log(err);
    }
    else {
      res.json(receivedTickets);
      
    }
  });
});



jobRoutes.route('/search/:asset_serial').get(function (req, res) {
  let asset_serial = req.params.asset_serial;
  var query = Asset.find({"asset_serial" : asset_serial});
  query.exec(function (err, searchSerial){
      res.json(searchSerial);
  });
});*/

//  Defined update route
jobRoutes.route('/updateJobVendor/:id').post(function (req, res) {
  Job.findById(req.params.id, function(err, job) {
    if (!job)
      return next(new Error('Could not load Document'));
    else {
      job.vendor_selected = req.body.vendor_selected;
      job.vendor_comment = req.body.vendor_comment;
      job.job_status = req.body.job_status;
      job.vendor_send_date = req.body.vendor_send_date;

      job.save().then(job => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined update route
jobRoutes.route('/UpdateJobQuotation/:id').post(function (req, res) {
  Job.findById(req.params.id, function(err, job) {
    if (!job)
      return next(new Error('Could not load Document'));
    else {
      job.quotation_no = req.body.quotation_no;
      job.quotation_refNo = req.body.quotation_refNo;
      job.quotation_amount = req.body.quotation_amount;
      job.quotation_date = req.body.quotation_date;
      job.quotation_description = req.body.quotation_description;
      job.quotation_attachment = req.body.quotation_attachment;
      job.job_status = req.body.job_status;

      job.save().then(job => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined update route
jobRoutes.route('/UpdateJobApproval/:id').post(function (req, res) {
  Job.findById(req.params.id, function(err, job) {
    if (!job)
      return next(new Error('Could not load Document'));
    else {
      job.quotation_approved_date = req.body.quotation_approved_date;
      job.quotation_approvedBy = req.body.quotation_approvedBy;
      job.job_status = req.body.job_status;


      job.save().then(job => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined update route
jobRoutes.route('/UpdateJobPayment/:id').post(function (req, res) {
  Job.findById(req.params.id, function(err, job) {
    if (!job)
      return next(new Error('Could not load Document'));
    else {
      job.bill_no = req.body.bill_no;
      job.payment_amount = req.body.payment_amount;
      job.payment_date = req.body.payment_date;
      job.payment_description = req.body.payment_description;
      job.payment_attachment = req.body.payment_attachment;
      job.job_status = req.body.job_status;

      job.save().then(job => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined update route
jobRoutes.route('/UpdateJobVendorReceived/:id').post(function (req, res) {
  Job.findById(req.params.id, function(err, job) {
    if (!job)
      return next(new Error('Could not load Document'));
    else {
      job.vendor_receive_date = req.body.vendor_receive_date;
      job.vendor_rating = req.body.vendor_rating;
      job.vendor_receive_comment = req.body.vendor_receive_comment;
      job.job_status = req.body.job_status;

      job.save().then(job => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined update route
jobRoutes.route('/UpdateJobInhouseClose/:id').post(function (req, res) {
  Job.findById(req.params.id, function(err, job) {
    if (!job)
      return next(new Error('Could not load Document'));
    else {
      job.inhouse_closing_comment = req.body.inhouse_closing_comment;
      job.job_status = req.body.job_status;

      job.save().then(job => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


jobRoutes.route('/show').get(function (req, res) {
  var query = Job.findOne().sort({jobNo:-1.0}).limit(1);
  query.exec(function (err, job_no){
    if(err){
      console.log(err);
    }
    else {
      res.json(job_no);
       
    }
});

});

jobRoutes.route('/showQuotationNo').get(function (req, res) {
  var query = Job.findOne().sort({quotation_no:-1.0}).limit(1);
  query.exec(function (err, quotation_no){
    if(err){
      console.log(err);
    }
    else {
      res.json(quotation_no);
       
    }
});

});

// Defined get data(index or listing) route
jobRoutes.route('/jobsNIC').get(function (req, res) {
  var query = Job.find({"repairing_method" : "Not In Condition"});
  query.exec(function (err, NICjobs){
    if(err){
      console.log(err);
    }
    else {
      res.json(NICjobs);
      
    }
  });
});


module.exports = jobRoutes;