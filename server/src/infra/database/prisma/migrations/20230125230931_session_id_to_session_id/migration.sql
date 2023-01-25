/*
  Warnings:

  - You are about to drop the column `session_id` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_purchases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "purchases_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "consumers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_purchases" ("consumerId", "id", "productId", "quantity") SELECT "consumerId", "id", "productId", "quantity" FROM "purchases";
DROP TABLE "purchases";
ALTER TABLE "new_purchases" RENAME TO "purchases";
CREATE UNIQUE INDEX "purchases_sessionId_key" ON "purchases"("sessionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
