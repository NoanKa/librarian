// main/ipc/dbHandlers.ts
import { ipcMain } from "electron";
import { getDB } from "../db/dbconf";

export function registerDBHelpers() {
  ipcMain.handle("db:getUsers", async () => {
    const db = getDB();
    return db.data.users;
  });

  //   ipcMain.handle(
  //     "db:addUser",
  //     async (_event, user: { id: number; name: string }) => {
  //       const db = getDB();
  //       db.data.users.push(user);
  //       await db.write();
  //       return user;
  //     }
  //   );
}
