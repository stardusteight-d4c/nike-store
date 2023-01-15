-- CreateTable
CREATE TABLE "consumers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cep" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    CONSTRAINT "purchases_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "consumers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    CONSTRAINT "Address_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "consumers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "consumers_email_key" ON "consumers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "consumers_cep_key" ON "consumers"("cep");

-- CreateIndex
CREATE UNIQUE INDEX "Address_consumerId_key" ON "Address"("consumerId");
