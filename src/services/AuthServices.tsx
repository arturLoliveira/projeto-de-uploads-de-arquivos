// AuthServices.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  // Defina as propriedades do usuário conforme sua aplicação
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signin: (userData: User) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signin = (userData: User) => {
    setUser(userData);
  };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
