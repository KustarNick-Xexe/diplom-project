-- CreateTable
CREATE TABLE "Cargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "width" REAL NOT NULL,
    "length" REAL NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL
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
    "time_window" DATETIME,
    "demand" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coordX" REAL NOT NULL,
    "coordY" REAL NOT NULL,
    "coordZ" REAL NOT NULL,
    "idVehicle" INTEGER NOT NULL,
    "idCargo" INTEGER NOT NULL,
    CONSTRAINT "Plan_idCargo_fkey" FOREIGN KEY ("idCargo") REFERENCES "Cargo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Plan_idVehicle_fkey" FOREIGN KEY ("idVehicle") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Distance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCl1" INTEGER NOT NULL,
    "idCl2" INTEGER NOT NULL,
    "distance" REAL NOT NULL,
    "pathTime" DATETIME NOT NULL,
    CONSTRAINT "Distance_idCl1_fkey" FOREIGN KEY ("idCl1") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Distance_idCl2_fkey" FOREIGN KEY ("idCl2") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
