require('dotenv').config();

export const appConfig = {
    port: process.env.APP_PORT ?? 3000,
};
