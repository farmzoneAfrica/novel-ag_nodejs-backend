"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const utils_controller_1 = require("../controllers/utils.controller");
const utilsRouter = express_1.default.Router();
utilsRouter.get('/states', utils_controller_1.getStatesHandler);
// utilsRouter.get( '/lags/:id', getLgaHandler );
// utilsRouter.get( '/wards', getWardsHandler);
exports.default = utilsRouter;
//# sourceMappingURL=utils.route.js.map