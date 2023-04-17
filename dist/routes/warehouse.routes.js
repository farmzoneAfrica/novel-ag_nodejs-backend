"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const warehouse_controller_1 = require("../controllers/warehouse.controller");
const warehouse_schema_1 = require("../schemas/warehouse.schema");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const warehouseRouter = express_1.default.Router();
// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = "";
warehouseRouter.post(base + '/create', deserializeUser_1.deserializeUser, requireUser_1.requireUser, (0, validate_1.validate)(warehouse_schema_1.createWarehouseSchema), warehouse_controller_1.createWarehouseHandler);
warehouseRouter.patch(base + '/update', deserializeUser_1.deserializeUser, requireUser_1.requireUser, (0, validate_1.validate)(warehouse_schema_1.updateWarehouseSchema), warehouse_controller_1.updateWarehouseHandler);
warehouseRouter.get(base + '/', deserializeUser_1.deserializeUser, warehouse_controller_1.viewWarehousesHandler);
warehouseRouter.get(base + '/:id', deserializeUser_1.deserializeUser, warehouse_controller_1.viewWarehouseHandler);
warehouseRouter.get(base + '/delete', deserializeUser_1.deserializeUser, warehouse_controller_1.deleteWarehouseHandler);
exports.default = warehouseRouter;
//# sourceMappingURL=warehouse.routes.js.map