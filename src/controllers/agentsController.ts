import prisma from "../utils/prismaClient";
import { IRecord} from "../types/interface";
import {
	registerAgentSchema,
	loginAgentSchema,
	updateAgentSchema,
	emailSchema
} from "../validations/agentValidation";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import cloudinary from "../utils/cloudinary";
import { generateAccessToken } from "../utils/auth";
import { emailServices } from "../services/emailServices";
import { sendEmail } from "../services/emailServices";
import jwt from "jsonwebtoken";
import { error } from "console";

export async function registerAgent(userData: IRecord) {
  const validateData = registerAgentSchema.safeParse(userData);
  if (!validateData.success) {
    throw validateData.error;
  }
  const validData = validateData.data;
	const duplicateMail = await prisma.agent.findFirst({
		where: { email: validData.email },
	});
	if (duplicateMail) throw "Email already exist";
	const duplicatePhone = await prisma.agent.findFirst({
		where: { phone: validData.phone },
	});
  if (duplicatePhone) throw "Phone number already exist";
	const duplicateUserName = await prisma.agent.findFirst({
		where: { userName: validData.userName },
	});
  if (duplicateUserName) throw "User name already exist";
  const { firstName, lastName, email, userName, phone, avatar, password, address } = userData;
  const hPassword = await encryptPassword(password) as string;
  const response =  await prisma.agent.create({
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
  })
  return response;
}

export async function verifyAgent(data: IRecord) {
	const isValidData = emailSchema.safeParse(data);
	if (!isValidData.success) {
		throw isValidData.error;
	}
	const record = isValidData.data;
	let agent;
	if (record.email) {
		agent = await prisma.agent.findUnique({
			where: { email: record.email },
		select: {email: true, userName: true, id: true}})
	}
	
}

export async function loginUser(data: IRecord) {
	const isValidData = loginAgentSchema.safeParse(data);
	if (!isValidData.success) {
		throw isValidData.error;
  }
  const record = isValidData.data;
let agent;
  if (record.email) {
  agent = await prisma.agent.findUnique({ where: { email: record.email }, 
      select: { email: true, password: true, userName: true, id : true }
  }) 
}
if (record.userName){
 agent = await prisma.agent.findUnique({ where: { email: record.userName }, 
      select: { email: true, password: true, userName: true, id : true  }
  }) 
}
	if (!agent) {
		throw "Login details incorrect";
  }
	const match = await decryptPassword(record.password, agent.password);
	if (!match) {
		throw "Incorrect password. Access denied";
  }
	return {
		token: generateAccessToken(agent.id),
	};
}

export async function getAgents() {
	const response = await prisma.agent.findMany()
	return response;
}

export async function getAgent(id: string) {
	const agent = await prisma.agent.findUnique({
		where: {id: id},
	})
	if (agent) {
		return agent;
	}
	throw "Agent not fond on database"
}

export async function updateAgent(id:string, data: IRecord) {
	const validData = updateAgentSchema.safeParse(data);
	if (!validData.success) {
		throw validData.error;
	}
	const agent = await prisma.agent.findUnique({ where: { id } });
	if (!agent) {
		throw "Cannot find agent";
	}
	const avatar = data.avatar;
	let uploadedResponse;
	if (avatar) {
		uploadedResponse = await cloudinary.uploader.upload(avatar, {
			allowed_formats: ["jpg", "png", "svg", "jpeg"],
			folder: "novel_ag"
		});

		if (!uploadedResponse) throw Error;
	}
	const record = validData.data;

	return prisma.agent.update({
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
				? ((await encryptPassword(record.password)) as string)
				: (agent.password as string),
		},
	});
}

export async function deleteAgent(id:string ) {
  const agent = await prisma.agent.findUnique({ where: { id } });
  if (agent) {
    return await prisma.agent.delete({
        where: { id }
      });  
  }
  throw new Error('Agent not found')
}

export async function forgotPassword(data: IRecord) {
	const validData = emailSchema.safeParse(data);
	if (!validData.success) throw validData.error;
	const email = validData.data.email;
	const agent = await prisma.agent.findUnique({ where: { email } });
	if (!agent) throw "Agent does not exist";
	const response = emailServices(agent, "resetpassword");
	return response;
}

// export async function resetPassword(token: string, newPassword: string) {
// 	const decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
// 	const id = decoded as string;
// 	const agent = await prisma.agent.findUnique({ where: { id: agent.id } });
// 	console.log("158", agent);
// 	if (!agent) throw "user not found";
// 	await updateAgent({password: newPassword, id: agent.id} );
// }
