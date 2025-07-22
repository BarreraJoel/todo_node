import "reflect-metadata";
import { app as appConfig } from "./config/app.config";
import { container } from "tsyringe";
import { AuthMiddleware } from "./middlewares/auth/auth.middleware";
import authRoutes from "./routes/auth.routes";
import jobsRoutes from "./routes/jobs.routes";

const express = require('express');
const cors = require('cors');
const app = express();
const authMiddleware = container.resolve(AuthMiddleware);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth
app.use('/api/auth', authRoutes);

// jobs
app.use('/api/jobs', authMiddleware.handle, jobsRoutes);

app.listen(appConfig.port, () => {
    console.log(`Escuchando en el puerto: ${appConfig.port}`);
});