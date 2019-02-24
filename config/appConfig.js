// Server configuration
const serverConfig = {
  port: 3000,
  hostname: '127.0.0.1'
}

const dbConfig = {
  mongoUrl: 'mongodb://localhost:27017/keep',
  noteCollection: 'notes'
}

const authConfig = {
  jwtSecret: 'jwttokenbasedauth'
}

// Logger configuration
const loggerConfig = {
  appenders: {
    // console: {
    //   type: 'console'
    // },
    keepLogs: {
      type: 'file',
      filename: './server/logs/keep.log'
    }
  },
  categories: {
    //default: { appenders: ['console', 'keepLogs'], level: 'trace' }
    default: { appenders: ['keepLogs'], level: 'trace' }
  }
};

module.exports = {
  serverConfig,
  loggerConfig,
  dbConfig,
  authConfig
}