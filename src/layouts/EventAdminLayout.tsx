import { Navigate, Outlet } from "react-router"
import { Sidebar } from "@/components/owner/Sidebar";
import { Header } from "@/components/owner/Header";
import { loadingStore } from "@/store/loadingStore"
import { userStore } from "@/store/userStore"
import { checkAuthRole } from "@/utils/checkAuthRole"
import { useEffect } from "react"




export function EventAdminLayout() {
    const { showLoading, hideLoading } = loadingStore()
    const clearUser = userStore((state) => state.clearUser)
    useEffect(() => {
        async function checkRole() {
            showLoading()
            try {
                const response = await checkAuthRole('event_owner')
                if (!response) {
                    clearUser()
                    return <Navigate to="/login" replace />
                }
            } catch (error) {

            } finally {
                hideLoading()
            }
        }
        checkRole()
    }, [])

    return (
        <div className="flex h-screen bg-gray-100">

            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">

                <Header />

                {/* Dynamic content */}
                <main className="p-8 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
