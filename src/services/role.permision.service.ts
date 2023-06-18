import { PrismaClient, Prisma, Role, Permission } from '@prisma/client';

const prisma = new PrismaClient();

export const assignRole = async (input: Prisma.RoleCreateInput) => {  
  return (await prisma.role.create({
    data: input,
  })) as Role;
};

export const assignPermission = async (input: Prisma.PermissionCreateInput) => {  
  return (await prisma.permission.create({
    data: input,
  })) as Permission;
};

export const updateRole = async (
  where: Partial<Prisma.RoleWhereUniqueInput>,
  data: Prisma.RoleUpdateInput,
  select?: Prisma.RoleSelect
) => {
  return (await prisma.role.update({ where, data, select })) as Role;
};

export const updatePermission = async (
  where: Partial<Prisma.PermissionWhereUniqueInput>,
  data: Prisma.PermissionUpdateInput,
  select?: Prisma.PermissionSelect
) => {
  return (await prisma.permission.update({ where, data, select })) as Permission;
};

