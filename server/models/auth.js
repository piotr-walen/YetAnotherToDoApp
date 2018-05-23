require('dotenv').config({ path: '../.env' });
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);

async function create() {
    await client.connect();
    var result = await client.query(
        'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(40) UNIQUE NOT NULL, password CHAR(60) NOT NULL)'
    );
    console.log(result.rows);
    client.end();
}

create();
