const { Pool } = require('pg');

let databaseName;

if (process.env.NODE_ENV.trim() === 'development') {
    databaseName = process.env.DEV_PG_DATABASE;
} else if (process.env.NODE_ENV.trim() === 'production') {
    databaseName = process.env.PROD_PG_DATABASE;
} else if (process.env.NODE_ENV.trim() === 'test') {
    databaseName = process.env.TEST_PG_DATABASE;
}

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: databaseName,
    password: process.env.PG_PASSWORD,
    port: +process.env.PG_PORT,
});

module.exports = pool;
