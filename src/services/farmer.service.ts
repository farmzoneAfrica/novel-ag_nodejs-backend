import { PrismaClient, Prisma, User } from '@prisma/client';
import { omit } from 'lodash';
import config from 'config';
import redisClient from '../utils/connect.redis';
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

// adjust logic to bring out farmers only

export const findAllFarmers = async () => {
  return await prisma.user.findMany();
}

export const farmerPagination = async (
  skip: number, 
  take: number
) => {
  return await prisma.user.findMany({
    skip,
    take
  });
}

export const findFarmer = async (
  where: Prisma.UserCreateInput | any,
) => {
  return (await prisma.user.findUnique({
    where
  }))
};

export const findUser1 = async(
  where: Prisma.UserCreateInput | any,
) => { 
  return (await prisma.user.findUnique({
    where
  }))
}

export const findFarmerById = async (
  where: Prisma.UserWhereUniqueInput,
) => {
  return (await prisma.user.findUnique({
    where,
    include: {
      prosperityHub: true,
      warhouse: true
    }
  }))
};

export const findUniqueFarmer = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};

export const updateUser = async (
  where: Partial<Prisma.UserWhereUniqueInput>,
  data: Prisma.UserUpdateInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.update({ where, data, select })) as User;
};


export const deleteFarm = async (id: string) => {
  return await prisma.user.delete({where:{id}});
}