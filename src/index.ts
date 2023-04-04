require('dotenv').config();
import express, { NextFunction, Request, Response, response } from 'express';
import config from 'config';
import morgan from 'morgan';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import AppError from './utils/appError';
import prisma from './utils/prismaClient';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';

import agentRouter from "./routes/agent.routes";
import authRouter from "./routes/agent.routes";

validateEnv()

const app = express();

async function bootstrap() {
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/views`);

  app.use(express.json({limit: '10kb' }));
  app.use(cookieParser());
  app.use(cors({
      origin: [config.get<string>('origin')],
      credentials: true,
  }));
  
   if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
  // app.use(logger('dev'));
  app.use(express.urlencoded({ extended: false }));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  app.use('/api/agents', agentRouter);
  app.use('/api/auths', authRouter);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  // Testing
  app.get('/api/healthchecker', (_, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to NodeJs with Prisma and PostgreSQL',
    });
  });

  // UNHANDLED ROUTES
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // GLOBAL ERROR HANDLER
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

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
