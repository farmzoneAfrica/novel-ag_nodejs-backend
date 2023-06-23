import { PrismaClient, Prisma, State, LocalGovt, Ward, Role } from '@prisma/client';

import statesData from '../utils/statesAndLga.json'
import prisma from '../utils/prismaClient';
import { number } from 'zod';


export const getStates = async () => {
  return await prisma.state.findMany();
}

export const getState = async (
  where: Partial<Prisma.StateWhereInput>,
  select?: Prisma.StateSelect
) => {
  return (await prisma.state.findFirst({
    where,
    select,
  })) as State;
};

export const getLGAs = async () => {
  return await (prisma.localGovt.findMany());
}

export const getLGA = async (
  where: Partial<Prisma.LocalGovtWhereInput>,
  select?: Prisma.LocalGovtSelect
) => {
  return (await prisma.localGovt.findFirst({
    where,
    select,
  })) as LocalGovt;
};

// export async function getLocalGovtByStateId (
//   state_id: number): Promise<LocalGovt[]> {
//     return ( await prisma.localGovt.findMany({
//           where: {
//             state_id: state_id,
//           },
//         }))
//       }
export const getLocalGovtByStateId = async (state_id: number) => {
    return ( await prisma.localGovt.findMany({
          where: {
            state_id: state_id,
          },
        }))
      }

export const getWards = async () => {
  return await prisma.ward.findMany();
}

export const getWard = async (
  where: Partial<Prisma.WardWhereInput>,
  select?: Prisma.WardSelect
) => {
  return (await prisma.ward.findFirst({
    where,
    select,
  })) as Ward;
};

export const getRoles = async () => {
  return await prisma.role.findMany();
}

export const getRole = async (
  where: Partial<Prisma.RoleWhereInput>,
  select?: Prisma.RoleSelect
) => {
  return (await prisma.role.findFirst({
    where,
    select,
  })) as Role;
};


