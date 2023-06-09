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
const warehouseRouter = express_1.default.Router();
// const base = ""
warehouseRouter.post('/', (0, validate_1.validate)(warehouse_schema_1.createWarehouseSchema), deserializeUser_1.auth, requireUser_1.requireUser, farm_controller_1.createFarmHandler);
warehouseRouter.get('/', deserializeUser_1.auth, farm_controller_1.getFarmsHandler);
warehouseRouter.get('/:id', deserializeUser_1.auth, farm_controller_1.getFarmHandler);
warehouseRouter.patch('/:id', (0, validate_1.validate)(warehouse_schema_1.updateWarehouseSchema), deserializeUser_1.auth, farm_controller_1.updateFarmHandler);
warehouseRouter.delete('/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, farm_controller_1.deleteFarmHandler);
exports.default = warehouseRouter;
//# sourceMappingURL=farm.routes.js.map