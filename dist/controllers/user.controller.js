"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgentHandler = exports.updateUserHandler = exports.getAgentHandler = exports.getAgentsByPageHandler = exports.getAgentsHandler = void 0;
const user_service_1 = require("../services/user.service");
const app_error_1 = __importDefault(require("../utils/app.error"));
const getAgentsHandler = async (req, res, next) => {
    try {
        const agents = await (0, user_service_1.findAll)();
        res.status(200).status(200).json({
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
exports.getAgentsHandler = getAgentsHandler;
const getAgentsByPageHandler = async (req, res, next) => {
    try {
        const { pageNo } = req.params;
        const agents = await (0, user_service_1.pagination)(pageNo * 10, 10);
        res.status(200).status(200).json({
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
exports.getAgentsByPageHandler = getAgentsByPageHandler;
const getAgentHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agent = await (0, user_service_1.findById)({ id: id });
        if (!agent) {
            return next(new app_error_1.default(401, 'Agent does not exist'));
        }
        return res.status(200).json({
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
exports.getAgentHandler = getAgentHandler;
const updateUserHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findUser = await (0, user_service_1.findById)({ id: id });
        if (!findUser)
            return next(new app_error_1.default(401, 'User not found in database'));
        const body = (Object.keys(req.body));
        const data = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            address: req.body.address,
            gender: req.body.gender,
            marital_status: req.body.maritalStatus,
            phone: req.body.phone,
            avatar: req.body.avatar,
            state: req.body.state,
            local_govt: req.body.localGovt,
            password: req.body.password,
        };
        const dataKeys = Object.keys(data);
        if (dataKeys.includes(body.toString()) === false) {
            return next(new app_error_1.default(401, 'Wrong input value'));
        }
        const user = await (0, user_service_1.updateUser)({ id: id }, data);
        if (!user) {
            return next(new app_error_1.default(401, 'User does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateUserHandler = updateUserHandler;
const deleteAgentHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agent = await (0, user_service_1.findById)({ id: id });
        if (!agent)
            return next(new app_error_1.default(401, 'Agent not found in database'));
        const response = await (0, user_service_1.deleteUser)(id);
        return res.status(200).json({
            status: 'success',
            response
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAgentHandler = deleteAgentHandler;
//# sourceMappingURL=user.controller.js.map