require('dotenv').config();
import express, { NextFunction, Request, Response, response } from 'express';
import config from 'config';
import morgan from 'morgan';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import AppError from './utils/app.error';

import createError from 'http-errors';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';

import auth_router from "./routes/auth.routes";
import farmer_router from "./routes/farmer.routes";
import prosperity_hub_router from "./routes/prosperity.hub.routes";
import warehouse_router from "./routes/warehouse.routes";
import farm_router from "./routes/farm.routes";
import wallet_router from "./routes/wallet.route";

validateEnv()

const app = express();
const prisma = new PrismaClient();

  app.use(express.json({limit: '10kb' }));
  app.use(cookieParser());
  app.use(cors({
      origin: [config.get<string>('origin')],
      credentials: true,
  }));
  
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
  
  app.use(express.urlencoded({ extended: false }));

  app.get('/', (req, res) => {
    res.send('Hello World! Novel-AG');
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  app.get('/api/healthchecker', (_, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to NodeJs with Prisma and PostgreSQL',
    });
  });

  app.use('/api/v1/auth', auth_router);
  app.use('/api/v1/farmer', farmer_router);
  app.use('/api/v1/prosperity-hub', prosperity_hub_router);
  app.use('/api/v1/warehouse', warehouse_router);
  app.use('/api/v1/farm', farm_router);
  app.use('/api/v1/wallet', wallet_router);

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });

  app.use(function (req: Request, res: Response, next) {
    next(createError(404));
  });

  app.use(function (
    err: { message: string; status: number },
    req: Request,
    res: Response
  ) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

  const PORT = process.env.PORT;
console.clear()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
