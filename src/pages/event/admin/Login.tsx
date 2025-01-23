import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "react-router"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { loadingStore } from "@/store/loadingStore"
import { errorStore } from "@/store/errorStore"
import { api } from "@/lib/axios"

const loginSchema = z.object({
    email: z.string().email("Informe um email válido."),
    password: z.string(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function EventAdminLogin() {
    const { showLoading, hideLoading } = loadingStore()
    const setErrors = errorStore((state) => state.setErrors)
    const { uuid } = useParams<{ uuid: string }>()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: LoginFormData) => {
        showLoading()
        try {
            const response = await api.post("/api/event/login", { ...data, event_id: uuid })
            console.log(response)
        } catch (errors: any) {
            setErrors(errors.response.data.errors as Record<string, string[]>);
        } finally {
            hideLoading()
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center">Login do Organizador</h2>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Digite seu email" {...field} />
                                    </FormControl>
                                    <FormMessage>{errors.email?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Digite sua senha" {...field} />
                                    </FormControl>
                                    <FormMessage>{errors.password?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
