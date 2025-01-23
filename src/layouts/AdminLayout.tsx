import { Link, Outlet } from "react-router";
// import { Sidebar } from "../components/admin/Sidebar";

export function AdminLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <Link to="/admin" className="hover:text-blue-300">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/events" className="hover:text-blue-300">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/reports" className="hover:text-blue-300">
                                Relatórios
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}