/*
  Warnings:

  - You are about to drop the `agents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "agents";

-- CreateTable
CREATE TABLE "agent" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "address" TEXT,
    "avatar" TEXT,
    "verified" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" NOT NULL DEFAULT 'AGENT',
    "verificationCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provider" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetAt" TIMESTAMP(3),

    CONSTRAINT "agent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_email_key" ON "agent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agent_phone_key" ON "agent"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "agent_verificationCode_key" ON "agent"("verificationCode");

-- CreateIndex
CREATE INDEX "agent_email_verificationCode_passwordResetToken_idx" ON "agent"("email", "verificationCode", "passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "agent_email_verificationCode_passwordResetToken_key" ON "agent"("email", "verificationCode", "passwordResetToken");
