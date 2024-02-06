-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "salary" INTEGER NOT NULL DEFAULT 0,
    "position" TEXT NOT NULL DEFAULT 'member',
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investors" (
    "id" SERIAL NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorsHistory" (
    "id" SERIAL NOT NULL,
    "investorId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "investedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestorsHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_email_key" ON "Members"("email");

-- CreateIndex
CREATE INDEX "investorId" ON "InvestorsHistory"("investorId");

-- AddForeignKey
ALTER TABLE "InvestorsHistory" ADD CONSTRAINT "InvestorsHistory_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
