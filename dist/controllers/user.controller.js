"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.updateUserHandler = exports.getFarmerHandler = exports.getUserHandler = exports.usersPaginationHandler = exports.getUserByRoleNoHandler = exports.getUsersByRoleHandler = exports.getUsersByRoleHandler1 = exports.getUsersByRoleHandler_ = exports.getNoOfTotalUsersHandler = exports.getUsersHandler = void 0;
const user_service_1 = require("../services/user.service");
const app_error_1 = __importDefault(require("../utils/app.error"));
const userService = new user_service_1.UserService();
const getUsersHandler = async (req, res, next) => {
    try {
        const users = await (0, user_service_1.findAll)();
        res.status(200).status(200).json({
            status: 'Success',
            users
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsersHandler = getUsersHandler;
const getNoOfTotalUsersHandler = async (req, res, next) => {
    try {
        const users = await (await (0, user_service_1.findAll)()).length;
        res.status(200).status(200).json({
            status: 'Success',
            users
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getNoOfTotalUsersHandler = getNoOfTotalUsersHandler;
const getUsersByRoleHandler_ = async (req, res, next) => {
    try {
        const role = req.params.role;
        const lgas = await (0, user_service_1.getUsersByRole1)(role);
        if (!lgas) {
            return next(new app_error_1.default(401, 'Local Government does not exist'));
        }
        return res.status(200).json({
            status: 'Success',
            lgas
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsersByRoleHandler_ = getUsersByRoleHandler_;
const getUsersByRoleHandler1 = async (req, res, next) => {
    try {
        const role = req.params.role;
        const lgas = await (0, user_service_1.getUsersByRole1)(role);
        if (!lgas) {
            return next(new app_error_1.default(401, 'Local Government does not exist'));
        }
        return res.status(200).json({
            status: 'Success',
            lgas
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsersByRoleHandler1 = getUsersByRoleHandler1;
async function getUsersByRoleHandler(req, res) {
    const { role } = req.query;
    console.log(role);
    try {
        const users = await userService.getUsersByRole(role);
        res.status(200).json(users);
        console.log(102);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
}
exports.getUsersByRoleHandler = getUsersByRoleHandler;
const getUserByRoleNoHandler = async (req, res, next) => {
    try {
        const role = req.params.role;
        const users = await (await (0, user_service_1.getUsersByRole1)(role));
        const totalNo = users.length;
        if (!users) {
            return next(new app_error_1.default(401, 'Local Government does not exist'));
        }
        return res.status(200).json({
            status: 'Success',
            totalNo
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserByRoleNoHandler = getUserByRoleNoHandler;
const usersPaginationHandler = async (req, res, next) => {
    try {
        const { pageNo } = req.params;
        const users = await (0, user_service_1.pagination)(pageNo * 10, 10);
        res.status(200).status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.usersPaginationHandler = usersPaginationHandler;
const getUserHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.findById)({ id: id });
        if (!user) {
            return next(new app_error_1.default(401, 'User does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserHandler = getUserHandler;
const getFarmerHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.findById)({ id: id });
        if (!user) {
            return next(new app_error_1.default(401, 'User does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getFarmerHandler = getFarmerHandler;
const updateUserHandler = async (req, res, next) => {
    try {
        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role: req.body.role,
            gender: req.body.gender,
            phone: req.body.phone,
            staff_id: req.body.staff_id,
            marital_status: req.body.marital_status,
            profile_picture: req.body.profile_picture,
            state: req.body.state,
            password: req.body.password,
        };
        const { id } = req.params;
        const user = await (0, user_service_1.updateUser)({ id: id }, data);
        if (!user)
            return next(new app_error_1.default(401, 'User not found in database'));
        return res.status(201).json({
            status: 'Success',
            user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = async (req, res, next) => {
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
exports.deleteUserHandler = deleteUserHandler;
//# sourceMappingURL=user.controller.js.map