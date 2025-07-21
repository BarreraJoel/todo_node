require('dotenv').config();

export const app = {
    port: process.env.APP_PORT ?? 3000,
};
