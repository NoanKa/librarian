// main/db/lowdb.ts
import { join } from "path";
import { app } from "electron";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// Define your data shape
type Data = {
  users: { id: number; name: string }[];
};

// Default values
const defaultData: Data = { users: [] };

let db: Low<Data>;

export async function initDB() {
  const file = join(app.getPath("userData"), "library.json"); // stored in OS-specific userData folder
  const adapter = new JSONFile<Data>(file);
  db = new Low<Data>(adapter, defaultData);

  await db.read();
  db.data ||= defaultData; // if file is empty, initialize
  await db.write();

  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not initialized. Call initDB() first.");
  return db;
}
