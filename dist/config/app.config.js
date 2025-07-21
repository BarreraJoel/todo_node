"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
exports.app = {
    port: (_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : 3000,
};
