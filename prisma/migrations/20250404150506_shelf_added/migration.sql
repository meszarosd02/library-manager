/*
  Warnings:

  - Added the required column `shelfId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `col_index` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `place` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `row_index` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `shelfId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Shelf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `row_num` INTEGER NOT NULL,
    `col_num` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_shelfId_fkey` FOREIGN KEY (`shelfId`) REFERENCES `Shelf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
