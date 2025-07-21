require('dotenv').config();

export const db = {
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ?? 3306,
    connection: process.env.DB_CONNECTION ?? "mysql",
    database: process.env.DB_NAME ?? "db_name",
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
};
