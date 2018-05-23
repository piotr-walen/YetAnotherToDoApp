const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });

pool.on('error', (error, client) => {
    next(error);
    process.exit(-1);
});

module.exports = pool;
