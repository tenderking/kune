/*
  Warnings:

  - You are about to drop the column `location` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `serviceowner_id` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Creators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite_creators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags_On_Services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image_url` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website_url` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite_creators` DROP FOREIGN KEY `Favorite_creators_creator_id_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite_creators` DROP FOREIGN KEY `Favorite_creators_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite_services` DROP FOREIGN KEY `Favorite_services_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `Favorite_services` DROP FOREIGN KEY `Favorite_services_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Services` DROP FOREIGN KEY `Services_serviceowner_id_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Tags_On_Services` DROP FOREIGN KEY `Tags_On_Services_creatorsId_fkey`;

-- DropForeignKey
ALTER TABLE `Tags_On_Services` DROP FOREIGN KEY `Tags_On_Services_services_id_fkey`;

-- DropForeignKey
ALTER TABLE `Tags_On_Services` DROP FOREIGN KEY `Tags_On_Services_tags_id_fkey`;

-- AlterTable
ALTER TABLE `Services` DROP COLUMN `location`,
    DROP COLUMN `serviceowner_id`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `service_owner_id` VARCHAR(191) NULL,
    ADD COLUMN `website_url` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `Creators`;

-- DropTable
DROP TABLE `Favorite_creators`;

-- DropTable
DROP TABLE `Favorite_services`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `Tags_On_Services`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `VerificationToken`;

-- CreateTable
CREATE TABLE `ServiceTags` (
    `tags_id` VARCHAR(191) NOT NULL,
    `services_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tags_id`, `services_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentCreatorsTags` (
    `tags_id` VARCHAR(191) NOT NULL,
    `creators_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tags_id`, `creators_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite_Services` (
    `user_id` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`user_id`, `service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite_Creators` (
    `user_id` VARCHAR(191) NOT NULL,
    `content_creator_id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`user_id`, `content_creator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentCreators` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `category` VARCHAR(191) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `creator_manager_id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `ContentCreators_name_key`(`name`),
    INDEX `ContentCreators_creator_manager_id_fkey`(`creator_manager_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `refresh_token_expires_in` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `fresh` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `password_hash` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `token_hash` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `password_reset_tokens_token_hash_key`(`token_hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Services_service_owner_id_fkey` ON `Services`(`service_owner_id`);

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Services_service_owner_id_fkey` FOREIGN KEY (`service_owner_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTags` ADD CONSTRAINT `ServiceTags_services_id_fkey` FOREIGN KEY (`services_id`) REFERENCES `Services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTags` ADD CONSTRAINT `ServiceTags_tags_id_fkey` FOREIGN KEY (`tags_id`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentCreatorsTags` ADD CONSTRAINT `ContentCreatorsTags_tags_id_fkey` FOREIGN KEY (`tags_id`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentCreatorsTags` ADD CONSTRAINT `ContentCreatorsTags_creators_id_fkey` FOREIGN KEY (`creators_id`) REFERENCES `ContentCreators`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite_Services` ADD CONSTRAINT `Favorite_Services_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite_Services` ADD CONSTRAINT `Favorite_Services_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite_Creators` ADD CONSTRAINT `Favorite_Creators_content_creator_id_fkey` FOREIGN KEY (`content_creator_id`) REFERENCES `ContentCreators`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite_Creators` ADD CONSTRAINT `Favorite_Creators_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentCreators` ADD CONSTRAINT `ContentCreators_creator_manager_id_fkey` FOREIGN KEY (`creator_manager_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `password_reset_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
