import { PrismaClient, Prisma, Agent, ProsperityHub } from '@prisma/client';
import config from 'config';
import redisClient from '../utils/connectRedis';

const prisma = new PrismaClient();

export const createProsperityHub = async (input: Prisma.ProsperityHubCreateInput | any) => {  
  return (await prisma.prosperityHub.create({
    data: input,
  })) as ProsperityHub;
};

export const getAllProsperityHubs = async () => {
  return await prisma.prosperityHub.findMany();
};

export const findProsperityHub = async (
  where: Partial<Prisma.ProsperityHubWhereInput>,
  select?: Prisma.ProsperityHubSelect
) => {
  return (await prisma.prosperityHub.findFirst({
    where,
    select,
  })) as ProsperityHub;
};

export const findById = async (
  where: Prisma.ProsperityHubWhereUniqueInput,
) => {
  return await prisma.prosperityHub.findUnique({
    where
  })
};

// export const findUniqueProsperityHub = async (
//   where: Prisma.ProsperityHubWhereUniqueInput,
//   select?: Prisma.ProsperityHubSelect
// ) => {
//   return (await prisma.prosperityHub.findUnique({
//     where,
//     select,
//   })) as ProsperityHub;
// };

export const updateProsperityHub = async (
  where: Partial<Prisma.ProsperityHubWhereUniqueInput>,
  data: Prisma.ProsperityHubUpdateInput,
  select?: Prisma.ProsperityHubSelect
) => {
  return (await prisma.prosperityHub.update({ where, data, select })) as Agent;
};

export const deleteProsperityHub = async (
  where: Prisma.ProsperityHubWhereUniqueInput,
  select?: Prisma.ProsperityHubSelect
) => {
  return (await prisma.prosperityHub.findUnique({
    where,
    select,
  })) as ProsperityHub;
};


