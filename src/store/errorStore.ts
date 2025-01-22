import { create } from "zustand"

interface ErrorState {
    errors: Record<string, string[]> | null
    setErrors: (errors: Record<string, string[]>) => void
    clearErrors: () => void
}

export const errorStore = create<ErrorState>((set) => ({
    errors: null,
    setErrors: (errors) => {
        set({ errors })

        setTimeout(() => set({ errors: null }), 5000)
    },
    clearErrors: () => set({ errors: null })
}))