/*
  Warnings:

  - You are about to drop the column `gender` on the `agents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "agents" DROP COLUMN "gender",
ALTER COLUMN "maritalStatus" SET DEFAULT 'NA';
