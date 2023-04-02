/*
  Warnings:

  - Made the column `firstName` on table `agents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "agents" ALTER COLUMN "firstName" SET NOT NULL;
