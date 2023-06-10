"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = require("../controllers/wallet.controller");
const warehouse_schema_1 = require("../schemas/warehouse.schema");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const walletRouter = express_1.default.Router();
walletRouter.post('/', (0, validate_1.validate)(warehouse_schema_1.createWarehouseSchema), deserializeUser_1.auth, requireUser_1.requireUser, wallet_controller_1.createWalletHandler);
walletRouter.get('/', deserializeUser_1.auth, wallet_controller_1.getWalletsHandler);
walletRouter.get('/:id', deserializeUser_1.auth, wallet_controller_1.getWalletHandler);
walletRouter.patch('/:id', (0, validate_1.validate)(warehouse_schema_1.updateWarehouseSchema), deserializeUser_1.auth, wallet_controller_1.updateWalletHandler);
walletRouter.delete('/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, wallet_controller_1.deleteWalletHandler);
exports.default = walletRouter;
//# sourceMappingURL=wallet.route.js.map