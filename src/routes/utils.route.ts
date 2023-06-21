// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
    getStatesHandler,
    // getLgaHandler,
    // getWardsHandler,
} from '../controllers/utils.controller';


const utilsRouter = express.Router();

utilsRouter.get( '/states', getStatesHandler );
// utilsRouter.get( '/lags/:id', getLgaHandler );
// utilsRouter.get( '/wards', getWardsHandler);

export default utilsRouter;