import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User } from "../types/User"

interface UserState {
    user: User | null
    setUser: (user: User) => void
    clearUser: () => void
    isAuthenticated: () => boolean
}

export const userStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            isAuthenticated: () => !!get().user,
        }),
        {
            name: 'user-storage',
        }
    )
);
