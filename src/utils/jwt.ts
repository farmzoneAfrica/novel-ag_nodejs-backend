import dotenv from "dotenv";
import jwt, { SignOptions } from 'jsonwebtoken';
dotenv.config();

export const signJwt = (
  payload: Object,
  keyName: 'ab1234' | 'ab1234',
  options: SignOptions
) => {
  const privateKey = 'ab1234'
  return jwt.sign(payload, privateKey, {

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