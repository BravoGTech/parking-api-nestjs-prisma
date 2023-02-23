/*
  Warnings:

  - You are about to drop the `ParkingInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParkingSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParkingSlot" DROP CONSTRAINT "ParkingSlot_parkingInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_parkingSlotId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_userId_fkey";

-- DropTable
DROP TABLE "ParkingInfo";

-- DropTable
DROP TABLE "ParkingSlot";

-- DropTable
DROP TABLE "Sales";

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "carPlate" TEXT NOT NULL,
    "carBrand" TEXT NOT NULL,
    "checkinTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkoutTime" TIMESTAMP(3),
    "paymentMethod" "paymentMethod" NOT NULL,
    "price" DECIMAL(65,30) DEFAULT 0,
    "sale_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "parkingSlotId" TEXT NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parkingInfo" (
    "id" SERIAL NOT NULL,
    "priceByHour" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "parkingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parkingSlot" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "isAvaliable" BOOLEAN NOT NULL DEFAULT true,
    "parkingInfoId" INTEGER NOT NULL,

    CONSTRAINT "parkingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_carPlate_key" ON "sales"("carPlate");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_parkingSlotId_fkey" FOREIGN KEY ("parkingSlotId") REFERENCES "parkingSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parkingSlot" ADD CONSTRAINT "parkingSlot_parkingInfoId_fkey" FOREIGN KEY ("parkingInfoId") REFERENCES "parkingInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
