/*
  Warnings:

  - You are about to drop the column `password` on the `Members` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Members" ("createdAt", "email", "id", "name") SELECT "createdAt", "email", "id", "name" FROM "Members";
DROP TABLE "Members";
ALTER TABLE "new_Members" RENAME TO "Members";
CREATE UNIQUE INDEX "Members_email_key" ON "Members"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;