-- CreateTable
CREATE TABLE "Investors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "InvestorsHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "investorId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "investedIn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InvestorsHistory_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "investorId" ON "InvestorsHistory"("investorId");
