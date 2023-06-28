import { PrismaClient, Prisma, User } from '@prisma/client';
import { omit } from 'lodash';
import config from 'config';
// import redisClient from '../utils/connect.redis';
import { signJwt } from '../utils/jwt';
import { number } from 'zod';

export const excludedFields = [
  "password",
  "verified",
  "verification_code",
  "password_reset_at",
  "password_reset_token",
];

const prisma = new PrismaClient();

// adjust logic to bring out farmers only

// export async function getFarmersService (
//   user_role: string): Promise<User[]> {
//     return ( await prisma.user.findMany({
//           where: {
//             user_role: user_role,
//           },
//         }))
//       }

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

