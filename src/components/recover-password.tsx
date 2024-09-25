import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from './ui/input'
import { Button } from './ui/button'

export const RequestRecoverPassword = () => {
  const { token } = useParams<{ token: string }>()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:3001/auth/reset-password/${token}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password, email }),
        }
      )

      if (response.ok) {
        setMessage('Senha redefinida com sucesso!')
      } else {
        setMessage('Erro ao redefinir a senha.')
      }
    } catch (error) {
      setMessage('Erro ao redefinir a senha.')
    }
    navigate('/')
  }

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-800">
      <div className="w-full max-w-md ">
      <form onSubmit={handleSubmit} className="bg-zinc-600 flex flex-col items-center gap-3 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">Redefinir Senha</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-100 text-sm font-bold mb-2"
          >
            E-mail:
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Insira seu e-mail"
            required
          />
        </div>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Nova senha"
          required
        />
        <Button type="submit">Redefinir Senha</Button>
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  )
}
