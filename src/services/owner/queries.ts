import { useQuery } from "@tanstack/react-query";
import { getEventDetails, getOnwerEvents, getStaff } from "./requests";

export function useEvents() {
    return useQuery({
        queryKey: ["owner.events"],
        queryFn: getOnwerEvents
    })
}

export function useEventDetails(eventId?: string) {
    return useQuery({
        queryKey: ["event.details", eventId],
        queryFn: () => getEventDetails(eventId!),
        enabled: !!eventId, // Só faz a query se um evento estiver selecionado
    });
}

export function useStaffs() {
    return useQuery({
        queryKey: ["owner.staff"],
        queryFn: getStaff
    })
}