import pg from "pg";
import config from "../config/db";

const { Pool } = pg;
const pool = new Pool(config);

export default pool;
