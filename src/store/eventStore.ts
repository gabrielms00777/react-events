import { create } from "zustand";
import { persist } from "zustand/middleware"

interface EventStore {
    selectedEvent: string;
    setSelectedEvent: (event_id: string) => void;
}

export const eventStore = create<EventStore>()(
    persist(
        (set) => ({
            selectedEvent: "",
            setSelectedEvent: (event_id) => set({ selectedEvent: event_id }),
        }),
        {
            name: 'event-storage'
        }
    )
)
