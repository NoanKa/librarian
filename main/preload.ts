import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { Book } from "./types/Book";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

contextBridge.exposeInMainWorld("ipc", handler);
contextBridge.exposeInMainWorld("dbAPI", {
  getBooks: () => ipcRenderer.invoke("db:getBooks"),
  addBook: (book: Book) => ipcRenderer.invoke("db:addBook", book),
  updateBookStatus: (id: number, status: number) =>
    ipcRenderer.invoke("db:updateBookStatus", id, status),
  deleteBook: (id: number) => ipcRenderer.invoke("db:deleteBook", id),
  getTypes: () => ipcRenderer.invoke("db:getTypes"),
});

export type IpcHandler = typeof handler;
