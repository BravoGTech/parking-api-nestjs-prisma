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
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "carPlate" TEXT NOT NULL,
    "carBrand" TEXT NOT NULL,
    "checkinTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "checkoutTime" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "price" DECIMAL(65,30),
    "sale_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
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
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "parkingSlot_number_key" ON "parkingSlot"("number");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_parkingSlotId_fkey" FOREIGN KEY ("parkingSlotId") REFERENCES "parkingSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parkingSlot" ADD CONSTRAINT "parkingSlot_parkingInfoId_fkey" FOREIGN KEY ("parkingInfoId") REFERENCES "parkingInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
