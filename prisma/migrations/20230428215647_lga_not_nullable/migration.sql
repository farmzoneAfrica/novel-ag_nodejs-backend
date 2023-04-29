/*
  Warnings:

  - Made the column `localGovt` on table `agents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "agents" ALTER COLUMN "localGovt" SET NOT NULL;
