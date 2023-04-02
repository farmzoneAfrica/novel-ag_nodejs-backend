/*
  Warnings:

  - You are about to drop the `Agent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('AGENT', 'ADMIN');

-- DropForeignKey
ALTER TABLE "ProsperityHub" DROP CONSTRAINT "ProsperityHub_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_authorId_fkey";

-- DropTable
DROP TABLE "Agent";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "agents" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "verified" BOOLEAN DEFAULT false,
    "provider" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetAt" TIMESTAMP(3),
    "verificationCode" TEXT,
    "role" "RoleEnumType" NOT NULL DEFAULT 'AGENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agents_email_key" ON "agents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agents_phone_key" ON "agents"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "agents_verificationCode_key" ON "agents"("verificationCode");

-- CreateIndex
CREATE INDEX "agents_email_verificationCode_passwordResetToken_idx" ON "agents"("email", "verificationCode", "passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "agents_email_verificationCode_passwordResetToken_key" ON "agents"("email", "verificationCode", "passwordResetToken");

-- AddForeignKey
ALTER TABLE "ProsperityHub" ADD CONSTRAINT "ProsperityHub_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
