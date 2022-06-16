/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `LabelsOnUser` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Label` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `ArtistsOnUser` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Artist` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "updatedAt") SELECT coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "email", "id", "name", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_LabelsOnUser" (
    "userId" INTEGER NOT NULL,
    "labelId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "labelId"),
    CONSTRAINT "LabelsOnUser_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LabelsOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LabelsOnUser" ("labelId", "userId") SELECT "labelId", "userId" FROM "LabelsOnUser";
DROP TABLE "LabelsOnUser";
ALTER TABLE "new_LabelsOnUser" RENAME TO "LabelsOnUser";
CREATE TABLE "new_Label" (
    "id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Label" ("createdAt", "id", "updatedAt") SELECT coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "id", "updatedAt" FROM "Label";
DROP TABLE "Label";
ALTER TABLE "new_Label" RENAME TO "Label";
CREATE UNIQUE INDEX "Label_id_key" ON "Label"("id");
CREATE TABLE "new_ArtistsOnUser" (
    "userId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "artistId"),
    CONSTRAINT "ArtistsOnUser_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtistsOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ArtistsOnUser" ("artistId", "userId") SELECT "artistId", "userId" FROM "ArtistsOnUser";
DROP TABLE "ArtistsOnUser";
ALTER TABLE "new_ArtistsOnUser" RENAME TO "ArtistsOnUser";
CREATE TABLE "new_Artist" (
    "id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Artist" ("createdAt", "id", "updatedAt") SELECT coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "id", "updatedAt" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
