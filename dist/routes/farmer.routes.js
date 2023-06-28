"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const farmers_controller_1 = require("../controllers/farmers.controller");
const user_schema_1 = require("../schemas/user.schema");
const requireUser_1 = require("../middleware/requireUser");
const farmerRouter = express_1.default.Router();
farmerRouter.get('/', farmers_controller_1.getAgentsHandler);
farmerRouter.get('/:id', requireUser_1.requireUser, farmers_controller_1.getAgentHandler);
farmerRouter.get('/:pageNo', farmers_controller_1.getAgentsByPageHandler);
farmerRouter.patch('/:id', (0, validate_1.validate)(user_schema_1.updateUserSchema), farmers_controller_1.updateUserHandler);
farmerRouter.delete('/:id', farmers_controller_1.deleteAgentHandler);
// farmerRouter.get( '/', auth, getAgentsHandler);
// farmerRouter.get( '/:id', auth, requireUser, getAgentHandler);
// farmerRouter.get( '/:pageNo', getAgentsByPageHandler);
// farmerRouter.patch( '/:id', validate(updateUserSchema), auth, updateUserHandler );
// farmerRouter.delete( '/:id', auth, adminAuth, deleteAgentHandler );
exports.default = farmerRouter;
//# sourceMappingURL=farmer.routes.js.map