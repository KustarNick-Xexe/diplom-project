-- CreateTable
CREATE TABLE "Cargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "width" REAL NOT NULL,
    "length" REAL NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "fragile" BOOLEAN NOT NULL DEFAULT false,
    "idClient" INTEGER NOT NULL,
    CONSTRAINT "Cargo_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "width" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT,
    "coordX" REAL NOT NULL,
    "coordY" REAL NOT NULL,
    "openWindow" TEXT,
    "closeWindow" TEXT,
    "demand" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plan" TEXT NOT NULL,
    "idVehicle" INTEGER NOT NULL,
    CONSTRAINT "Plan_idVehicle_fkey" FOREIGN KEY ("idVehicle") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Plan2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plan" TEXT NOT NULL,
    "idVehicle" INTEGER NOT NULL,
    CONSTRAINT "Plan2_idVehicle_fkey" FOREIGN KEY ("idVehicle") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
