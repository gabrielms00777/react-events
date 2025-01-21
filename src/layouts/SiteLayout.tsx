import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

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
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const verifyUser = async () => {
    //         const authenticated = await checkAuth();
    //         setIsAuth(authenticated);
    //         setLoading(false);
    //     };
    //     verifyUser();
    // }, []);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

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