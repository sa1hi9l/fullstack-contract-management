-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'DATE', 'SIGNATURE', 'CHECKBOX');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('CREATED', 'APPROVED', 'SENT', 'SIGNED', 'LOCKED', 'REVOKED');

-- CreateTable
CREATE TABLE "Blueprint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blueprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlueprintField" (
    "id" TEXT NOT NULL,
    "blueprintId" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "label" TEXT NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,

    CONSTRAINT "BlueprintField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blueprintId" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractField" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "blueprintFieldId" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "ContractField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlueprintField" ADD CONSTRAINT "BlueprintField_blueprintId_fkey" FOREIGN KEY ("blueprintId") REFERENCES "Blueprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_blueprintId_fkey" FOREIGN KEY ("blueprintId") REFERENCES "Blueprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractField" ADD CONSTRAINT "ContractField_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractField" ADD CONSTRAINT "ContractField_blueprintFieldId_fkey" FOREIGN KEY ("blueprintFieldId") REFERENCES "BlueprintField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
