"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const warehouse_controller_1 = require("../controllers/warehouse.controller");
const warehouse_schema_1 = require("../schemas/warehouse.schema");
const auth_1 = require("../middleware/auth");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const warehouseRouter = express_1.default.Router();
const base = "";
warehouseRouter.post(base + '/create', auth_1.auth, requireUser_1.requireUser, (0, validate_1.validate)(warehouse_schema_1.createWarehouseSchema), warehouse_controller_1.createWarehouseHandler);
warehouseRouter.get(base + '/get', auth_1.auth, warehouse_controller_1.getWarehousesHandler);
warehouseRouter.get(base + '/get/:id', auth_1.auth, warehouse_controller_1.getWarehouseHandler);
warehouseRouter.patch(base + '/update/:id', (0, validate_1.validate)(warehouse_schema_1.updateWarehouseSchema), auth_1.auth, warehouse_controller_1.updateWarehouseHandler);
warehouseRouter.get(base + '/delete/:id', auth_1.auth, auth_1.adminAuth, warehouse_controller_1.deleteWarehouseHandler);
exports.default = warehouseRouter;
//# sourceMappingURL=warehouse.routes.js.map