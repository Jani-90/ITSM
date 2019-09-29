const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');
    config = require('./DB');

    const makeRoute = require('./routes/make.route');
    const modelRoute = require('./routes/model.route');
    const categoryRoute = require('./routes/category.route');
    const typeRoute = require('./routes/type.route');
    const locationRoute = require('./routes/location.route');
    const branchRoute = require('./routes/branch.route');
    const employeeRoute = require('./routes/employee.route');
    const assetRoute = require('./routes/asset.route');
    const ticketRoute = require('./routes/ticket.route');
    const ticketSubmittedRoute = require('./routes/ticketSubmitted.route');
    const ticketReceivedRoute = require('./routes/ticketReceived.route');
    const jobRoute = require('./routes/job.route');
    const vendorRoute = require('./routes/vendor.route');
    const logRoute = require('./routes/log.route');
    const agreementRoute = require('./routes/agreement.route');
    const vendorRatingRoute = require('./routes/VendorRating.route');
    const agreementRenewalRoute = require('./routes/agreementRenewal.route');
    const activityLogRoute = require('./routes/activityLog.route');
    const assetAuditTrailRoute = require('./routes/assetAuditTrail.route');

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/makemodel', makeRoute);
    app.use('/makemodel', modelRoute);
    app.use('/codegenerator', categoryRoute);
    app.use('/codegenerator', typeRoute);
    app.use('/location', locationRoute);
    app.use('/location', branchRoute);
    app.use('/employee', employeeRoute);
    app.use('/assetRegistration', assetRoute);
    app.use('/createTicket', ticketRoute);
    app.use('/ticketSubmitted', ticketSubmittedRoute);
    app.use('/ticketReceived', ticketReceivedRoute);
    app.use('/job', jobRoute);
    app.use('/vendor', vendorRoute);
    app.use('/log', logRoute);
    app.use('/agreement', agreementRoute);
    app.use('/VendorRating', vendorRatingRoute);
    app.use('/agreementRenewal', agreementRenewalRoute);
    app.use('/activityLog', activityLogRoute);
    app.use('/assetAuditTrail', assetAuditTrailRoute);
    let port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
    });