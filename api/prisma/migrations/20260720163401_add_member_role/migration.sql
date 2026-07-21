-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HOST', 'PLAYER');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PLAYER';

-- CreateIndex
CREATE INDEX "Member_sessionId_idx" ON "Member"("sessionId");
