"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgent = exports.updateAgent = exports.getAgent = exports.getAgents = exports.registerAgent = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const validation_1 = require("../utils/validation");
const hashPassword_1 = require("../utils/hashPassword");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
/* POST register agent */
async function registerAgent(userData) {
    const validateData = validation_1.registerAgentSchema.safeParse(userData);
    if (!validateData.success) {
        throw validateData.error;
    }
    const validData = validateData.data;
    const duplicateMail = await prismaClient_1.default.agent.findFirst({
        where: { email: validData.email },
    });
    if (duplicateMail)
        throw "Email already exist";
    const duplicatePhone = await prismaClient_1.default.agent.findFirst({
        where: { phone: validData.phone },
    });
    if (duplicatePhone)
        throw "Phone number already exist";
    const duplicateUserName = await prismaClient_1.default.agent.findFirst({
        where: { userName: validData.userName },
    });
    if (duplicateUserName)
        throw "User name already exist";
    const { firstName, lastName, email, userName, phone, avatar, password, address } = userData;
    const hPassword = await (0, hashPassword_1.encryptPassword)(password);
    const response = await prismaClient_1.default.agent.create({
        data: {
            firstName,
            lastName,
            email,
            userName,
            phone,
            avatar,
            password: hPassword,
            address,
        },
    });
    return response;
}
exports.registerAgent = registerAgent;
/* GET get all agents */
async function getAgents() {
    const response = await prismaClient_1.default.agent.findMany();
    return response;
}
exports.getAgents = getAgents;
/* GET get single agent */
async function getAgent(id) {
    const agent = await prismaClient_1.default.agent.findUnique({
        where: { id: id },
    });
    if (agent) {
        return agent;
    }
    return "Agent not fond on database";
}
exports.getAgent = getAgent;
/* PATCH update agent */
async function updateAgent(id, data) {
    const validData = validation_1.updateAgentSchema.safeParse(data);
    if (!validData.success) {
        throw validData.error;
    }
    const agent = await prismaClient_1.default.agent.findUnique({ where: { id } });
    if (!agent) {
        throw "Cannot find agent";
    }
    const avatar = data.avatar;
    let uploadedResponse;
    if (avatar) {
        uploadedResponse = await cloudinary_1.default.uploader.upload(avatar, {
            allowed_formats: ["jpg", "png", "svg", "jpeg"],
            folder: "novel_ag"
        });
        if (!uploadedResponse)
            throw Error;
    }
    const record = validData.data;
    return prismaClient_1.default.agent.update({
        where: {
            id,
        },
        data: {
            avatar: uploadedResponse ? uploadedResponse.url : record.avatar,
            firstName: record.firstName,
            lastName: record.lastName,
            userName: record.userName,
            phone: record.phone,
            isVerified: record.isVerified,
            password: record.password
                ? (await (0, hashPassword_1.encryptPassword)(record.password))
                : agent.password,
        },
    });
}
exports.updateAgent = updateAgent;
/* DELETE delete user */
async function deleteAgent(id) {
    const agent = await prismaClient_1.default.agent.findUnique({ where: { id } });
    if (agent) {
        return await prismaClient_1.default.agent.delete({
            where: { id }
        });
    }
    throw new Error('Agent not found');
}
exports.deleteAgent = deleteAgent;
//# sourceMappingURL=agentsController.js.map