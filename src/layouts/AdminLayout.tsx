import { Link, Outlet } from "react-router"
import { Home, Calendar, FileText, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const navItems = [
    { to: "/admin", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { to: "/admin/events", label: "Eventos", icon: <Calendar className="w-5 h-5" /> },
    { to: "/admin/reports", label: "Relatórios", icon: <FileText className="w-5 h-5" /> },
]

export function AdminLayout() {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            {/* Header (Mobile) */}
            <header className="md:hidden bg-blue-600 text-white flex items-center justify-between px-4 py-3 shadow-md">
                <h1 className="text-lg font-bold">Sistema de Eventos</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-white">
                        <SheetHeader>
                            <SheetTitle>Admin Panel</SheetTitle>
                        </SheetHeader>
                        <nav className="mt-6">
                            <ul className="space-y-4">
                                {navItems.map((item) => (
                                    <li key={item.to}>
                                        <Link
                                            to={item.to}
                                            className="flex items-center space-x-2 text-lg font-medium text-gray-900 hover:text-gray-700"
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>

            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex w-64 bg-blue-700 text-white p-6 shadow-md">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                    <nav>
                        <ul className="space-y-4">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className="flex items-center space-x-2 text-lg font-medium hover:text-blue-300"
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}
