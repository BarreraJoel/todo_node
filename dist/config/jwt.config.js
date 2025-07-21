"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
require('dotenv').config();
exports.jwt = {
    secret: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "",
};
