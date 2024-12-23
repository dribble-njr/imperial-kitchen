/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `KitchensOnUsers` DROP FOREIGN KEY `KitchensOnUsers_kitchenId_fkey`;

-- DropForeignKey
ALTER TABLE `KitchensOnUsers` DROP FOREIGN KEY `KitchensOnUsers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TagsOnDishes` DROP FOREIGN KEY `TagsOnDishes_dishId_fkey`;

-- DropForeignKey
ALTER TABLE `TagsOnDishes` DROP FOREIGN KEY `TagsOnDishes_tagId_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `kitchenId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Dish` ADD COLUMN `kitchenId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Category_kitchenId_idx` ON `Category`(`kitchenId`);

-- CreateIndex
CREATE INDEX `Dish_kitchenId_idx` ON `Dish`(`kitchenId`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_key` ON `Tag`(`name`);

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_kitchenId_fkey` FOREIGN KEY (`kitchenId`) REFERENCES `Kitchen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_kitchenId_fkey` FOREIGN KEY (`kitchenId`) REFERENCES `Kitchen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KitchensOnUsers` ADD CONSTRAINT `KitchensOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KitchensOnUsers` ADD CONSTRAINT `KitchensOnUsers_kitchenId_fkey` FOREIGN KEY (`kitchenId`) REFERENCES `Kitchen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagsOnDishes` ADD CONSTRAINT `TagsOnDishes_dishId_fkey` FOREIGN KEY (`dishId`) REFERENCES `Dish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagsOnDishes` ADD CONSTRAINT `TagsOnDishes_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Dish` RENAME INDEX `Dish_categoryId_fkey` TO `Dish_categoryId_idx`;
