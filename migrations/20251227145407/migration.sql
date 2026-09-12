/*
  Warnings:

  - You are about to drop the `ServicePhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SparePart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServicePhoto" DROP CONSTRAINT "ServicePhoto_reportId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceReport" DROP CONSTRAINT "ServiceReport_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "SparePart" DROP CONSTRAINT "SparePart_reportId_fkey";

-- DropTable
DROP TABLE "ServicePhoto";

-- DropTable
DROP TABLE "ServiceReport";

-- DropTable
DROP TABLE "SparePart";

-- DropEnum
DROP TYPE "RenditionStatus";
