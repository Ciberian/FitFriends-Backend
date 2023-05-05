/*
  Warnings:

  - You are about to alter the column `ratingSum` on the `Training` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `reviewsCount` on the `Training` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Training" ALTER COLUMN "ratingSum" SET DATA TYPE INTEGER,
ALTER COLUMN "reviewsCount" SET DATA TYPE INTEGER;
