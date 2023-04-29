"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWarehouseHandler = exports.updateWarehouseHandler = exports.getWarehouseHandler = exports.getWarehousesHandler = exports.createWarehouseHandler = void 0;
const warehouse_service_1 = require("../services/warehouse.service");
const common_service_1 = require("../services/common.service");
const appError_1 = __importDefault(require("../utils/appError"));
const client_1 = require("@prisma/client");
const createWarehouseHandler = async (req, res, next) => {
    try {
        const agentId = req.user.sub;
        const warehouse = await (0, warehouse_service_1.createWarehouse)({
            name: req.body.name,
            address: req.body.address,
            state: req.body.state,
            localGovt: req.body.localGovt,
            remarks: req.body.remarks,
            agentId: agentId
        });
        const inputState = warehouse.state;
        const inputLGA = warehouse.localGovt;
        const states = await (0, common_service_1.getStates)();
        const LGAs = await (0, common_service_1.getLGAs)(inputState);
        if (states.includes(inputState) === false) {
            return next(new appError_1.default(400, 'Invalid state, please enter a valid state'));
        }
        if (LGAs.includes(inputLGA) === false) {
            return next(new appError_1.default(400, 'Invalid LGA, please enter a valid local government'));
        }
        return res.status(201).json({
            status: "Sucess",
            warehouse
        });
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Warehouse name already exist, please use another name',
                });
            }
        }
        next(err);
    }
};
exports.createWarehouseHandler = createWarehouseHandler;
const getWarehousesHandler = async (req, res, next) => {
    try {
        const warehouse = await (0, warehouse_service_1.getWarehouses)();
        return res.status(200).status(200).json({
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
exports.getWarehousesHandler = getWarehousesHandler;
const getWarehouseHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const warehouse = await (0, warehouse_service_1.findById)({ id: id });
        if (!warehouse) {
            return next(new appError_1.default(401, 'Warehouse does not exist'));
        }
        return res.status(200).status(200).json({
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
exports.getWarehouseHandler = getWarehouseHandler;
const updateWarehouseHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = {
            name: req.body.name,
            address: req.body.address,
            state: req.body.state,
            localGovt: req.body.localGovt,
            status: req.body.status,
            remarks: req.body.remarks,
        };
        const warehouse = await (0, warehouse_service_1.updateWarehouse)({ id: id }, data);
        if (!warehouse)
            return next(new appError_1.default(401, 'Warehouse does not exist'));
        return res.status(200).json({
            status: 'Success',
            warehouse,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateWarehouseHandler = updateWarehouseHandler;
const deleteWarehouseHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const warehouse = await (0, warehouse_service_1.findById)({ id: id });
        if (!warehouse)
            return next(new appError_1.default(401, 'Err! Warehouse not found'));
        const response = await (0, warehouse_service_1.deleteWarehouse)(id);
        return res.status(200).json({
            status: 'success',
            response
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteWarehouseHandler = deleteWarehouseHandler;
//# sourceMappingURL=warehouse.controller.js.map