import { useAuth } from '../services/AuthServices';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  if (auth.user) {
    return children;
  }
};

export default ProtectedRoute;
