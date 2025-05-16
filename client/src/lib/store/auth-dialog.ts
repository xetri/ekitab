import { create } from "zustand";

export type AuthMode = "login" | "signup" | "forgot-password";

interface AuthDialogState {
    mode: AuthMode;
    isOpen: boolean;
    setOpen: (value : boolean) => void;
    setMode: (mode: AuthMode) => void;
    openAs: (mode: AuthMode) => void;
}

export const useAuthDialog = create<AuthDialogState>((set) => ({
    mode: "login",
    isOpen: false,
    setOpen: (val : boolean) => set({ isOpen: val }),
    setMode: (mode: AuthMode) => set({ mode }),
    openAs: (mode: AuthMode) => set({ isOpen: true, mode }),
}));

