"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_config_1 = require("./config/app.config");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// auth
app.use('/api/auth', auth_routes_1.default);
app.listen(app_config_1.app.port, () => {
    console.log(`Escuchando en el puerto: ${app_config_1.app.port}`);
});
