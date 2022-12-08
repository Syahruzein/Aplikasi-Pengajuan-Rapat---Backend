const { Pool } = require('pg');
const pool = new Pool({
  user: 'student',
  host: 'localhost',
  database: 'aprdb',
  password: 'Surabaya2022!!',
  port: 5432,
});

module.exports = pool;