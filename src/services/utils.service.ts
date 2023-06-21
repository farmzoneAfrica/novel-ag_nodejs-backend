import { PrismaClient, Prisma, State, LocalGovt, Ward } from '@prisma/client';

import statesData from '../utils/statesAndLga.json'
import prisma from '../utils/prismaClient';
import { number } from 'zod';


export const getStates = async () => {
  return await prisma.state.findMany();
}

export const getState = async (
  where: Prisma.LocalGovtWhereInput
) => {
  return await prisma.state.findMany();
}

export const getLGAs = async () => {
  return await (prisma.localGovt.findMany());
}

export const getLGA = async (
  where: Prisma.LocalGovtWhereInput
  ) => {
  return (await prisma.localGovt.findMany({
    where
  }));
}

// const localGovernments = await prisma.local_governments.findMany({
//   where: {
//     state_id: "7"
//   }
// });

export const getWards = async () => {
  return await prisma.ward.findMany();
}


