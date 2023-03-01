-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_userId_fkey";

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
