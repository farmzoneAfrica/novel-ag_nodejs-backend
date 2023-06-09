import { PrismaClient, Prisma, Farm } from '@prisma/client';

const prisma = new PrismaClient();

export const createFarm = async (input: Prisma.FarmCreateInput | any) => {  
  return (await prisma.farm.create({
    data: input,
  })) as Farm;
};

export const getFarms = async () => {
  return await prisma.farm.findMany();
};

export const getUniqueFarm = async (
  where: Partial<Prisma.FarmWhereInput>,
  select?: Prisma.FarmSelect
) => {
  return (await prisma.farm.findFirst({
    where,
    select,
  })) as Farm;
};

export const findById = async (
   where: Prisma.FarmWhereUniqueInput,
) => {
  return await prisma.farm.findUnique({
    where
  })
};

export const findUniqueFarm = async (
  where: Prisma.FarmWhereUniqueInput,
  select?: Prisma.FarmSelect
) => {
  return (await prisma.farm.findUnique({
    where,
    select,
  })) as Farm;
};

export const updateFarm = async (
  where: Partial<Prisma.FarmWhereUniqueInput>,
  data: Prisma.FarmUpdateInput | any,
  select?: Prisma.FarmSelect
) => {
  return (await prisma.farm.update({ where, data, select })) as Farm;
};

export const deleteFarm = async (id: string) => {
  return await prisma.farm.delete({where:{id}});
}


