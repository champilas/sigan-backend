import express, { Application, Request, Response } from 'express';
import {  errorHandler, boomErrorHandler, ormErrorHandler, logErrors, logUndefinedRoutes, axiosErrorHandler } from './middlewares/error.handler';
import { config } from './config/config';
import routes from './routes';
import cors from 'cors';
import passport from 'passport';
import JwtStrategy from './utils/auth/strategies/jwt.strategy';
import { addTokenToHeader } from './utils/cookies';
import cookieParser from 'cookie-parser';
import sequelize from './libs/sequelize';

passport.use(JwtStrategy);

const app: Application = express();
const port = config.port;
app.use(cookieParser());
app.use(addTokenToHeader);
app.use(express.json());
const corsOptions = {
  origin: [process.env.FRONTEND_DOMAIN as string],
  credentials: true
};

app.use(cors(corsOptions));

routes(app);

app.use(logUndefinedRoutes);
app.use(logErrors);
app.use(ormErrorHandler)
app.use(boomErrorHandler);
app.use(axiosErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});