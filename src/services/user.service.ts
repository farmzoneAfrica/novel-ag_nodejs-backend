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

export const createUser = async (input: Prisma.UserCreateInput ) => {  
  return (await prisma.user.create({
    data: input,
  })) as User;
};

export const findAll = async () => {
  return await prisma.user.findMany();
}

export const pagination = async (
  skip: number, 
  take: number
) => {
  return await prisma.user.findMany({
    skip,
    take
  });
}

export const findUser = async (
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

export const findById = async (
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

export const findUniqueUser = async (
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

export const signTokens = async (user: Prisma.UserCreateInput) => {
  redisClient.set(`${user.id}`, JSON.stringify(omit(user, excludedFields)), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  const access_token = signJwt({ sub: user.id }, 'ab1234', {
    expiresIn: `30s`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'ab1234', {
    expiresIn: `30s`,
  });
  return { access_token, refresh_token };
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({where:{id}});
}

