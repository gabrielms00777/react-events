import { Link, Outlet } from "react-router";

export function SiteLayout() {

    return (
        <div>
            {/* Header */}
            <header className="py-4 text-white bg-blue-600 shadow-md">
                <div className="container flex items-center justify-between px-6 mx-auto">
                    <h1 className="text-2xl font-bold">
                        <Link to="/">Sistema de Eventos</Link>
                    </h1>
                    <nav className="space-x-6">
                        <Link to="#" className="hover:underline">Contato</Link>
                        <Link to="#" className="hover:underline">Sobre</Link>
                        <Link to="/login" className="hover:underline">Login</Link>
                    </nav>
                </div>
            </header>

            <Outlet />
        </div>
    )
}