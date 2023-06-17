import { PrismaClient, Prisma, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const assignRole = async (input: Prisma.RoleCreateInput | any) => {  
  return (await prisma.role.create({
    data: input,
  })) as Role;
};

export const getRoles = async () => {
  return await prisma.role.findMany();
};

export const getUniqueRole = async (
  where: Partial<Prisma.RoleWhereInput>,
  select?: Prisma.RoleSelect
) => {
  return (await prisma.role.findFirst({
    where,
    select,
  })) as Role;
};



export const updateRole = async (
  where: Partial<Prisma.RoleWhereUniqueInput>,
  data: Prisma.RoleUpdateInput,
  select?: Prisma.RoleSelect
) => {
  return (await prisma.role.update({ where, data, select })) as Role;
};

export const deleteRole = async (id: string) => {
    return await prisma.role.delete({where:{id}});
  }
