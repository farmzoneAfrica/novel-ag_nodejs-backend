"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWarehouseHandler = exports.updateWarehouseHandler = exports.viewWarehouseHandler = exports.viewWarehousesHandler = exports.createWarehouseHandler = void 0;
const warehouse_service_1 = require("../services/warehouse.service");
const common_service_1 = require("../services/common.service");
const appError_1 = __importDefault(require("../utils/appError"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
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
        console.log(91, "email verification fail", err);
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Prosperity Hub with a similar name already exist, please use another name',
                });
            }
        }
        next(err);
    }
};
exports.createWarehouseHandler = createWarehouseHandler;
const viewWarehousesHandler = async (req, res, next) => {
    try {
        const agents = await (0, warehouse_service_1.getWarehouses)();
        res.status(200).status(200).json({
            hello: "hello viewWarehousesHandler",
            status: 'success',
            data: {
                agents,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.viewWarehousesHandler = viewWarehousesHandler;
// get single agent
const viewWarehouseHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agent = await prismaClient_1.default.agent.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                prosperityHub: true,
                warhouse: true
            }
        });
        if (!agent) {
            return next(new appError_1.default(401, 'Agent does not exist'));
        }
        return res.status(200).status(200).json({
            hello: "hello viewWarehouseHandler",
            status: 'success',
            data: {
                agent,
            },
        });
    }
    catch (err) {
        console.log(76, err);
        next(err);
    }
};
exports.viewWarehouseHandler = viewWarehouseHandler;
const updateWarehouseHandler = async (req, res, next) => {
    try {
        const agent = res.locals.agent;
        res.status(200).status(200).json({
            hello: "hello updateWarehouseHandler",
            status: 'success',
            data: {
                agent,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateWarehouseHandler = updateWarehouseHandler;
const deleteWarehouseHandler = async (req, res, next) => {
    try {
        const agent = res.locals.agent;
        res.status(200).status(200).json({
            hello: "hello deleteWarehouseHandler",
            status: 'success',
            data: {
                agent,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteWarehouseHandler = deleteWarehouseHandler;
//# sourceMappingURL=warehouse.controller.js.map