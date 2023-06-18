import { PrismaClient, Prisma, Wallet } from '@prisma/client';

const prisma = new PrismaClient();

export const createWallet = async (input: Prisma.WalletCreateInput | any) => {  
  return (await prisma.wallet.create({
    data: input,
  })) as Wallet;
};

export const getWallets = async () => {
  return await prisma.wallet.findMany();
};

export const getUniqueWallet = async (
  where: Partial<Prisma.WalletWhereInput>,
  select?: Prisma.WalletSelect
) => {
  return (await prisma.wallet.findFirst({
    where,
    select,
  })) as Wallet;
};

export const findById = async (
   where: Prisma.WalletWhereUniqueInput,
) => {
  return await prisma.wallet.findUnique({
    where
  })
};

export const findUniqueWarehouse = async (
  where: Prisma.WalletWhereUniqueInput,
  select?: Prisma.WalletSelect
) => {
  return (await prisma.wallet.findUnique({
    where,
    select,
  })) as Wallet;
};

export const updateWallet = async (
  where: Partial<Prisma.WalletWhereUniqueInput>,
  data: Prisma.WarehouseUpdateInput,
  select?: Prisma.WalletSelect
) => {
  return (await prisma.wallet.update({ where, data, select })) as Wallet;
};

export const deleteWallet = async (id: string) => {
  return await prisma.wallet.delete({where:{id}});
}

