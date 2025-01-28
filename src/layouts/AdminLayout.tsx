import { Sidebar } from "@/components/admin/Sidebar"
import { loadingStore } from "@/store/loadingStore"
import { userStore } from "@/store/userStore"
import { checkAuthRole } from "@/utils/checkAuthRole"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router"


export function AdminLayout() {
    const [isLoading, setIsLoading] = useState(true);
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
                console.error('Erro ao verificar autenticação:', error)
                clearUser()
            } finally {
                setIsLoading(false)
                hideLoading()
            }
        }
        checkRole()
    }, [])


    return (
        <>
        {isLoading ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              <p className="mt-4 text-gray-700 text-lg font-semibold">Carregando...</p>
          </div>
      </div>
        ) : (
          <>
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">

            <Sidebar />

            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
          </>
        )}
      </>
    )
}
