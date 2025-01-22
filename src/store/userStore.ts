import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    name: string
    email: string
    role: string
}

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
