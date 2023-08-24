/*
  Warnings:

  - You are about to drop the column `skills` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "Requirement" (
    "id" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "requiredExperience" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "jobId" TEXT,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
