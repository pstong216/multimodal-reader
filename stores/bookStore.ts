import { create } from "zustand";
import { Book, ImgGc, MusicGc } from "../types";
interface booksState {
  books: Book[];
  setBooks: (books: Book[]) => void;
  setImg: (bookId: string, img: ImgGc) => void;
  setMusic: (bookId: string, music: MusicGc) => void;
}
export const useBookStore = create<booksState>((set, get) => ({
  books: [],
  setBooks: (books: Book[]) => {
    set(() => ({
      books: [...books],
    }));
  },
  setImg: (bookId: string, img: ImgGc) => {
    const book = get().books.filter((book) => book.id === bookId)[0];
    const remainBooks = get().books.filter((book) => book.id !== bookId);
    book.multiModel.imgs.push(img);
    set(() => ({
      books: [...remainBooks, book],
    }));
  },
  setMusic: (bookId: string, music: MusicGc) => {
    const book = get().books.filter((book) => book.id === bookId)[0];
    const remainBooks = get().books.filter((book) => book.id !== bookId);
    book.multiModel.musics.push(music);
    set(() => ({
      books: [...remainBooks, book],
    }));
  },
}));
