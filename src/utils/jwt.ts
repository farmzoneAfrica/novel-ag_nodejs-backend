import dotenv from "dotenv";
import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';
dotenv.config();

export const signJwt = (
  payload: Object,
  keyName: 'ab1234' | 'ab1234',
  options: SignOptions
) => {
  // const privateKey = fs.readFileSync('private_key.pem').toString('ascii');
  const privateKey = 'ab1234'
  console.log("jwt", 10, privateKey);
  return jwt.sign(payload, privateKey, {
    // ...options,
    // algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'ab1234' | 'ab1234'
): T | null => {
  try {
    const publicKey = 'ab1234'
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}