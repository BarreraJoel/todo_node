import "reflect-metadata";
import { appConfig } from "./config/app.config";
import { corsConfig } from "./config/cors.config";
import { container } from "tsyringe";
import { AuthMiddleware } from "./middlewares/auth/auth.middleware";
import authRoutes from "./routes/auth.routes";
import jobsRoutes from "./routes/jobs.routes";
import tokenRoutes from "./routes/tokens.routes";

const express = require('express');
const cors = require('cors');
const app = express();
const authMiddleware = container.resolve(AuthMiddleware);
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: corsConfig.domains,
    credentials: corsConfig.credentials
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth
app.use('/api/auth', authRoutes);

// jobs
app.use('/api/jobs', authMiddleware.handle, jobsRoutes);

// tokens
app.use('/api/tokens', tokenRoutes);

app.listen(appConfig.port, () => {
    console.log(`Escuchando en el puerto: ${appConfig.port}`);
});