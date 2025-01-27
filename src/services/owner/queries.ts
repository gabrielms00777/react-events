import { useQuery } from "@tanstack/react-query";
import { getOnwerEvents } from "./requests";

export function useEvents() {
    return useQuery({
        queryKey: ["owner.events"],
        queryFn: getOnwerEvents
    })
}