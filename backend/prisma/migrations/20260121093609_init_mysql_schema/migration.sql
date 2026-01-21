-- CreateTable
CREATE TABLE `Blueprint` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlueprintField` (
    `id` VARCHAR(191) NOT NULL,
    `blueprintId` VARCHAR(191) NOT NULL,
    `type` ENUM('TEXT', 'DATE', 'SIGNATURE', 'CHECKBOX') NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `positionX` INTEGER NOT NULL,
    `positionY` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contract` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `blueprintId` VARCHAR(191) NOT NULL,
    `status` ENUM('CREATED', 'APPROVED', 'SENT', 'SIGNED', 'LOCKED', 'REVOKED') NOT NULL DEFAULT 'CREATED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContractField` (
    `id` VARCHAR(191) NOT NULL,
    `contractId` VARCHAR(191) NOT NULL,
    `blueprintFieldId` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BlueprintField` ADD CONSTRAINT `BlueprintField_blueprintId_fkey` FOREIGN KEY (`blueprintId`) REFERENCES `Blueprint`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_blueprintId_fkey` FOREIGN KEY (`blueprintId`) REFERENCES `Blueprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractField` ADD CONSTRAINT `ContractField_contractId_fkey` FOREIGN KEY (`contractId`) REFERENCES `Contract`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractField` ADD CONSTRAINT `ContractField_blueprintFieldId_fkey` FOREIGN KEY (`blueprintFieldId`) REFERENCES `BlueprintField`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
