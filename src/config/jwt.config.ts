require('dotenv').config();

export const jwt = {
    secret: process.env.JWT_SECRET ?? "",
};


