import "reflect-metadata";
import { app as appConfig } from "./config/app.config";
import authRoutes from "./routes/auth.routes";

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth
app.use('/api/auth', authRoutes);

app.listen(appConfig.port, () => {
    console.log(`Escuchando en el puerto: ${appConfig.port}`);
});