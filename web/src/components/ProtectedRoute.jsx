import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const loc = useLocation();
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={`/login?next=${encodeURIComponent(loc.pathname)}`} replace />
  );
}
