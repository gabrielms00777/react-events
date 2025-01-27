import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/axios"
import { loadingStore } from "@/store/loadingStore"
import { EventFormData, eventSchema } from "@/schemas/eventSchema"

export function EventCreate() {
    const navigate = useNavigate()
    const { showLoading, hideLoading } = loadingStore()

    const form = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            name: "Evento Teste",
            description: "Desc Teste",
            location: "Local Teste",
            max_participants: 100,
            start_date: "2025-01-28",
            end_date: "2025-01-28",
            owner: {
                name: "Teste",
                email: "coiso@coiso.com",
            },
        },
    })

    const onSubmit = async (data: EventFormData) => {
        showLoading()
        try {
            const response = await api.post("/api/admin/events", data)
            navigate("/admin/events")
        } catch (error: any) {
            console.error(error.response?.data?.errors || "Erro desconhecido")
        } finally {
            hideLoading()
        }
    }

    return (
        <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Criar Novo Evento</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Evento</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do evento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descreva o evento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Localização</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite a localização" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="max_participants"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número Máximo de Participantes</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Digite o número máximo"
                                            {...field}
                                            onChange={(e) =>
                                                form.setValue("max_participants", Number(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">

                        <FormField
                            control={form.control}
                            name="start_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Início</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="end_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Término</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="p-4 bg-gray-100 rounded-md">
                        <h2 className="mb-2 text-lg font-semibold">Informações do Dono</h2>
                        <div className="grid gap-4 md:grid-cols-2">

                            <FormField
                                control={form.control}
                                name="owner.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome do Organizador</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o nome do organizador" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="owner.email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email do Organizador</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Digite o email do organizador"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    <Button type="submit" className="w-full">
                        Criar Evento
                    </Button>
                </form>
            </Form>
        </div>
    )
}
