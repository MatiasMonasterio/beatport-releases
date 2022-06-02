-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Label" (
    "id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "ArtistsOnUser" (
    "userId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "artistId"),
    CONSTRAINT "ArtistsOnUser_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtistsOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LabelsOnUser" (
    "userId" INTEGER NOT NULL,
    "labelId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "labelId"),
    CONSTRAINT "LabelsOnUser_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LabelsOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Label_id_key" ON "Label"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
