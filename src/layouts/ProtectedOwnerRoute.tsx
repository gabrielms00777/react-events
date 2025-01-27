import { Navigate, Outlet } from 'react-router';
import { userStore } from '../store/userStore';

export const ProtectedOwnerRoute = () => {
    const { isAuthenticated, user } = userStore();

    if (isAuthenticated() && user?.role === 'event_owner') {
        return <Outlet />
    }

    return <Navigate to="/login" replace />
};

