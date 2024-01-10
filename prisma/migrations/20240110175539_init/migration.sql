/*
  Warnings:

  - Added the required column `photo` to the `Members` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "salary" INTEGER NOT NULL DEFAULT 0,
    "position" TEXT NOT NULL DEFAULT 'member',
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Members" ("createdAt", "email", "id", "name", "paid", "position", "salary") SELECT "createdAt", "email", "id", "name", "paid", "position", "salary" FROM "Members";
DROP TABLE "Members";
ALTER TABLE "new_Members" RENAME TO "Members";
CREATE UNIQUE INDEX "Members_email_key" ON "Members"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
