// express configration....

let express = require('express');
let app = express();

const appService = require('./app.service');
const apiV1 = require('./api/v1');

// create db connection
appService.connectToDatabase();

// express middleware
appService.setMiddleware(app);

// api configuration
appService.apiSetUp(apiV1);

module.exports = app;