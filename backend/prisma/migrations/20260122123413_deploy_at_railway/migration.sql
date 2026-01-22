-- DropForeignKey
ALTER TABLE `Contract` DROP FOREIGN KEY `Contract_blueprintId_fkey`;

-- DropForeignKey
ALTER TABLE `ContractField` DROP FOREIGN KEY `ContractField_blueprintFieldId_fkey`;

-- DropIndex
DROP INDEX `Contract_blueprintId_fkey` ON `Contract`;

-- DropIndex
DROP INDEX `ContractField_blueprintFieldId_fkey` ON `ContractField`;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_blueprintId_fkey` FOREIGN KEY (`blueprintId`) REFERENCES `Blueprint`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractField` ADD CONSTRAINT `ContractField_blueprintFieldId_fkey` FOREIGN KEY (`blueprintFieldId`) REFERENCES `BlueprintField`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
