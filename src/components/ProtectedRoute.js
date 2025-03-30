import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    console.log('ProtectedRoute check - isAuthenticated:', isAuthenticated);
    console.log('Full localStorage:', localStorage);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    console.log('Not authenticated - redirecting to login');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  console.log('User authenticated - rendering protected content');
  return children;
};

export default ProtectedRoute;