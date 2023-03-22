-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "provider" TEXT,
ADD COLUMN     "resetLink" TEXT NOT NULL DEFAULT '';
