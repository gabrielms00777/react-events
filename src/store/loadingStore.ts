import { create } from "zustand";

interface LoadingState {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

export const loadingStore = create<LoadingState>((set) => ({
    isLoading: false,
    showLoading: () => set({ isLoading: true }),
    hideLoading: () => set({ isLoading: false }),
}));