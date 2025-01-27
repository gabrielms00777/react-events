import { Navigate, Outlet } from 'react-router';
import { userStore } from '../store/userStore';

export const ProtectedAdminRoute = () => {
    const { isAuthenticated, user } = userStore();

    if (isAuthenticated() && user?.role === 'admin') {
        return <Outlet />
    }

    return <Navigate to="/login" replace />
};

