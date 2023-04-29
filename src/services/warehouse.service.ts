import { PrismaClient, Prisma, Agent, Warehouse } from '@prisma/client';

const prisma = new PrismaClient();

export const createWarehouse = async (input: Prisma.WarehouseCreateInput | any) => {  
  return (await prisma.warehouse.create({
    data: input,
  })) as Warehouse;
};

export const getWarehouses = async () => {
  return await prisma.warehouse.findMany();
};

export const getUniqueWarehouse = async (
  where: Partial<Prisma.WarehouseWhereInput>,
  select?: Prisma.WarehouseSelect
) => {
  return (await prisma.warehouse.findFirst({
    where,
    select,
  })) as Warehouse;
};

export const findById = async (
   where: Prisma.WarehouseWhereUniqueInput,
) => {
  return await prisma.warehouse.findUnique({
    where
  })
};

export const findUniqueWarehouse = async (
  where: Prisma.WarehouseWhereUniqueInput,
  select?: Prisma.WarehouseSelect
) => {
  return (await prisma.warehouse.findUnique({
    where,
    select,
  })) as Warehouse;
};

export const updateWarehouse = async (
  where: Partial<Prisma.WarehouseWhereUniqueInput>,
  data: Prisma.WarehouseUpdateInput,
  select?: Prisma.WarehouseSelect
) => {
  return (await prisma.warehouse.update({ where, data, select })) as Warehouse;
};

export const deleteWarehouse = async (id: string) => {
  return await prisma.warehouse.delete({where:{id}});
}


