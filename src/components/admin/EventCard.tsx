import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import { Event } from "../../types/Event";

type EventCardProps = {
    event: Event;
    onViewEvent: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewEvent }) => {
    const isPastEvent = new Date(event.end_date) < new Date()
    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle className="text-lg font-bold">{event.name}</CardTitle>
                <Badge variant={isPastEvent ? "destructive" : "default"}>
                    {isPastEvent ? "Realizado" : "Em andamento"}
                </Badge>
            </CardHeader>
            <CardContent>
                {/* <p className="text-sm text-muted-foreground">{event.description}</p> */}
                <p className="mt-2 text-sm font-semibold">Local: {event.location}</p>
                <p className="text-sm">Participantes Máx: {event.max_participants}</p>
                <p className="text-sm">
                    Início: {(new Date(event.start_date).toLocaleDateString('pt-br'))}
                </p>
                <p className="text-sm">
                    Fim: {(new Date(event.end_date).toLocaleDateString('pt-br'))}
                </p>
            </CardContent>
            <CardFooter>
                <Button onClick={() => onViewEvent(event.id)} variant="outline">
                    Ver Detalhes
                </Button>
            </CardFooter>
        </Card>
    )
} 