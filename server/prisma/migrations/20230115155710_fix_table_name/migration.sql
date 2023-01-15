/*
  Warnings:

  - You are about to drop the `adresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "adresses";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    CONSTRAINT "addresses_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "consumers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_consumerId_key" ON "addresses"("consumerId");
