interface DBConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}
declare const config: DBConfig;
export default config;
