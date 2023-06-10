"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWarehouseHandler = exports.updateWarehouseHandler = exports.getWarehouseHandler = exports.getWarehousesHandler = exports.createWarehouseHandler = void 0;
const warehouse_service_1 = require("../services/warehouse.service");
const common_service_1 = require("../services/common.service");
const app_error_1 = __importDefault(require("../utils/app.error"));
const client_1 = require("@prisma/client");
const createWarehouseHandler = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const data = {
            name: req.body.name,
            location: req.body.location,
            closest_landmark: req.body.closest_landmark,
            state: req.body.state,
            local_govt: req.body.local_govt,
            ward: req.body.ward,
            status: req.body.status,
            userId: userId,
        };
        if ((0, common_service_1.getStates)().includes(data.state) === false) {
            return next(new app_error_1.default(400, 'Invalid state, please enter a valid state'));
        }
        if ((0, common_service_1.getLGAs)(data.state).includes(data.local_govt) === false) {
            return next(new app_error_1.default(400, 'Invalid LGA, please enter a valid local government'));
        }
        const warehouse = await (0, warehouse_service_1.createWarehouse)(data);
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
        const warehouses = await (0, warehouse_service_1.getWarehouses)();
        return res.status(200).json({
            status: 'success',
            warehouses
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
exports.getWarehouseHandler = getWarehouseHandler;
const updateWarehouseHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = {
            name: req.body.name,
            location: req.body.location,
            closest_landmark: req.body.closest_landmark,
            state: req.body.state,
            local_govt: req.body.local_govt,
            ward: req.body.ward,
            status: req.body.status
        };
        const warehouse = await (0, warehouse_service_1.updateWarehouse)({ id: id }, data);
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
exports.updateWarehouseHandler = updateWarehouseHandler;
const deleteWarehouseHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const warehouse = await (0, warehouse_service_1.findById)({ id: id });
        if (!warehouse)
            return next(new app_error_1.default(401, 'Err! Warehouse not found'));
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