import { api } from "@/lib/axios"
import { Event } from "@/types/Event"

export const getOnwerEvents = async (): Promise<Pick<Event, 'id' | 'name'>[]> => {
    return (await api.get('/api/dashboard/events')).data.data
}

export const getEventDetails = async (eventId: string) => {
    return (await api.get(`/api/events/${eventId}`)).data.data;
};

export const getStaff = async () => {
    return (await api.get(`/api/dashboard/staff`)).data.data;
};