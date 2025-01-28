import { FC, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents } from "@/services/owner/queries";
import { userStore } from "@/store/userStore";
import { eventStore } from "@/store/eventStore";
import { api } from "@/lib/axios";

export const Header: FC = () => {
    const { selectedEvent, setSelectedEvent } = eventStore()
    const user = userStore((state) => state.user)
    const { data: events, isLoading, refetch } = useEvents()

    useEffect(() => {
        if (!selectedEvent && events && events.length > 0) {
            setSelectedEvent(events[0].id);
        }
    }, [events, selectedEvent]);

    const handleEventChange = async (eventId: string) => {
        if (eventId === selectedEvent) return
        await api.post('/api/dashboard/select-event', { event_id: eventId })
        setSelectedEvent(eventId);
        await refetch()
        console.log(`Evento selecionado: ${eventId}`);
    };

    return (
        <header className="flex justify-between items-center bg-white shadow-md p-4">
            <div>
                <h1 className="text-xl font-semibold">Bem-vindo, {user?.name}</h1>
            </div>

            <div className="flex items-center gap-4">
                {isLoading ? (
                    <span>Carregando...</span>
                ) : (
                    <Select value={selectedEvent} onValueChange={handleEventChange}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue>
                                {events?.find((event) => event.id === selectedEvent)?.name || "Selecione um evento"}
                            </SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                            {events?.map((event) => (
                                <SelectItem key={event.id} value={event.id} disabled={event.id === selectedEvent}>
                                    {event.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
        </header>
    )
}