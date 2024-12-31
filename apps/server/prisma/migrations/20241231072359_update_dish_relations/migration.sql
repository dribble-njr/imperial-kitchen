/*
  Warnings:

  - Made the column `categoryId` on table `Dish` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kitchenId` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Dish` DROP FOREIGN KEY `Dish_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Dish` DROP FOREIGN KEY `Dish_kitchenId_fkey`;

-- AlterTable
ALTER TABLE `Dish` MODIFY `categoryId` INTEGER NOT NULL,
    MODIFY `kitchenId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `KitchensOnUsers_userId_idx` ON `KitchensOnUsers`(`userId`);

-- CreateIndex
CREATE INDEX `TagsOnDishes_dishId_idx` ON `TagsOnDishes`(`dishId`);

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_kitchenId_fkey` FOREIGN KEY (`kitchenId`) REFERENCES `Kitchen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
