"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const farm_controller_1 = require("../controllers/farm.controller");
const farm_schema_1 = require("../schemas/farm.schema");
const deserializeUser_1 = require("../middleware/deserializeUser");
const validate_1 = require("../middleware/validate");
const farmRouter = express_1.default.Router();
// farmRouter.post( '/:farmer_id', validate(createFarmSchema), auth, requireUser, createFarmHandler);
farmRouter.post('/:farmer_id', (0, validate_1.validate)(farm_schema_1.createFarmSchema), deserializeUser_1.auth, farm_controller_1.createFarmHandler);
farmRouter.get('/', deserializeUser_1.auth, farm_controller_1.getFarmsHandler);
farmRouter.get('/:id', deserializeUser_1.auth, farm_controller_1.getFarmHandler);
farmRouter.patch('/:id', (0, validate_1.validate)(farm_schema_1.updateFarmSchema), deserializeUser_1.auth, farm_controller_1.updateFarmHandler);
farmRouter.delete('/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, farm_controller_1.deleteFarmHandler);
exports.default = farmRouter;
//# sourceMappingURL=farm.routes.js.map