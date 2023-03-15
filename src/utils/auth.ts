import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction, } from "express";
import prisma from "./prismaClient";
import { user_ } from "../types/interface";

dotenv.config();
const secret_key = process.env.AUTH_SECRET as string;

export function generateAccessToken(id: string) {
	const key = process.env.AUTH_SECRET as string;
	const token = jwt.sign({ user_id: id }, key, {
		expiresIn: "7d",
	});
	return token;
}

export async function auth(req: user_, res: Response, next: NextFunction) {
	const authorization = req.headers.authorization;
    console.log(authorization);
    
	if (!authorization)
		return res.status(401).json({ error: "Access Denied, no token Provided" });
	try {
		const token = authorization.slice(7, authorization.length);
		const decoded = jwt.verify(token, secret_key);
		console.log('decoded',decoded);
		
		if (!decoded) {
			res.status(401).send("Unauthorized");
			return;
		}
		// const { user_id } = decoded;\

		const user = await prisma.agent.findUnique({
			where: {
				// id: user_id,
			},
		});
		if (!user) {
			res.status(401).send("please register to access our service");
			return;
		}
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send(error);
		return;
	}
}