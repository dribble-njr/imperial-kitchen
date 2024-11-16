/*
  Warnings:

  - You are about to alter the column `role` on the `KitchensOnUsers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `KitchensOnUsers` MODIFY `role` ENUM('ADMIN', 'MEMBER') NOT NULL;
