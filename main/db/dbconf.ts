// main/db/lowdb.ts
import { join } from "path";
import { app } from "electron";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Book } from "../types/Book";
import { existsSync, mkdirSync } from "fs";

type Data = {
  books: Book[];
};

const defaultData: Data = { books: [] };

let db: Low<Data>;

export async function initDB() {
  const file = join(app.getPath("userData"), "library.json");

  const folder = app.getPath("userData");
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }

  const adapter = new JSONFile<Data>(file);
  db = new Low<Data>(adapter, defaultData);

  await db.read();
  db.data ||= defaultData;
  await db.write();

  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not initialized. Call initDB() first.");
  return db;
}
