-- AddForeignKey
ALTER TABLE "Coments" ADD CONSTRAINT "Coments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
