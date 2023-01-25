/*
  Warnings:

  - Added the required column `session_id` to the `addresses` table without a default value. This is not possible if the table is not empty.

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
    "session_id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    CONSTRAINT "addresses_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "consumers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_addresses" ("city", "complement", "consumerId", "id", "neighborhood", "number", "state", "street") SELECT "city", "complement", "consumerId", "id", "neighborhood", "number", "state", "street" FROM "addresses";
DROP TABLE "addresses";
ALTER TABLE "new_addresses" RENAME TO "addresses";
CREATE UNIQUE INDEX "addresses_session_id_key" ON "addresses"("session_id");
CREATE UNIQUE INDEX "addresses_consumerId_key" ON "addresses"("consumerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
