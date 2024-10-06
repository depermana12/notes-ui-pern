interface DBConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

const config: DBConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "notes",
  password: process.env.DB_PASSWORD || "notesapp",
  port: Number(process.env.DB_PORT) || 5432,
};

export default config;
