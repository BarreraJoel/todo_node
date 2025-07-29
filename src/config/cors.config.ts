require('dotenv').config();

export const corsConfig = {
    domains: process.env.ALLOWED_DOMAINS ?? '',
    credentials: true,
};
