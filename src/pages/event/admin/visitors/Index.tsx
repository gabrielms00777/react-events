import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router";

export const visitors = [
    {
        id: 1,
        name: "João Silva",
        email: "joao.silva@example.com",
        role: "Convidado",
    },
    {
        id: 2,
        name: "Maria Oliveira",
        email: "maria.oliveira@example.com",
        role: "VIP",
    },
    {
        id: 3,
        name: "Carlos Santos",
        email: "carlos.santos@example.com",
        role: "Palestrante",
    },
    {
        id: 4,
        name: "Ana Souza",
        email: "ana.souza@example.com",
        role: "Convidado",
    },
    {
        id: 5,
        name: "Pedro Lima",
        email: "pedro.lima@example.com",
        role: "VIP",
    },
];


export function VisitorList() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const navigate = useNavigate();

    const filteredVisitors = visitors.filter((visitor) =>
        visitor.name.toLowerCase().includes(search.toLowerCase()) &&
        (roleFilter ? visitor.role === roleFilter : true)
    );

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Visitantes</h1>
                <Button onClick={() => navigate("/dashboard/visitors/create")}>Adicionar Visitante</Button>
            </div>
            <div className="flex gap-4 mb-4">
                <Input
                    placeholder="Buscar por nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border border-gray-300 rounded px-4 py-2"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">Todos os papéis</option>
                    <option value="Convidado">Convidado</option>
                    <option value="VIP">VIP</option>
                    <option value="Palestrante">Palestrante</option>
                </select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Papel</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredVisitors.map((visitor) => (
                        <TableRow key={visitor.id}>
                            <TableCell>{visitor.name}</TableCell>
                            <TableCell>{visitor.email}</TableCell>
                            <TableCell>{visitor.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
