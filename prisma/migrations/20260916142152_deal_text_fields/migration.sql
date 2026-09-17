-- AlterTable
ALTER TABLE `Deal` MODIFY `description` TEXT NOT NULL,
    MODIFY `redemption_instructions` TEXT NOT NULL,
    MODIFY `terms` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY `poll_url` TEXT NULL;
