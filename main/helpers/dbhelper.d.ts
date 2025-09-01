import { Book } from "../types/Book";

export interface DBAPI {
  getBooks: () => Promise<Book[]>;
  addBook: (book: Book) => Promise<Book>;
  updateBookStatus: (id: number, status: number) => Promise<Book>;
  deleteBook: (id: number) => Promise<Book>;
  getTypes: () => Promise<string[]>;
}
