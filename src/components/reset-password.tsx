import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/auth/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
    

      if (response.ok) {
        setMessage('Email de recuperação enviado, verifique sua caixa de entrada.');
      } else {
        setMessage('Erro ao solicitar recuperação de senha, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      setMessage('Erro ao solicitar recuperação de senha, tente novamente.');
    }
    navigate('/')
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-800">
      <div className="w-full max-w-md ">
        <form onSubmit={handleSubmit} className="bg-zinc-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6">Recuperar Senha</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-zinc-100 text-sm font-bold mb-2">E-mail:</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Insira seu e-mail"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="submit"            >
              Enviar
            </Button>
          </div>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
