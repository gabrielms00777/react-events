import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router";

const employeeSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("Informe um email válido."),
    role: z.string().min(1, "O cargo é obrigatório."),
});

const visitorSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório."),
    document: z.string().min(1, "O documento é obrigatório."),
    phone: z.string().min(1, "O telefone é obrigatório."),
});

export function StaffCreate() {
    const navigate = useNavigate();
    const form = useForm({ resolver: zodResolver(employeeSchema) });

    const onSubmit = async (data) => {
        console.log(data);
        navigate("/admin/employees");
    };

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Adicionar Funcionário</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cargo</FormLabel>
                            <FormControl>
                                <Input placeholder="Cargo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit">Adicionar</Button>
                </form>
            </Form>
        </div>
    );
}

export function AddVisitor() {
    const navigate = useNavigate();
    const form = useForm({ resolver: zodResolver(visitorSchema) });

    const onSubmit = async (data) => {
        console.log(data);
        navigate("/admin/visitors");
    };

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Adicionar Visitante</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="document" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Documento</FormLabel>
                            <FormControl>
                                <Input placeholder="Documento" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input placeholder="Telefone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit">Adicionar</Button>
                </form>
            </Form>
        </div>
    );
}
