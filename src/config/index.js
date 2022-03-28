const local = require('./local');
const server = require('./db_connection');

const config = {
  local: local,
  server: server,
}

const isLocal = process.env.ENVIRONMENT !== 'development' && process.env.ENVIRONMENT !== 'production' && process.env.ENVIRONMENT !== 'staging';

module.exports = config[isLocal ? 'local' : 'server'];