import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { api } from "../../../lib/axios";
import { loadingStore } from "../../../store/loadingStore";
// import { errorStore } from "../../../store/errorStore";

const eventSchema = z.object({
    name: z
        .string()
        .min(1, "O nome do evento é obrigatório.")
        .max(225, "O nome do evento deve ter no máximo 225 caracteres."),
    description: z
        .string()
        .min(1, "A descrição do evento é obrigatória.")
        .max(225, "A descrição do evento deve ter no máximo 225 caracteres."),
    location: z.string().min(1, "A localização é obrigatória."),
    max_participants: z
        .number()
        .min(1, "O número máximo de participantes deve ser maior que 0."),
    start_date: z.string().min(1, "A data de início é obrigatória."),
    end_date: z.string().min(1, "A data de término é obrigatória."),
    owner: z.object({
        name: z
            .string()
            .min(1, "O nome do organizador é obrigatório.")
            .max(225, "O nome do organizador deve ter no máximo 225 caracteres."),
        email: z
            .string()
            .email("Informe um email válido.")
            .min(1, "O email do organizador é obrigatório."),
    }),
});

type EventFormData = z.infer<typeof eventSchema>;
export function EventCreate() {
    const navigate = useNavigate()
    const { showLoading, hideLoading } = loadingStore()
        // const setErrors = errorStore((state) => state.setErrors)
    const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>({ resolver: zodResolver(eventSchema) });

    const onSubmit = async (data: EventFormData) => {
        showLoading()
        console.log(data)
        try {
            await api.get('/sanctum/csrf-cookie')
            const response = await api.post('/api/admin/events', data)
            console.log(response)
        } catch (errors) {
            console.log(errors)
            // setErrors(errors.response.data as Record<string, string[]>);
        }finally{
            hideLoading()
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-6">Criar Evento</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 text-blue-500 hover:underline"
                >
                    ← Voltar
                </button>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow rounded p-6 space-y-4"
            >
                {/* Nome do Evento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nome do Evento
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Descrição */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Descrição
                    </label>
                    <textarea
                        {...register("description")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Localização */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Localização
                    </label>
                    <input
                        type="text"
                        {...register("location")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm">{errors.location.message}</p>
                    )}
                </div>

                {/* Número Máximo de Participantes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Número Máximo de Participantes
                    </label>
                    <input
                        type="number"
                        {...register("max_participants", { valueAsNumber: true })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.max_participants && (
                        <p className="text-red-500 text-sm">
                            {errors.max_participants.message}
                        </p>
                    )}
                </div>

                {/* Datas */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Data de Início
                    </label>
                    <input
                        type="date"
                        {...register("start_date")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.start_date && (
                        <p className="text-red-500 text-sm">{errors.start_date.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Data de Término
                    </label>
                    <input
                        type="date"
                        {...register("end_date")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.end_date && (
                        <p className="text-red-500 text-sm">{errors.end_date.message}</p>
                    )}
                </div>

                {/* Organizador */}
                <fieldset className="border border-gray-300 rounded-md p-4">
                    <legend className="text-sm font-medium text-gray-700">
                        Informações do Organizador
                    </legend>
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Nome
                        </label>
                        <input
                            type="text"
                            {...register("owner.name")}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.owner?.name && (
                            <p className="text-red-500 text-sm">{errors.owner.name.message}</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("owner.email")}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.owner?.email && (
                            <p className="text-red-500 text-sm">
                                {errors.owner.email.message}
                            </p>
                        )}
                    </div>
                </fieldset>

                {/* Botão de Enviar */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Criar Evento
                </button>
            </form>
        </div>
    )
}