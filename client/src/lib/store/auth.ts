import { create } from "zustand";

export type User = {
    uid: string;
    email: string;
    name: string;
};

export type AuthState = {
    loading: boolean;
    loggedIn: boolean;
    user?: User;
    setLoading: (loading: boolean) => void;
    login: (user: User) => void;
    logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
    loading: false,
    loggedIn: false,
    user: undefined,
    setLoading: (loading) => set({ loading }),
    login: (user: User) => set({ loggedIn: true, user }),
    logout: () => set({ loggedIn: false, user: undefined }),
}));