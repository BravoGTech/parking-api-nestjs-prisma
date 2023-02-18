-- CreateEnum
CREATE TYPE "paymentMethod" AS ENUM ('PIX', 'CC', 'CD', 'DIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "carPlate" TEXT NOT NULL,
    "carBrand" TEXT NOT NULL,
    "checkinTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkoutTime" TIMESTAMP(3),
    "paymentMethod" "paymentMethod" NOT NULL,
    "price" DECIMAL(65,30) DEFAULT 0,
    "sale_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingInfo" (
    "id" SERIAL NOT NULL,
    "priceByHour" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ParkingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSlot" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "isAvaliable" BOOLEAN NOT NULL DEFAULT true,
    "parkingInfoId" INTEGER NOT NULL,

    CONSTRAINT "ParkingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesParkingSlots" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "parkingSlotId" TEXT NOT NULL,

    CONSTRAINT "SalesParkingSlots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Sales_carPlate_key" ON "Sales"("carPlate");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSlot" ADD CONSTRAINT "ParkingSlot_parkingInfoId_fkey" FOREIGN KEY ("parkingInfoId") REFERENCES "ParkingInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesParkingSlots" ADD CONSTRAINT "SalesParkingSlots_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesParkingSlots" ADD CONSTRAINT "SalesParkingSlots_parkingSlotId_fkey" FOREIGN KEY ("parkingSlotId") REFERENCES "ParkingSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
