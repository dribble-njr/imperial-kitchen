/*
  Warnings:

  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - Made the column `kitchenId` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_kitchenId_fkey`;

-- DropIndex
DROP INDEX `Category_type_idx` ON `Category`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `type`,
    MODIFY `kitchenId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_kitchenId_fkey` FOREIGN KEY (`kitchenId`) REFERENCES `Kitchen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
