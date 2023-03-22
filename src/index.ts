import express, { Request, Response } from 'express';
import createError from 'http-errors';
// import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';

import agentsRoute from "./routes/agentsRoute";

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api/agents', agentsRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

