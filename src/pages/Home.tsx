import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

const fetchSiteEvents = async () => {
    const response = await api.get('/api/events')
    return response.data.data
}

export function Home() {
    const { data: events, isLoading, isError } = useQuery({
        queryKey: ['site.events'],
        queryFn: fetchSiteEvents
    })

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Conteúdo da Página */}
            <main className="container px-6 py-12 mx-auto">
                <h2 className="mb-6 text-3xl font-bold text-center">Eventos Disponíveis</h2>

                {isLoading && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Skeleton className="w-full h-40 rounded-lg" />
                        <Skeleton className="w-full h-40 rounded-lg" />
                        <Skeleton className="w-full h-40 rounded-lg" />
                    </div>
                )}

                {isError && (
                    <p className="text-center text-red-500">Erro ao carregar eventos.</p>
                )}

                {events && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {events.map((event: any) => (
                            <Card key={event.id} className="shadow-md">
                                <CardHeader>
                                    <CardTitle>{event.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700">{event.description}</p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Local: {event.location}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Data: {new Date(event.start_date).toLocaleDateString()}
                                    </p>
                                    <Button className="w-full mt-4" variant="default" asChild>
                                        <Link to={`/events/${event.id}`}>Ver detalhes</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}