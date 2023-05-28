/*
  Warnings:

  - You are about to drop the `Distance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `coordX` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `coordY` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `coordZ` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `idCargo` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `plan` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Distance";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plan" TEXT NOT NULL,
    "idVehicle" INTEGER NOT NULL,
    CONSTRAINT "Plan_idVehicle_fkey" FOREIGN KEY ("idVehicle") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Plan" ("id", "idVehicle") SELECT "id", "idVehicle" FROM "Plan";
DROP TABLE "Plan";
ALTER TABLE "new_Plan" RENAME TO "Plan";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
