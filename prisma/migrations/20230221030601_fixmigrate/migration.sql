/*
  Warnings:

  - You are about to drop the `SalesParkingSlots` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parkingSlotId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SalesParkingSlots" DROP CONSTRAINT "SalesParkingSlots_parkingSlotId_fkey";

-- DropForeignKey
ALTER TABLE "SalesParkingSlots" DROP CONSTRAINT "SalesParkingSlots_saleId_fkey";

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "parkingSlotId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SalesParkingSlots";

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_parkingSlotId_fkey" FOREIGN KEY ("parkingSlotId") REFERENCES "ParkingSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
