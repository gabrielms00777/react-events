import { Sidebar } from "@/components/admin/Sidebar"
import { loadingStore } from "@/store/loadingStore"
import { userStore } from "@/store/userStore"
import { checkAuthRole } from "@/utils/checkAuthRole"
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router"


export function AdminLayout() {
    const { showLoading, hideLoading } = loadingStore()
    const clearUser = userStore((state) => state.clearUser)
    useEffect(() => {
        async function checkRole() {
            showLoading()
            try {
                const response = await checkAuthRole('admin')
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
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">

            <Sidebar />

            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}
