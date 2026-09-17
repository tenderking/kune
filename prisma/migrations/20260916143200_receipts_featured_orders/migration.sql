-- AlterTable
ALTER TABLE `Services` ADD COLUMN `featured_until` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` TEXT NOT NULL,
    `link` VARCHAR(191) NOT NULL DEFAULT '',
    `read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `Notification_user_id_read_idx`(`user_id`, `read`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeaturedOrder` (
    `id` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
    `owner_id` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL DEFAULT 'paynow',
    `provider_ref` VARCHAR(191) NULL,
    `poll_url` TEXT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `method` VARCHAR(191) NOT NULL DEFAULT 'ecocash',
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `duration_days` INTEGER NOT NULL DEFAULT 30,
    `starts_at` DATETIME(3) NULL,
    `ends_at` DATETIME(3) NULL,
    `paid_at` DATETIME(3) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `FeaturedOrder_provider_ref_key`(`provider_ref`),
    INDEX `FeaturedOrder_service_id_idx`(`service_id`),
    INDEX `FeaturedOrder_owner_id_idx`(`owner_id`),
    INDEX `FeaturedOrder_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeaturedOrder` ADD CONSTRAINT `FeaturedOrder_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeaturedOrder` ADD CONSTRAINT `FeaturedOrder_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
