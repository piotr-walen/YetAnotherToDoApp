import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: "../.env" });
const connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);

async function create() {
    await client.connect();
    const result = await client.query(
        "CREATE TABLE items(id SERIAL PRIMARY KEY, userId SERIAL, text VARCHAR(40) not null, complete BOOLEAN)",
    );
    console.log(result.rows);
    client.end();
}

create();
