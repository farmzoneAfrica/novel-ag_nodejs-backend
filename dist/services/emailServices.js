"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.emailServices = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const agentValidation_1 = require("../validations/agentValidation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
async function emailServices(data, route) {
    const { email, id, userName } = data;
    const token = jsonwebtoken_1.default.sign({ agent_id: id }, process.env.AUTH_SECRET, { expiresIn: "10m" });
    const link = `${process.env.FRONTEND_URL}/${route}/${token}`;
    const emailTemplate = `
<div style="max-width: 700px;text-align: center; text-transform: uppercase;
     margin:auto; border: 10px solid #DE3D6D; padding: 50px 20px; font-size: 110%;">
     <h2 style="color: #03435F;">Welcome to <span style="color : #DE3D6D";>Novel - <span><span style="color:#F5844C;">AG<span></h2>
     <p>Hello ${userName}, Please Follow the link by clicking on the button to verify your email
      </p>
      <div style="text-align:center ;">
        <a href=${link}
       style="background: #03435F; text-decoration: none; color: white;
        padding: 10px 20px; margin: 10px 0;
       display: inline-block;">Click here</a>
      </div>
</div>
`;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        username: userName,
        to: email,
        subject: "Novel - AG SMART AGENT",
        html: emailTemplate
    };
    return transporter.sendMail(mailOptions, (err, info) => err ? err : info.response);
}
exports.emailServices = emailServices;
async function sendEmail(email) {
    const isValidData = agentValidation_1.emailSchema.safeParse(email);
    if (!isValidData.success)
        throw isValidData.error;
    const record = isValidData.data.email;
    console.log("49", record);
    const userData = await prismaClient_1.default.agent.findUnique({ where: { email: record } });
    if (!userData)
        throw `Agent with ${record} does not exist`;
    const response = await emailServices(userData, "verify");
    return response;
}
exports.sendEmail = sendEmail;
// export async function verifyUser(token: string) {
// 	const decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
// 	const id = decoded as unknown as Record<string, string>;
// 	const agent = await prisma.agent.findUnique({ where: { id: id.user_id } });
// 	if (!agent) throw "user not found";
// 	const response = await updateAgent(id, agent);
// 	return response;
// }
//# sourceMappingURL=emailServices.js.map