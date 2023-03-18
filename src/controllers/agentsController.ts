import prisma from "../utils/prismaClient";
import { IRecord} from "../types/interface";
import {
	registerAgentSchema,
	loginAgentSchema,
	updateAgentSchema
} from "../utils/agentValidation";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import cloudinary from "../utils/cloudinary";
import { generateAccessToken } from "../utils/auth";

/* POST register agent */
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

/* POST login user */
export async function loginUser(data: IRecord) {
	const isValidData = loginAgentSchema.safeParse(data);
	if (!isValidData.success) {
		throw isValidData.error;
  }
  const record = isValidData.data;
//   let agent = {
//       id: "",
//   email: "",
//   password: "",
//    userName: "",
//   };
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

/* GET get all agents */
export async function getAgents() {
	const response = await prisma.agent.findMany()
	return response;
}

/* GET get single agent */
export async function getAgent(id: string) {
	const agent = await prisma.agent.findUnique({
		where: {id: id},
	})
	if (agent) {
		return agent;
	}
	return "Agent not fond on database"
}
/* PATCH update agent */
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

/* DELETE delete user */
export async function deleteAgent(id:string ) {
  const agent = await prisma.agent.findUnique({ where: { id } });
  if (agent) {
    return await prisma.agent.delete({
        where: { id }
      });  
  }
  throw new Error('Agent not found')
	
}
