import { create } from "zustand";
import axios from "axios";
import { returnMessage } from "./toastStore";

interface UseAddBookStore {
  loading: boolean;
  error: string | null;
  addBook: (title: string, description: string, publishDate: Date) => void;
}

const useAddBookStore = create<UseAddBookStore>((set) => ({
  loading: false,
  error: null,
  addBook: async (title: string, description: string, publishDate: Date) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/books/create",
        {
          title,
          description,
          publishDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      set({ loading: false, error: null });
      returnMessage("Book added successfully", "success");
    } catch (error) {
      console.log(error);
      set({ loading: false, error: "An error occurred" });
      returnMessage("An error occurred", "error");
    }
  },
}));

export default useAddBookStore;
