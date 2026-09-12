/*
  Warnings:

  - You are about to drop the column `gatewayMetadata` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `gatewayProvider` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `gatewayTransactionId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `isRendered` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `renderedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `renditionId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Rendition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_renditionId_fkey";

-- DropForeignKey
ALTER TABLE "Rendition" DROP CONSTRAINT "Rendition_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "Rendition" DROP CONSTRAINT "Rendition_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Rendition" DROP CONSTRAINT "Rendition_technicianId_fkey";

-- DropIndex
DROP INDEX "Payment_isRendered_idx";

-- DropIndex
DROP INDEX "Payment_renditionId_idx";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "gatewayMetadata",
DROP COLUMN "gatewayProvider",
DROP COLUMN "gatewayTransactionId",
DROP COLUMN "isRendered",
DROP COLUMN "renderedAt",
DROP COLUMN "renditionId";

-- DropTable
DROP TABLE "Rendition";
