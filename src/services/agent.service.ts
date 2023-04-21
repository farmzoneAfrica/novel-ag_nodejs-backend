import { PrismaClient, Prisma, Agent } from '@prisma/client';
import { omit } from 'lodash';
import config from 'config';
import redisClient from '../utils/connectRedis';
import { signJwt } from '../utils/jwt';
import { number } from 'zod';

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

export const findAll = async () => {
  return await prisma.agent.findMany();
}

export const pagination = async (
  skip: number, 
  take: number
) => {
  return await prisma.agent.findMany({
    skip,
    take
  });
}

export const findAgent = async (
  where: Partial<Prisma.AgentWhereInput>,
  select?: Prisma.AgentSelect
) => {
  return (await prisma.agent.findFirst({
    where,
    select,
  })) as Agent;
};

export const findById = async (
  where: Prisma.AgentWhereUniqueInput,
) => {
  return (await prisma.agent.findUnique({
    where
  }))
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
  redisClient.set(`${agent.id}`, JSON.stringify(omit(agent, excludedFields)), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  const access_token = signJwt({ sub: agent.id }, 'ab1234', {
    expiresIn: `30s`,
  });

  const refresh_token = signJwt({ sub: agent.id }, 'ab1234', {
    expiresIn: `30s`,
  });
console.log(74, "sign in token function");
  return { access_token, refresh_token };
};

export const deleteAgent = async (id: string) => {
  return await prisma.agent.delete({where:{id}});
}

