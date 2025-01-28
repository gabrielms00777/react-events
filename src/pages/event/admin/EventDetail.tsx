import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEventDetails } from "@/services/owner/queries";
import { eventStore } from "@/store/eventStore";

// Schema de validação com Zod
const eventSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    date: z.string().nonempty("A data é obrigatória."),
    location: z.string().min(5, "O local deve ter pelo menos 5 caracteres."),
    description: z.string().optional(),
    image: z.string().url("A URL da imagem deve ser válida."),
});

type EventFormData = z.infer<typeof eventSchema>;

export function EventDetail() {
    const { selectedEvent } = eventStore()
    const { data: eventDetails } = useEventDetails(selectedEvent)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
    });
    useEffect(() => {
        if (eventDetails) {
            setValue("name", eventDetails.name);
            setValue("date", eventDetails.date);
            setValue("location", eventDetails.location);
            setValue("description", eventDetails.description);
            setValue("image", eventDetails.image);
        }
    }, [eventDetails, setValue]);

    // useEffect(() => {
    //     const fetchEvent = async () => {
    //         // Simulação de dados vindos da API
    //         const eventData = {
    //             name: "Tech Conference 2024",
    //             date: "2025-06-15",
    //             location: "Centro de Convenções SP",
    //             description: "Um evento sobre tecnologia e inovação.",
    //             image: "https://via.placeholder.com/600x300",
    //         };

    //         // Preenchendo os campos do formulário
    //         setValue("name", eventData.name);
    //         setValue("date", eventData.date);
    //         setValue("location", eventData.location);
    //         setValue("description", eventData.description);
    //         setValue("image", eventData.image);
    //     };

    //     fetchEvent();
    // }, [setValue]);

    // Simulação de envio para API
    const mutation = useMutation({
        mutationFn: async (data: EventFormData) => {
            // Simulação de envio para o backend
            return new Promise((resolve) => setTimeout(() => resolve(data), 2000));
        },
        onSuccess: () => {
            toast.success("Evento atualizado com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao atualizar o evento.");
        },
    });

    const onSubmit = async (data: EventFormData) => {
        await mutation.mutateAsync(data);
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Editar Evento</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Nome do Evento</Label>
                            <Input id="name" placeholder="Digite o nome do evento" {...register("name")} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="date">Data do Evento</Label>
                            <Input id="date" type="date" {...register("date")} />
                            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="location">Local do Evento</Label>
                            <Input id="location" placeholder="Digite o local do evento" {...register("location")} />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea id="description" placeholder="Digite uma descrição" {...register("description")} />
                        </div>

                        <div>
                            <Label htmlFor="image">URL da Imagem</Label>
                            <Input id="image" placeholder="https://example.com/image.jpg" {...register("image")} />
                            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
