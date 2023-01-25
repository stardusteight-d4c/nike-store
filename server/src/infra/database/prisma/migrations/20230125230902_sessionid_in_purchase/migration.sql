/*
  Warnings:

  - You are about to drop the column `session_id` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `session_id` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_purchases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    CONSTRAINT "purchases_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "consumers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_purchases" ("consumerId", "id", "productId", "quantity") SELECT "consumerId", "id", "productId", "quantity" FROM "purchases";
DROP TABLE "purchases";
ALTER TABLE "new_purchases" RENAME TO "purchases";
CREATE UNIQUE INDEX "purchases_session_id_key" ON "purchases"("session_id");
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
