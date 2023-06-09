"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const farm_controller_1 = require("../controllers/farm.controller");
const warehouse_schema_1 = require("../schemas/warehouse.schema");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const farmRouter = express_1.default.Router();
farmRouter.post('/', (0, validate_1.validate)(warehouse_schema_1.createWarehouseSchema), deserializeUser_1.auth, requireUser_1.requireUser, farm_controller_1.createFarmHandler);
farmRouter.get('/', deserializeUser_1.auth, farm_controller_1.getFarmsHandler);
farmRouter.get('/:id', deserializeUser_1.auth, farm_controller_1.getFarmHandler);
farmRouter.patch('/:id', (0, validate_1.validate)(warehouse_schema_1.updateWarehouseSchema), deserializeUser_1.auth, farm_controller_1.updateFarmHandler);
farmRouter.delete('/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, farm_controller_1.deleteFarmHandler);
exports.default = farmRouter;
//# sourceMappingURL=farm.routes.js.map