import pg, { PoolClient } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({
    connectionString,
    ssl: true,
});

pool.on("error", (error: Error, client: PoolClient) => {
    console.log(error);
    process.exit(-1);
});

export default pool;
