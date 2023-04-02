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

export const findAgent = async (
  where: Partial<Prisma.AgentCreateInput>,
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

export const signTokens = async (user: Prisma.AgentCreateInput) => {
  // 1. Create Session
  redisClient.set(`${user.id}`, JSON.stringify(omit(user, excludedFields)), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};

