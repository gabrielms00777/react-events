import { useNavigate } from "react-router"
import { Event } from "../../../types/Event";
import { EventCard } from "../../../components/admin/EventCard";
import { api } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const fetchEvents = async (): Promise<Event[]> => {
    const response = await api.get('/api/admin/events')
    console.log(response.data.data)
    return response.data.data || []
}

export function EventIndex() {
    const navigate = useNavigate();
    const { data: events, isError, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents
    })

    if (isError) return <p>Erro ao carregar eventos.</p>;


    return (
        <div className="container p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Listagem de Eventos</h1>
                <Button onClick={() => navigate("/admin/events/create")}>Adicionar Evento</Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <p className="text-center">Carregando eventos...</p>
                ) : (events && events.map((event) => (
                    <EventCard key={event.id} event={event} onViewEvent={(id) => navigate(`/admin/events/${id}`)} />
                )))}
            </div>
        </div>
    )
}