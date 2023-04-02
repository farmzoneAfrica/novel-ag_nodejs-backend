"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.deleteAgent = exports.updateAgent = exports.getAgent = exports.getAgents = exports.loginUser = exports.verifyAgent = exports.registerAgent = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const agentSchema_1 = require("../schemas/agentSchema");
const hashPassword_1 = require("../services/hashPassword");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const auth_1 = require("../utils/auth");
const emailServices_1 = require("../services/emailServices");
async function registerAgent(userData) {
    const validateData = agentSchema_1.registerAgentSchema.safeParse(userData);
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
    const { firstName, lastName, email, userName, phone, avatar, password, address } = userData;
    const hPassword = await (0, hashPassword_1.encryptPassword)(password);
    const response = await prismaClient_1.default.agent.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            avatar,
            password: hPassword,
            address,
        },
    });
    return response;
}
exports.registerAgent = registerAgent;
async function verifyAgent(data) {
    const isValidData = agentSchema_1.emailSchema.safeParse(data);
    if (!isValidData.success) {
        throw isValidData.error;
    }
    const record = isValidData.data;
    let agent;
    if (record.email) {
        agent = await prismaClient_1.default.agent.findUnique({
            where: { email: record.email },
            select: { email: true, id: true }
        });
    }
}
exports.verifyAgent = verifyAgent;
async function loginUser(data) {
    const isValidData = agentSchema_1.loginAgentSchema.safeParse(data);
    if (!isValidData.success) {
        throw isValidData.error;
    }
    const record = isValidData.data;
    let agent;
    if (record.email) {
        agent = await prismaClient_1.default.agent.findUnique({ where: { email: record.email },
            select: { email: true, password: true, id: true }
        });
    }
    if (record.userName) {
        agent = await prismaClient_1.default.agent.findUnique({ where: { email: record.userName },
            select: { email: true, password: true, id: true }
        });
    }
    if (!agent) {
        throw "Login details incorrect";
    }
    const match = await (0, hashPassword_1.decryptPassword)(record.password, agent.password);
    if (!match) {
        throw "Incorrect password. Access denied";
    }
    return {
        token: (0, auth_1.generateAccessToken)(agent.id),
    };
}
exports.loginUser = loginUser;
async function getAgents() {
    const response = await prismaClient_1.default.agent.findMany();
    return response;
}
exports.getAgents = getAgents;
async function getAgent(id) {
    const agent = await prismaClient_1.default.agent.findUnique({
        where: { id: id },
    });
    if (agent) {
        return agent;
    }
    throw "Agent not fond on database";
}
exports.getAgent = getAgent;
async function updateAgent(id, data) {
    const validData = agentSchema_1.updateAgentSchema.safeParse(data);
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
            phone: record.phone,
            password: record.password
                ? (await (0, hashPassword_1.encryptPassword)(record.password))
                : agent.password,
        },
    });
}
exports.updateAgent = updateAgent;
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
async function forgotPassword(data) {
    const validData = agentSchema_1.emailSchema.safeParse(data);
    if (!validData.success)
        throw validData.error;
    const email = validData.data.email;
    const agent = await prismaClient_1.default.agent.findUnique({ where: { email } });
    if (!agent)
        throw "Agent does not exist";
    const response = (0, emailServices_1.emailServices)(agent, "resetpassword");
    return response;
}
exports.forgotPassword = forgotPassword;
// export async function resetPassword(token: string, newPassword: string) {
// 	const decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
// 	const id = decoded as string;
// 	const agent = await prisma.agent.findUnique({ where: { id: agent.id } });
// 	console.log("158", agent);
// 	if (!agent) throw "user not found";
// 	await updateAgent({password: newPassword, id: agent.id} );
// }
//# sourceMappingURL=agentsController.js.map