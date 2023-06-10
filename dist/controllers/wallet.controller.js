"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWalletHandler = exports.updateWalletHandler = exports.getWalletHandler = exports.getWalletsHandler = exports.createWalletHandler = void 0;
const wallet_service_1 = require("../services/wallet.service");
const app_error_1 = __importDefault(require("../utils/app.error"));
const client_1 = require("@prisma/client");
const createWalletHandler = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const data = {
            bvn: req.body.bvn,
            bank: req.body.bank,
            account_number: req.body.account_number,
            account_name: req.body.account_name,
            userId: userId,
        };
        const wallet = await (0, wallet_service_1.createWallet)(data);
        return res.status(201).json({
            status: "Sucess",
            wallet
        });
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Error! BVN  already exist ',
                });
            }
        }
        next(err);
    }
};
exports.createWalletHandler = createWalletHandler;
const getWalletsHandler = async (req, res, next) => {
    try {
        const wallets = await (0, wallet_service_1.getWallets)();
        return res.status(200).json({
            status: 'success',
            wallets
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getWalletsHandler = getWalletsHandler;
const getWalletHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const warehouse = await (0, wallet_service_1.findById)({ id: id });
        if (!warehouse) {
            return next(new app_error_1.default(401, 'Warehouse does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            data: {
                warehouse,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getWalletHandler = getWalletHandler;
const updateWalletHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = {
            name: req.body.name,
            bank_name: req.body.bank_name,
            closest_landmark: req.body.closest_landmark,
            state: req.body.state,
            local_govt: req.body.local_govt,
            ward: req.body.ward,
            status: req.body.status
        };
        const warehouse = await (0, wallet_service_1.updateWallet)({ id: id }, data);
        if (!warehouse)
            return next(new app_error_1.default(401, 'Warehouse does not exist'));
        return res.status(200).json({
            status: 'Success',
            warehouse,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateWalletHandler = updateWalletHandler;
const deleteWalletHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const warehouse = await (0, wallet_service_1.findById)({ id: id });
        if (!warehouse)
            return next(new app_error_1.default(401, 'Err! Warehouse not found'));
        const response = await (0, wallet_service_1.deleteWallet)(id);
        return res.status(200).json({
            status: 'success',
            response
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteWalletHandler = deleteWalletHandler;
//# sourceMappingURL=wallet.controller.js.map