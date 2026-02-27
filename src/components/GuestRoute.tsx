import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    // If user is already logged in, redirect them to the home page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
