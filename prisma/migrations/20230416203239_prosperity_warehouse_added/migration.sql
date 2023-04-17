/*
  Warnings:

  - You are about to drop the `warehouses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "prosperityHubs" DROP CONSTRAINT "prosperityHubs_agentId_fkey";

-- DropForeignKey
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_agentId_fkey";

-- DropTable
DROP TABLE "warehouses";

-- CreateTable
CREATE TABLE "wareshouses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "remarks" TEXT,
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wareshouses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prosperityHubs" ADD CONSTRAINT "prosperityHubs_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wareshouses" ADD CONSTRAINT "wareshouses_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
