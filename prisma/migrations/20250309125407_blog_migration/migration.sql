/*
  Warnings:

  - Added the required column `banner` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `banner` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `section` ADD COLUMN `position` INTEGER NOT NULL DEFAULT 0;
