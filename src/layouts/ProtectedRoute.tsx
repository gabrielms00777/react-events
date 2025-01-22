import { Navigate, Outlet } from 'react-router';
import { userStore } from '../store/userStore';

export const ProtectedRoute = () => {
    const isAuthenticated = userStore((state) => state.isAuthenticated());

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

