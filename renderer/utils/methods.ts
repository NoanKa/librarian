import { Book } from "../../main/types/Book";
import NewBook from "../components/interface/NewBook";

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function convert(newBook: NewBook) {
  return {
    name: newBook.name,
    writer: newBook.writer,
    type: newBook.type,
    status: 0,
  } as Book;
}
