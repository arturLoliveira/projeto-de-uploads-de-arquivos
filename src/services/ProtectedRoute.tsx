import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthServices'; 

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (user.role !== requiredRole && user.role !== 'admin') {
      navigate('/admin'); 
    }
  }, [user, requiredRole, navigate]);

  return (user && (user.role === requiredRole || user.role === 'admin')) ? children : null;

};

export default ProtectedRoute;
