-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "width" REAL NOT NULL,
    "length" REAL NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "idClient" INTEGER NOT NULL,
    CONSTRAINT "Cargo_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cargo" ("height", "id", "idClient", "length", "weight", "width") SELECT "height", "id", "idClient", "length", "weight", "width" FROM "Cargo";
DROP TABLE "Cargo";
ALTER TABLE "new_Cargo" RENAME TO "Cargo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
