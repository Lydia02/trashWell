const { Pool } = require('pg');
require('dotenv').config();

const dbPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = dbPool;
