"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require('dotenv').config();
exports.db = {
    host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : "localhost",
    port: (_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : 3306,
    connection: (_c = process.env.DB_CONNECTION) !== null && _c !== void 0 ? _c : "mysql",
    database: (_d = process.env.DB_NAME) !== null && _d !== void 0 ? _d : "db_name",
    user: (_e = process.env.DB_USER) !== null && _e !== void 0 ? _e : "root",
    password: (_f = process.env.DB_PASSWORD) !== null && _f !== void 0 ? _f : "",
};
