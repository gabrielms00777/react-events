import { api } from "@/lib/axios"
import { Event } from "@/types/Event"

export const getOnwerEvents = async (): Promise<Pick<Event, 'id' | 'name'>[]> => {
    return (await api.get('/api/dashboard/events')).data.data
}