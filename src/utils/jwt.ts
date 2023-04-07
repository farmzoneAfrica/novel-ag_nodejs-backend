import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey' ,
  options: SignOptions
) => {
  const privateKey = fs.readFileSync('private_key.pem');
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
    const publicKey = fs.readFileSync('public_key.pem');
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
}








