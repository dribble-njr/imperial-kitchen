/*
  Warnings:

  - You are about to drop the column `joinedAt` on the `FamiliesOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `leftAt` on the `FamiliesOnUsers` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `FamiliesOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FamiliesOnUsers" (
    "userId" INTEGER NOT NULL,
    "familyId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("userId", "familyId"),
    CONSTRAINT "FamiliesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FamiliesOnUsers_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FamiliesOnUsers" ("familyId", "isActive", "role", "userId") SELECT "familyId", "isActive", "role", "userId" FROM "FamiliesOnUsers";
DROP TABLE "FamiliesOnUsers";
ALTER TABLE "new_FamiliesOnUsers" RENAME TO "FamiliesOnUsers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
