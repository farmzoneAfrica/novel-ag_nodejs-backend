"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const prosperityHub_controller_1 = require("../controllers/prosperityHub.controller");
const prosperity_hub_schema_1 = require("../schemas/prosperity.hub.schema");
const validate_1 = require("../middleware/validate");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const prosperityHubrouter = express_1.default.Router();
const base = "";
prosperityHubrouter.post(base + '/create', (0, validate_1.validate)(prosperity_hub_schema_1.createProsperityHubSchema), deserializeUser_1.auth, requireUser_1.requireUser, prosperityHub_controller_1.createProsperityHubHandler);
prosperityHubrouter.get(base + '/get', deserializeUser_1.auth, prosperityHub_controller_1.getProsperityHubsHandler);
prosperityHubrouter.get(base + '/get/:id', deserializeUser_1.auth, prosperityHub_controller_1.getProsperityHubHandler);
prosperityHubrouter.patch(base + '/update/:id', (0, validate_1.validate)(prosperity_hub_schema_1.updateProsperityHubSchema), deserializeUser_1.auth, prosperityHub_controller_1.updateProsperityHubHandler);
prosperityHubrouter.delete(base + '/delete/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, prosperityHub_controller_1.deleteProsperityHubHandler);
exports.default = prosperityHubrouter;
//# sourceMappingURL=prosperity.hub.routes.js.map