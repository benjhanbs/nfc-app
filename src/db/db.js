const { Pool } = require('pg')
const db = require('../config/index');

console.log(db)
const pool = new Pool(db)

module.exports = pool