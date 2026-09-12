/*
  Warnings:

  - You are about to drop the column `estimatedDuration` on the `Service` table. All the data in the column will be lost.
  - Made the column `email` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "estimatedDuration",
ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
