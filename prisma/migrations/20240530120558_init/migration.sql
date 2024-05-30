-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `role` VARCHAR(191) NOT NULL DEFAULT 'BUYER',

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `floor` INTEGER NOT NULL,
    `bedroom` INTEGER NOT NULL,
    `kitchen` INTEGER NOT NULL,
    `living_room` INTEGER NOT NULL,
    `bathroom` INTEGER NOT NULL,
    `furnished` BOOLEAN NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `property_id` INTEGER NOT NULL,

    UNIQUE INDEX `posts_property_id_key`(`property_id`),
    INDEX `posts_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ratings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(191) NOT NULL,
    `cleanliness_rating` DOUBLE NOT NULL,
    `accuracy_rating` DOUBLE NOT NULL,
    `check_in_rating` DOUBLE NOT NULL,
    `communication_rating` DOUBLE NOT NULL,
    `location_rating` DOUBLE NOT NULL,
    `value_rating` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rule` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `property_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pivotRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating_id` INTEGER NOT NULL,
    `property_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `pivotRating_rating_id_key`(`rating_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pivotRating` ADD CONSTRAINT `pivotRating_rating_id_fkey` FOREIGN KEY (`rating_id`) REFERENCES `ratings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pivotRating` ADD CONSTRAINT `pivotRating_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pivotRating` ADD CONSTRAINT `pivotRating_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
