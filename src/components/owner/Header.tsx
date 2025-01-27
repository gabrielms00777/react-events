import { FC, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState("");

    const events = [
        { id: "1", name: "Evento Corporativo 2024" },
        { id: "2", name: "Tech Conference" },
    ];

    const handleEventChange = (eventId: string) => {
        setSelectedEvent(eventId);
        console.log(`Evento selecionado: ${eventId}`);
        // Aqui você pode chamar uma API para carregar os dados do evento selecionado
    };

    return (
        <header className="flex justify-between items-center bg-white shadow-md p-4">
            <div>
                <h1 className="text-xl font-semibold">Bem-vindo, João</h1>
            </div>

            <div className="flex items-center gap-4">
                <Select value={selectedEvent} onValueChange={handleEventChange}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Selecione um evento" />
                    </SelectTrigger>
                    <SelectContent>
                        {events.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                                {event.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* User Avatar */}
                {/* <Avatar>
                    <AvatarImage src="https://placehold.co/150" alt="User" />
                    <AvatarFallback>J</AvatarFallback>
                </Avatar> */}
            </div>
        </header>
    )
}