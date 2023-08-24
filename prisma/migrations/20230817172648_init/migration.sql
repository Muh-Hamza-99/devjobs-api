/*
  Warnings:

  - Added the required column `currency` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlySalary` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "monthlySalary" INTEGER NOT NULL;
