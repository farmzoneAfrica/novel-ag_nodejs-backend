// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
    getStatesHandler,
    getStateHandler,
    getLGAsHandler,
    getLocalGovtHandler,
    getRolesHandler,
    getRoleHandler,
    getLocalGovtinStateHandler
} from '../controllers/utils.controller';


const utilsRouter = express.Router();

utilsRouter.get( '/states', getStatesHandler );
utilsRouter.get( '/states/:id', getStateHandler );
utilsRouter.get( '/lgas', getLGAsHandler );
utilsRouter.get( '/lgas-state/:id', getLocalGovtinStateHandler );
utilsRouter.get( '/lgas/:id', getLocalGovtHandler );
utilsRouter.get( '/roles', getRolesHandler);                                                             
utilsRouter.get( '/roles/:id', getRoleHandler);                                                             

export default utilsRouter;