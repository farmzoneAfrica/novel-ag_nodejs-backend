"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWalletHandler = exports.updateWalletHandler = exports.getWalletHandler = exports.getWalletsHandler = exports.createRoleHandler = void 0;
const role_service_1 = require("../services/role.service");
const app_error_1 = __importDefault(require("../utils/app.error"));
const client_1 = require("@prisma/client");
const createRoleHandler = async (req, res, next) => {
    try {
        // const admin = req.user.sub;
        const data = {
            role: req.body.role
            //   admin: userId,
        };
        const role = await (0, role_service_1.assignRole)(data);
        return res.status(201).json({
            status: "Sucess",
            role
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
exports.createRoleHandler = createRoleHandler;
const getWalletsHandler = async (req, res, next) => {
    try {
        const wallets = await getWallets();
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
        const wallet = await findById({ id: id });
        if (!wallet) {
            return next(new app_error_1.default(401, 'wallet does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            data: {
                wallet,
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
        const wallet = await updateWallet({ id: id }, data);
        if (!wallet)
            return next(new app_error_1.default(401, 'wallet does not exist'));
        return res.status(200).json({
            status: 'Success',
            wallet,
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
        const wallet = await findById({ id: id });
        if (!wallet)
            return next(new app_error_1.default(401, 'Err! wallet not found'));
        const response = await deleteWallet(id);
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
//# sourceMappingURL=role.controller.js.map