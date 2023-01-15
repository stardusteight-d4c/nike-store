/*
  Warnings:

  - Added the required column `neighborhood` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    CONSTRAINT "addresses_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "consumers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_addresses" ("city", "complement", "consumerId", "id", "number", "state", "street") SELECT "city", "complement", "consumerId", "id", "number", "state", "street" FROM "addresses";
DROP TABLE "addresses";
ALTER TABLE "new_addresses" RENAME TO "addresses";
CREATE UNIQUE INDEX "addresses_consumerId_key" ON "addresses"("consumerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
