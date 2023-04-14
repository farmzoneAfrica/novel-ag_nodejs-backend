"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const warehouse_controller_1 = require("../controllers/warehouse.controller");
const validate_1 = require("../middleware/validate");
const warehouse_schema_1 = require("../schemas/warehouse.schema");
const router = express_1.default.Router();
let base = '/api/Warehouse';
router.post('/create', (0, validate_1.validate)(warehouse_schema_1.createWarehouseSchema), warehouse_controller_1.createWarehouseHandler);
router.patch('/update', (0, validate_1.validate)(warehouse_schema_1.updateWarehouseSchema), warehouse_controller_1.updateWarehouseHandler);
router.get('/', warehouse_controller_1.viewWarehousesHandler);
router.get('/:id', warehouse_controller_1.viewWarehouseHandler);
router.get('/delete', warehouse_controller_1.deleteWarehouseHandler);
exports.default = router;
//# sourceMappingURL=warehouse.routes.js.map