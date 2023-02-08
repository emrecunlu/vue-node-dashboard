/*
  Warnings:

  - Added the required column `markdown` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content` ADD COLUMN `markdown` TEXT NOT NULL;
