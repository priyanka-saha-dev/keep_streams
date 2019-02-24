const log4js = require('log4js');
const { loggerConfig } = require('./streams/config').appConfig;

log4js.configure(loggerConfig);
const logger = log4js.getLogger();

module.exports = logger;