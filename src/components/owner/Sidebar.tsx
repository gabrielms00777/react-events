import { FC } from "react";
import { Link, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { userStore } from "@/store/userStore";
import { api } from "@/lib/axios";

export const Sidebar: FC = () => {
    const clearUser = userStore((state) => state.clearUser)
    const navLinks = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Evento", path: "/dashboard/event" },
        { name: "Funcionários", path: "/dashboard/staff" },
        { name: "Visitantes", path: "/dashboard/visitors" },
    ];

    const handleLogout = async () => {
        clearUser()
        await api.post('/logout')
        return <Navigate to="/login" replace />
    }

    return (
        <>
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-blue-600 text-white p-6 space-y-6">
                <h2 className="text-2xl font-bold">Admin Evento</h2>
                <nav>
                    <ul className="space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="hover:text-blue-300 text-lg">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Button
                                onClick={() => handleLogout()}
                                variant={"link"}
                                className="hover:text-blue-300 text-lg"
                            >
                                <LogOut />
                                <span>Sair</span>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden fixed top-4 left-4 z-50">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="space-y-4 mt-6">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className="block text-lg">
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}