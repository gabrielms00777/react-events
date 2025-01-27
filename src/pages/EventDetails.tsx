import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/axios";
import { Event } from "@/types/Event";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "lucide-react";
import { useParams } from "react-router"

export function EventDetails() {
    const { id } = useParams<{ id: string }>()
    const { data: event, isLoading, isError } = useQuery<Event>({
        queryKey: ["event", id],
        queryFn: async () => {
            const response = await api.get(`/api/events/${id}`);
            return response.data.data;
        },
    });

    if (isLoading) {
        return (
            <div className="container p-6 mx-auto">
                <Skeleton className="w-full h-10 mb-4" />
                <Skeleton className="w-full h-20 mb-4" />
                <Skeleton className="w-full h-40" />
            </div>
        );
    }

    if (isError || !event) {
        return (
            <div className="container p-6 mx-auto text-center">
                <p className="text-red-500">Erro ao carregar o evento. Tente novamente.</p>
            </div>
        );
    }

    const eventStatus = new Date(event.end_date) < new Date() ? "Encerrado" : "Ativo";

    return (
        <div className="container p-6 mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{event.name}</CardTitle>
                    <Badge variant={eventStatus === "Encerrado" ? "destructive" : "default"}>
                        {eventStatus}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700">{event.description}</p>
                    <p className="mt-2 text-gray-500">
                        <strong>Local:</strong> {event.location}
                    </p>
                    <p className="mt-2 text-gray-500">
                        <strong>Início:</strong> {new Date(event.start_date).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-gray-500">
                        <strong>Término:</strong> {new Date(event.end_date).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-gray-500">
                        <strong>Máx. Participantes:</strong> {event.max_participants}
                    </p>
                    <p className="mt-2 text-gray-500">
                        <strong>Organizador:</strong> {event.owner.name} ({event.owner.email})
                    </p>
                    <Button className="w-full mt-4">Inscrever-se</Button>
                </CardContent>
            </Card>
        </div>
    );
}