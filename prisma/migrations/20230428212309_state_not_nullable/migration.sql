/*
  Warnings:

  - Made the column `avatar` on table `agents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `agents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "agents" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL;
