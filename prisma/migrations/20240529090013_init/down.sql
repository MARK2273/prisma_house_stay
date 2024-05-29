-- DropTable
DROP TABLE `Temp`;

-- CreateIndex
CREATE INDEX `ratings_postId_fkey` ON `ratings`(`postId` ASC);

-- CreateIndex
CREATE INDEX `rules_propertyId_fkey` ON `rules`(`propertyId` ASC);
