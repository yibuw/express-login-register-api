/*
  Warnings:

  - A unique constraint covering the columns `[email_norm]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_norm` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_norm` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `email_norm` VARCHAR(200) NOT NULL,
    ADD COLUMN `name_norm` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_email_norm_key` ON `user`(`email_norm`);
