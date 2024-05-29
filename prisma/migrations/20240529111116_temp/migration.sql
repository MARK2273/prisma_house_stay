-- CreateTable
CREATE TABLE `Temp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- to migrate down
-- npx prisma migrate diff  --from-schema-datamodel prisma/schema.prisma  --to-schema-datasource prisma/schema.prisma  --script > down.sql

--to migrate new file
-- npx prisma migrate dev --name temp

--to roleback from last migration 
-- npx prisma migrate resolve --rolled-back temp