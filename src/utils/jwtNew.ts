import dotenv from "dotenv";
import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';
dotenv.config();

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey' ,
  options: SignOptions
) => {
    // const privateKey = fs.readFileSync('private_key.pem');
    const privateKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY as string;
  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    //   const publicKey = fs.readFileSync('public_key.pem');
      const publicKey = process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY as string;
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
}








