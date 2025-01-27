import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Pencil, Trash } from "lucide-react";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router";

// Simulação de API
const fetchEmployees = async () => {
    return new Promise((resolve) =>
        setTimeout(
            () =>
                resolve([
                    { id: 1, name: "João Silva", role: "Segurança", email: "joao@email.com" },
                    { id: 2, name: "Maria Souza", role: "Recepcionista", email: "maria@email.com" },
                    { id: 3, name: "Carlos Pereira", role: "Técnico", email: "carlos@email.com" },
                ]),
            1000
        )
    );
};

const roles = ["Segurança", "Recepcionista", "Técnico"];

export function StaffList() {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");

    // Busca funcionários via React Query
    const { data: employees, isLoading } = useQuery({
        queryKey: ["employees"],
        queryFn: fetchEmployees,
    });

    // Filtragem dos funcionários por nome e função
    const filteredEmployees = employees?.filter(
        (employee) =>
            employee.name.toLowerCase().includes(search.toLowerCase()) &&
            (role ? employee.role === role : true)
    );

    const handleDelete = (id: number) => {
        toast.error("Funcionário excluído com sucesso!" + id);
        // Aqui você adicionaria a lógica de deleção na API
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Funcionários</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-4">
                        <Input
                            placeholder="Buscar por nome..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-1/3"
                        />
                        <Select onValueChange={setRole} value={role}>
                            <SelectTrigger className="w-1/3">
                                <SelectValue placeholder="Filtrar por cargo" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="ml-4" asChild>
                            <Link to="/dashboard/staff/create">
                                Adicionar Funcionário
                            </Link>
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <Loader2 className="animate-spin h-8 w-8 text-primary" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Função</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmployees?.length > 0 ? (
                                    filteredEmployees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell>{employee.name}</TableCell>
                                            <TableCell>{employee.role}</TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button size="sm" variant="outline">
                                                    <Pencil className="w-4 h-4" /> Editar
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(employee.id)}
                                                >
                                                    <Trash className="w-4 h-4" /> Excluir
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            Nenhum funcionário encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
