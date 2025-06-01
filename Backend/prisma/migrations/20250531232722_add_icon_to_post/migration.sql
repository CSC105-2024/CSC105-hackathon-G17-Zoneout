-- AlterTable
ALTER TABLE `Post` ADD COLUMN `icon` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `profileEmoji` VARCHAR(191) NOT NULL DEFAULT '👤';
