/*
  Warnings:

  - You are about to drop the column `buyedAt` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Drugs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drugs" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "buyedAt",
ADD COLUMN     "boughtAt" DATE,
ADD COLUMN     "drugs" BIGINT[] DEFAULT ARRAY[]::BIGINT[],
ALTER COLUMN "givenAt" SET DATA TYPE DATE,
ALTER COLUMN "retiredAt" DROP NOT NULL,
ALTER COLUMN "retiredAt" SET DATA TYPE DATE;
