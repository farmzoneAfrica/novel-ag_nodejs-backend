"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const prosperityHub_controller_1 = require("../controllers/prosperityHub.controller");
const validate_1 = require("../middleware/validate");
const prosperityHub_schema_1 = require("../schemas/prosperityHub.schema");
const router = express_1.default.Router();
let base = '/api/prosperityHub';
router.post('/create', (0, validate_1.validate)(prosperityHub_schema_1.createProsperityHubSchema), prosperityHub_controller_1.createProsperityHubHandler);
router.patch('/update', (0, validate_1.validate)(prosperityHub_schema_1.updateProsperityHubSchema), prosperityHub_controller_1.updateProsperityHubHandler);
router.get('/', prosperityHub_controller_1.viewProsperityHubsHandler);
router.get('/:id', prosperityHub_controller_1.viewProsperityHubHandler);
router.get('/delete', prosperityHub_controller_1.deleteProsperityHubHandler);
exports.default = router;
//# sourceMappingURL=prosperityHub.routes.js.map