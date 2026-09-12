/*
  Warnings:

  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receiptUrl` on the `Payment` table. All the data in the column will be lost.
  - You are about to alter the column `totalAmount` on the `Rendition` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `amountPaid` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Rendition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekEndDate` to the `Rendition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekStartDate` to the `Rendition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentGateway" AS ENUM ('MERCADOPAGO', 'STRIPE', 'PAYPAL', 'OTHER');

-- CreateEnum
CREATE TYPE "RenditionStatus" AS ENUM ('PENDING', 'APPROVED', 'PAID');

-- AlterEnum
ALTER TYPE "ServiceStatus" ADD VALUE 'CLOSED';

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
DROP COLUMN "paymentType",
DROP COLUMN "receiptUrl",
ADD COLUMN     "amountPaid" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "debtAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "gatewayMetadata" JSONB,
ADD COLUMN     "gatewayProvider" "PaymentGateway",
ADD COLUMN     "gatewayTransactionId" TEXT,
ADD COLUMN     "hasDebt" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sparePartsCost" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Rendition" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedById" TEXT,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "status" "RenditionStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "weekEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weekStartDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "closedById" TEXT,
ADD COLUMN     "expectedAmount" DECIMAL(10,2),
ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "PaymentType";

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceReport" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "finalReport" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePhoto" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "technicalNotes" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServicePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SparePart" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SparePart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceReport_serviceId_key" ON "ServiceReport"("serviceId");

-- CreateIndex
CREATE INDEX "ServicePhoto_reportId_idx" ON "ServicePhoto"("reportId");

-- CreateIndex
CREATE INDEX "SparePart_reportId_idx" ON "SparePart"("reportId");

-- CreateIndex
CREATE INDEX "Payment_technicianId_idx" ON "Payment"("technicianId");

-- CreateIndex
CREATE INDEX "Payment_isRendered_idx" ON "Payment"("isRendered");

-- CreateIndex
CREATE INDEX "Payment_renditionId_idx" ON "Payment"("renditionId");

-- CreateIndex
CREATE INDEX "Rendition_technicianId_weekStartDate_weekEndDate_idx" ON "Rendition"("technicianId", "weekStartDate", "weekEndDate");

-- CreateIndex
CREATE INDEX "Rendition_status_idx" ON "Rendition"("status");

-- CreateIndex
CREATE INDEX "Service_technicianId_idx" ON "Service"("technicianId");

-- CreateIndex
CREATE INDEX "Service_clientId_idx" ON "Service"("clientId");

-- CreateIndex
CREATE INDEX "Service_status_idx" ON "Service"("status");

-- CreateIndex
CREATE INDEX "Service_categoryId_idx" ON "Service"("categoryId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceReport" ADD CONSTRAINT "ServiceReport_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePhoto" ADD CONSTRAINT "ServicePhoto_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ServiceReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SparePart" ADD CONSTRAINT "SparePart_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ServiceReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rendition" ADD CONSTRAINT "Rendition_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rendition" ADD CONSTRAINT "Rendition_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
