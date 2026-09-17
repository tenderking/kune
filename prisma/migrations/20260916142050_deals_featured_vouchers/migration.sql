-- AlterTable
ALTER TABLE `Services` ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Deal` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
    `owner_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `original_price` DECIMAL(12, 2) NOT NULL,
    `deal_price` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `quantity_total` INTEGER NOT NULL,
    `quantity_sold` INTEGER NOT NULL DEFAULT 0,
    `min_buyers` INTEGER NOT NULL DEFAULT 1,
    `starts_at` DATETIME(3) NOT NULL,
    `ends_at` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `redemption_instructions` VARCHAR(191) NOT NULL DEFAULT '',
    `terms` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `Deal_slug_key`(`slug`),
    INDEX `Deal_service_id_idx`(`service_id`),
    INDEX `Deal_owner_id_idx`(`owner_id`),
    INDEX `Deal_status_ends_at_idx`(`status`, `ends_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL DEFAULT 'paynow',
    `provider_ref` VARCHAR(191) NULL,
    `poll_url` VARCHAR(191) NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `method` VARCHAR(191) NOT NULL DEFAULT 'ecocash',
    `buyer_id` VARCHAR(191) NOT NULL,
    `deal_id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `paid_at` DATETIME(3) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,

    UNIQUE INDEX `Payment_provider_ref_key`(`provider_ref`),
    INDEX `Payment_buyer_id_idx`(`buyer_id`),
    INDEX `Payment_deal_id_idx`(`deal_id`),
    INDEX `Payment_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `deal_id` VARCHAR(191) NOT NULL,
    `buyer_id` VARCHAR(191) NOT NULL,
    `payment_id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `purchased_at` DATETIME(3) NULL,
    `redeemed_at` DATETIME(3) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `Voucher_code_key`(`code`),
    INDEX `Voucher_deal_id_idx`(`deal_id`),
    INDEX `Voucher_buyer_id_idx`(`buyer_id`),
    INDEX `Voucher_payment_id_idx`(`payment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Services_featured_idx` ON `Services`(`featured`);

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_deal_id_fkey` FOREIGN KEY (`deal_id`) REFERENCES `Deal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_deal_id_fkey` FOREIGN KEY (`deal_id`) REFERENCES `Deal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
