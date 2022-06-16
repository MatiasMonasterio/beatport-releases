-- CreateTable
CREATE TABLE "FavoriteTrack" (
    "id" INTEGER NOT NULL,
    "bpm" INTEGER NOT NULL,
    "released" INTEGER NOT NULL,
    "artwork" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "mix" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "artists" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "remixers" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FavoriteTracksOnUser" (
    "userId" INTEGER NOT NULL,
    "favoriteTrackId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "favoriteTrackId"),
    CONSTRAINT "FavoriteTracksOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoriteTracksOnUser_favoriteTrackId_fkey" FOREIGN KEY ("favoriteTrackId") REFERENCES "FavoriteTrack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteTrack_id_key" ON "FavoriteTrack"("id");
