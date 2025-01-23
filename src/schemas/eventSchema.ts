import { z } from "zod";

export const eventSchema = z.object({
    name: z
        .string()
        .min(1, "O nome do evento é obrigatório.")
        .max(225, "O nome do evento deve ter no máximo 225 caracteres."),
    description: z
        .string()
        .min(1, "A descrição do evento é obrigatória.")
        .max(225, "A descrição do evento deve ter no máximo 225 caracteres."),
    location: z.string().min(1, "A localização é obrigatória."),
    max_participants: z.number().min(1, "O número máximo de participantes deve ser maior que 0."),
    start_date: z.string().min(1, "A data de início é obrigatória."),
    end_date: z.string().min(1, "A data de término é obrigatória."),
    owner: z.object({
        name: z
            .string()
            .min(1, "O nome do organizador é obrigatório.")
            .max(225, "O nome do organizador deve ter no máximo 225 caracteres."),
        email: z.string().email("Informe um email válido.").min(1, "O email do organizador é obrigatório."),
    }),
});

export type EventFormData = z.infer<typeof eventSchema>;
