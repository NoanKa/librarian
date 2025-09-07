// main/ipc/dbHandlers.ts
import { ipcMain } from "electron";
import { getDB } from "../db/dbconf";
import { Book } from "../types/Book";

export function registerDBHelpers() {
  ipcMain.handle("db:getBooks", async () => {
    const order = [1, 0, 2];
    const db = getDB();
    await db.read();

    return (
      db.data?.books.sort((a, b) => {
        return order.indexOf(a.status) - order.indexOf(b.status);
      }) ?? []
    );
  });

  ipcMain.handle("db:addBook", async (_event, book: Book) => {
    const db = getDB();
    await db.read();

    const maxId =
      db.data?.books.length > 0
        ? Math.max(...db.data?.books.map((b: Book) => b.id ?? 0))
        : 0;

    const newBook: Book = {
      id: maxId + 1,
      ...book,
    };

    db.data?.books.push(newBook);
    await db.write();

    return book;
  });

  ipcMain.handle(
    "db:updateBookStatus",
    async (_event, id: number, status: number) => {
      const db = getDB();
      await db.read();

      const book = db.data?.books.find((b: any) => b.id === id);
      if (!book) throw new Error("Book not found");

      book["status"] = status;
      await db.write();

      return book;
    }
  );

  ipcMain.handle("db:deleteBook", async (_event, id: number) => {
    const db = getDB();
    await db.read();

    const index = db.data?.books.findIndex((b: Book) => b.id === id);
    if (index === -1) throw new Error("Book not found");

    const [deletedBook] = db.data?.books.splice(index, 1);

    await db.write();
    return deletedBook;
  });

  ipcMain.handle("db:getTypes", async () => {
    const db = getDB();
    await db.read();

    return Array.from(new Set(db.data?.books.map((book) => book.type)));
  });
}
