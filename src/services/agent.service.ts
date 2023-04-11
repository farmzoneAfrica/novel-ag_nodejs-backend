import { PrismaClient, Prisma, Agent } from '@prisma/client';
import { omit } from 'lodash';
import config from 'config';
import redisClient from '../utils/connectRedis';
import { signJwt } from '../utils/jwt';

export const excludedFields = [
  "password",
  "verified",
  "verificationCode",
  "passwordResetAt",
  "passwordResetToken",
];

const prisma = new PrismaClient();

export const createAgent = async (input: Prisma.AgentCreateInput) => {  
  return (await prisma.agent.create({
    data: input,
  })) as Agent;
};

// export const createAgent = async () => {
//   console.log(12,"register service")
//   return 
// };

export const findAll = async () => {
  return await prisma.agent.findMany();
};

export const findAgent = async (
  // change the type from any to match the desire type
  where: Partial<any>,
  select?: Prisma.AgentSelect
) => {
  return (await prisma.agent.findFirst({
    where,
    select,
  })) as Agent;
};

export const findUniqueAgent = async (
  where: Prisma.AgentWhereUniqueInput,
  select?: Prisma.AgentSelect
) => {
  return (await prisma.agent.findUnique({
    where,
    select,
  })) as Agent;
};

export const updateAgent = async (
  where: Partial<Prisma.AgentWhereUniqueInput>,
  data: Prisma.AgentUpdateInput,
  select?: Prisma.AgentSelect
) => {
  return (await prisma.agent.update({ where, data, select })) as Agent;
};

export const signTokens = async (agent: Prisma.AgentCreateInput) => {
  // 1. Create Session
  redisClient.set(`${agent.id}`, JSON.stringify(omit(agent, excludedFields)), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });
console.log(64, "sign in token function");

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: agent.id }, 'accessTokenPrivateKey', {
    // expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    expiresIn: `30s`,
  });

  const refresh_token = signJwt({ sub: agent.id }, 'refreshTokenPrivateKey', {
    // expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    expiresIn: `30s`,
  });
console.log(74, "sign in token function");
  return { access_token, refresh_token };
};

