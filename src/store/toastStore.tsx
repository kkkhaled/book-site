import { create } from "zustand";

export type ToastSeverity = "success" | "error" | "info";

interface ToastState {
  message: string | null;
  severity: ToastSeverity | null;
  showMessage: (message: string, severity: ToastSeverity) => void;
  hideMessage: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  severity: null,
  showMessage: (message, severity) => set({ message, severity }),
  hideMessage: () => set({ message: null, severity: null }),
}));

export const returnMessage = (message: string, severity: ToastSeverity) => {
  console.log(useToastStore.getState().showMessage(message, severity));
  return useToastStore.getState().showMessage(message, severity);
};
