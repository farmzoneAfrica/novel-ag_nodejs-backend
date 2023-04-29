"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const prosperityHub_controller_1 = require("../controllers/prosperityHub.controller");
const prosperityHub_schema_1 = require("../schemas/prosperityHub.schema");
const validate_1 = require("../middleware/validate");
const auth_1 = require("../middleware/auth");
const requireUser_1 = require("../middleware/requireUser");
const prosperityHubrouter = express_1.default.Router();
const base = "";
prosperityHubrouter.post(base + '/create', auth_1.auth, requireUser_1.requireUser, (0, validate_1.validate)(prosperityHub_schema_1.createProsperityHubSchema), prosperityHub_controller_1.createProsperityHubHandler);
prosperityHubrouter.get(base + '/get', auth_1.auth, prosperityHub_controller_1.getProsperityHubsHandler);
prosperityHubrouter.get(base + '/:id', auth_1.auth, prosperityHub_controller_1.getProsperityHubHandler);
prosperityHubrouter.patch(base + '/update/:id', (0, validate_1.validate)(prosperityHub_schema_1.updateProsperityHubSchema), auth_1.auth, prosperityHub_controller_1.updateProsperityHubHandler);
prosperityHubrouter.delete(base + '/delete/:id', auth_1.auth, prosperityHub_controller_1.deleteProsperityHubHandler);
// prosperityHubrouter.delete(base+'/delete/id', auth, adminAuth, deleteProsperityHubHandler);
exports.default = prosperityHubrouter;
//# sourceMappingURL=prosperityHub.routes.js.map