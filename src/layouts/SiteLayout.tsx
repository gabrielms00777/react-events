import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useLoadingStore } from "../store/loadingStore";

// const checkAuth = async () => {
//     try {
//         const response = await fetch('/api/auth/validate', {
//             method: 'GET',
//             credentials: 'include', // Para cookies de sessão
//         });
//         if (!response.ok) throw new Error('Não autenticado');
//         const data = await response.json();
//         return data.isAuthenticated; // true ou false
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
// };

export function SiteLayout() {
    const [isAuth, setIsAuth] = useState<boolean | null>(true);
    // const { isLoading, hideLoading, showLoading } = useLoadingStore()

    useEffect(() => {
        const verifyUser = async () => {
            // showLoading()
            // await new Promise((resolve) => setTimeout(resolve, 3000));
            // hideLoading()
            // const authenticated = await checkAuth();
            // setIsAuth(authenticated);
            // setLoading(false);
        };
        verifyUser();
    }, []);
    // if (isLoading) {
    //     return (
    //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    //             <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
    //                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    //                 <p className="mt-4 text-gray-700 text-lg font-semibold">Carregando...</p>
    //             </div>
    //         </div>
    //     );
    // }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <p className="bg-red-500">Site Layout</p>

            <Outlet />
        </div>
    )
}