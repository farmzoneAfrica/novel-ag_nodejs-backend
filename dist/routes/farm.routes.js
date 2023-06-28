"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const farm_controller_1 = require("../controllers/farm.controller");
const farm_schema_1 = require("../schemas/farm.schema");
const validate_1 = require("../middleware/validate");
const farmRouter = express_1.default.Router();
// farmRouter.post( '/:farmer_id', validate(createFarmSchema), auth, requireUser, createFarmHandler);
farmRouter.post('/:farmer_id', (0, validate_1.validate)(farm_schema_1.createFarmSchema), farm_controller_1.createFarmHandler);
farmRouter.get('/', farm_controller_1.getFarmsHandler);
farmRouter.get('/:id', farm_controller_1.getFarmHandler);
farmRouter.patch('/:id', (0, validate_1.validate)(farm_schema_1.updateFarmSchema), farm_controller_1.updateFarmHandler);
farmRouter.delete('/:id', farm_controller_1.deleteFarmHandler);
// farmRouter.post( '/:farmer_id', validate(createFarmSchema), auth, createFarmHandler);
// farmRouter.get( '/', auth, getFarmsHandler);
// farmRouter.get( '/:id', auth, getFarmHandler);
// farmRouter.patch( '/:id', validate(updateFarmSchema), auth, updateFarmHandler);
// farmRouter.delete( '/:id', auth, adminAuth, deleteFarmHandler);
exports.default = farmRouter;
//# sourceMappingURL=farm.routes.js.map