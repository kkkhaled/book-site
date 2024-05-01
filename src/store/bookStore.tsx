import { create } from "zustand";
import axios from "axios";
import { returnMessage } from "./toastStore";

export interface book {
  _id: string;
  title: string;
  description: string;
  author: {
    name: string;
  };
  publishedDate: string;
}

interface UseBookStore {
  books: book[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
  getBooks: (pageNumber: number, pageSize: number) => void;
}

const useBookStore = create<UseBookStore>((set) => ({
  books: [],
  loading: false,
  error: null,
  totalPages: 0,
  totalItems: 0,
  getBooks: async (pageNumber = 1, pageSize = 10) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `http://localhost:3000/books?page=${pageNumber}&pageSize=${pageSize}`
      );
      set({
        books: response.data.data,
        loading: false,
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      set({ error: "An error occurred", loading: false });
      returnMessage("An error occurred", "error");
    }
  },
}));

export default useBookStore;
