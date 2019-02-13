// express configration....

let express = require('express');
let app = express();
const appService = require('./app.service');

// create db connection
appService.connectToDatabase();

// express middleware
appService.setAppMiddleware(app);

// api configuration
appService.apiSetUp(app);

module.exports = app;