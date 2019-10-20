const { Pool } = require('pg');

let connectionString;

if (process.env.NODE_ENV.trim() === 'development') {
    connectionString = process.env.DEV_URL_DB;
} else if (process.env.NODE_ENV.trim() === 'production') {
    connectionString = process.env.TEST_URL_DB;
}

const pool = new Pool({
    connectionString,
    ssl: true,
});

module.exports = pool;
