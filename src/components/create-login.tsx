import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../services/AuthServices";
import { InOrbitIcon } from "./in-orbit-icon";
import { LogIn, UserRoundPlus } from "lucide-react";

export function CreateLogin() {
  const navigate = useNavigate();
  const { signin } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Falha ao fazer login');
      }
  
      const { token, role } = await response.json(); 
      console.log('Login bem-sucedido:', token, role);
      
      signin({ id: email, name: "Nome do Usuário", email, role, token }); 
      

      if (role === 'admin') {
        navigate('/app');
      } else {
        navigate('/app');
      }
    } catch (error) {
      setError('Falha ao fazer login');
      console.error(error);
    }
  };
  
  const handleCreateUser = () => {
    navigate('/course/create-user');
  };

  return (
    <div className="bg-zinc-800 h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center max-w-[540px] py-10 px-5 w-full bg-zinc-600">
        <div className="flex gap-4">
        <InOrbitIcon />
        <h1 className="text-white text-2xl">Login</h1>
        </div>
        <form onSubmit={handleLogin} className="flex-1 flex flex-col items-center justify-between gap-5">
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Digite seu email:" />
          <Input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} required placeholder="Digite sua senha:" />
          <Button className="flex-1">Fazer Login <LogIn /></Button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2 items-center">
          <span className="text-zinc-300">Ainda não é cadastrado?</span>
          <Button type="button" className="text-white" onClick={handleCreateUser}>Cadastre-se <UserRoundPlus /></Button>
        </div>
      </div>
    </div>
  );
}
