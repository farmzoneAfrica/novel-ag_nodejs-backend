/*
  Warnings:

  - The primary key for the `Agent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProsperityHub` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ProsperityHub" DROP CONSTRAINT "ProsperityHub_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_authorId_fkey";

-- AlterTable
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Agent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Agent_id_seq";

-- AlterTable
ALTER TABLE "ProsperityHub" DROP CONSTRAINT "ProsperityHub_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProsperityHub_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProsperityHub_id_seq";

-- AlterTable
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Warehouse_id_seq";

-- AddForeignKey
ALTER TABLE "ProsperityHub" ADD CONSTRAINT "ProsperityHub_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
