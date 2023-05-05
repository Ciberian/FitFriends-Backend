/*
  Warnings:

  - You are about to drop the column `gymParams` on the `Gym` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "gymParams",
ADD COLUMN     "gymFeatures" TEXT[];
