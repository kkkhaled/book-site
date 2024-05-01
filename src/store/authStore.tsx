import { create } from "zustand";
import axios from "axios";
import { returnMessage } from "./toastStore";

interface UseAuthStore {
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signUp: (email: string, password: string, name: string) => void;
}

const useAuthStore = create<UseAuthStore>((set) => ({
  token: localStorage.getItem("token") || null,
  error: null,
  loading: true,
  isAuthenticated: !!localStorage.getItem("token"),
  login: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.token);
        set({
          token: response.data.token,
          error: null,
          loading: false,
          isAuthenticated: true,
        });
        returnMessage("loggedIn successfully", "success");
      } else {
        console.log(response);
        set({ error: response.data.message, loading: false });
      }
    } catch (error) {
      returnMessage("invalid user name or password", "error");
      set({
        error: "An error occurred",
        loading: false,
        isAuthenticated: false,
      });
    }
  },
  signUp: async (email: string, password: string, name: string) => {
    set({ loading: true });
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        email,
        password,
        name,
      });

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.token);
        set({
          token: response.data.token,
          error: null,
          loading: false,
          isAuthenticated: true,
        });
        returnMessage("signedUp successfully", "success");
      } else {
        returnMessage(response.data.message, "error");
      }
    } catch (error) {
      set({ error: "An error occurred", loading: false });
      set({
        error: "An error occurred",
        loading: false,
        isAuthenticated: false,
      });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, error: null, loading: true, isAuthenticated: false });
  },
}));

export default useAuthStore;
