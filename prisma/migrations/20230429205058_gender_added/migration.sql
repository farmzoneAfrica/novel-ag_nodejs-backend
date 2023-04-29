/*
  Warnings:

  - Changed the type of `gender` on the `agents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GenderEnumType" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "agents" DROP COLUMN "gender",
ADD COLUMN     "gender" "GenderEnumType" NOT NULL;
