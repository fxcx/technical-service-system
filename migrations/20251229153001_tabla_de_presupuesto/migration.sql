-- CreateEnum
CREATE TYPE "EstimateStatus" AS ENUM ('SENT', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Estimate" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT,
    "status" "EstimateStatus" NOT NULL DEFAULT 'SENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estimate_serviceId_key" ON "Estimate"("serviceId");

-- CreateIndex
CREATE INDEX "Estimate_status_idx" ON "Estimate"("status");

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
