-- RenameIndex
ALTER TABLE `KitchensOnUsers` RENAME INDEX `KitchensOnUsers_kitchenId_fkey` TO `KitchensOnUsers_kitchenId_idx`;

-- RenameIndex
ALTER TABLE `TagsOnDishes` RENAME INDEX `TagsOnDishes_tagId_fkey` TO `TagsOnDishes_tagId_idx`;
