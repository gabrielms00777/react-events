import React from "react";
import { Event } from "../../types/Event";

type EventCardProps = {
    event: Event
}

export const EventCard: React.FC = ({ event }: EventCardProps) => {
    return (
        <div className="bg-white shadow rounded p-4">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p className="text-gray-600">{event.description}</p>
            <div className="mt-2">
                <p className="text-sm text-gray-500">Local: {event.location}</p>
                <p className="text-sm text-gray-500">
                    Data: {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                    Participantes: {event.max_participants}
                </p>
            </div>
            <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700">
                    Organizador: {event.owner.name}
                </p>
            </div>
        </div>
    )
} 