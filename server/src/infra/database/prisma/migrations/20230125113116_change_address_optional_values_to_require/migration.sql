/*
  Warnings:

  - Made the column `city` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `neighborhood` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "consumerId" TEXT NOT NULL,
    CONSTRAINT "addresses_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "consumers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_addresses" ("city", "complement", "consumerId", "id", "neighborhood", "number", "state", "street") SELECT "city", "complement", "consumerId", "id", "neighborhood", "number", "state", "street" FROM "addresses";
DROP TABLE "addresses";
ALTER TABLE "new_addresses" RENAME TO "addresses";
CREATE UNIQUE INDEX "addresses_consumerId_key" ON "addresses"("consumerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
