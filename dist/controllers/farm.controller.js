"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFarmHandler = exports.updateFarmHandler = exports.getFarmHandler = exports.getFarmsHandler = exports.createFarmHandler = void 0;
const farm_service_1 = require("../services/farm.service");
const app_error_1 = __importDefault(require("../utils/app.error"));
const client_1 = require("@prisma/client");
const createFarmHandler = async (req, res, next) => {
    try {
        const userId = req.user.sub;
        const farm = await (0, farm_service_1.createFarm)({
            name: req.body.name,
            size: req.body.size,
            location: req.body.location,
            closest_landmark: req.body.closest_landmark,
            crop: req.body.crop,
            state: req.body.state,
            local_govt: req.body.local_govt,
            ward: req.body.ward,
            userId: userId
        });
        return res.status(201).json({
            status: "Success",
            farm
        });
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Farm with similara name already exist, please use another name',
                });
            }
        }
        next(err);
    }
};
exports.createFarmHandler = createFarmHandler;
const getFarmsHandler = async (req, res, next) => {
    try {
        const farm = await (0, farm_service_1.getFarms)();
        return res.status(200).json({
            status: 'Success',
            data: {
                farm,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getFarmsHandler = getFarmsHandler;
const getFarmHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const farm = await (0, farm_service_1.findById)({ id: id });
        if (!farm) {
            return next(new app_error_1.default(401, 'Warehouse does not exist'));
        }
        return res.status(200).status(200).json({
            status: 'success',
            data: {
                farm,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getFarmHandler = getFarmHandler;
const updateFarmHandler = async (req, res, next) => {
    try {
        //   const data = 
        const { id } = req.params;
        const farm = await (0, farm_service_1.updateFarm)({ id: id }, {
            name: req.body.name,
            size: req.body.size,
            location: req.body.location,
            closest_landmark: req.body.closest_landmark,
            crop: req.body.crop,
            state: req.body.state,
            local_govt: req.body.local_govt,
            ward: req.body.ward,
        });
        if (!farm)
            return next(new app_error_1.default(401, 'Warehouse does not exist'));
        return res.status(200).json({
            status: 'Success',
            farm,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateFarmHandler = updateFarmHandler;
const deleteFarmHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const farm = await (0, farm_service_1.findById)({ id: id });
        if (!farm)
            return next(new app_error_1.default(401, 'Err! Warehouse not found'));
        const response = await (0, farm_service_1.deleteFarm)(id);
        return res.status(200).json({
            status: 'success',
            response
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteFarmHandler = deleteFarmHandler;
//# sourceMappingURL=farm.controller.js.map