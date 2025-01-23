import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Event } from "../../../types/Event";
import { EventCard } from "../../../components/admin/EventCard";
import { api } from "../../../lib/axios";

export function EventIndex() {
    const [events, setEvents] = useState([])
    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await api.get('/api/admin/events')
                setEvents(response.data.data)
                console.log(response)
            } catch (error) {
                
            }
        }
        getEvents()
    }, [])
    // const events: Event[] = [
    //     {
    //         id: 'infaoibfa',
    //         name: "Evento de Tecnologia",
    //         description: "Um evento para discutir as tendências de tecnologia.",
    //         location: "São Paulo, Brasil",
    //         max_participants: 200,
    //         start_date: "2025-02-01T10:00:00Z",
    //         end_date: "2025-02-01T18:00:00Z",
    //         owner: { name: "João Silva", email: "joao@email.com", role: 'admin' },
    //         created_at: "2025-01-15T12:00:00Z",
    //         updated_at: "2025-01-18T12:00:00Z",
    //     },
    //     {
    //         id: '2',
    //         name: "Workshop de Desenvolvimento Web",
    //         description: "Aprenda as melhores práticas em desenvolvimento web.",
    //         location: "Rio de Janeiro, Brasil",
    //         max_participants: 100,
    //         start_date: "2025-03-10T09:00:00Z",
    //         end_date: "2025-03-12T17:00:00Z",
    //         owner: { name: "Maria Oliveira", email: "maria@email.com", role: 'admin' },
    //         created_at: "2025-01-10T14:00:00Z",
    //         updated_at: "2025-01-12T14:00:00Z",
    //     },
    // ];


    return (
        <div className="bg-white p-8 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Lista de Eventos</h1>
                <Link
                    to={'/admin/events/create'}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Criar Novo Evento
                </Link>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 && events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>

            {/* <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Descrição</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Localização</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Participantes</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Início</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Fim</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event.id}>
                                <td className="border border-gray-300 px-4 py-2">{event.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{event.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{event.location}</td>
                                <td className="border border-gray-300 px-4 py-2">{event.maxParticipants}</td>
                                <td className="border border-gray-300 px-4 py-2">{event.startDate}</td>
                                <td className="border border-gray-300 px-4 py-2">{event.endDate}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-gray-500">
                                Nenhum evento encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table> */}
        </div>
    )
}