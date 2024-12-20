import {
  CircleHelp,
  LayoutDashboard,
  LogOutIcon,
  ArrowLeft,
} from 'lucide-react'
import { InOrbitIcon } from './in-orbit-icon'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/AuthServices'

export function Sidebar() {
  const navigate = useNavigate()
  const { signout } = useAuth()

  const handleSubjectClick = () => {
    navigate('/app')
  }

  const handleGoBack = () => {
    navigate(-1)
  }
  function handleLogout() {
    localStorage.removeItem('token')
    signout()
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center gap-16 h-screen bg-zinc-500  px-6 py-2">
      <InOrbitIcon />

      <button
        type="button"
        onClick={handleLogout}
        className="flex flex-col gap-1 items-center justify-center cursor-pointer"
      >
        <LogOutIcon />
        <span>Logout</span>
      </button>
      <button
        type="button"
        className="flex flex-col gap-1 items-center justify-center cursor-pointer"
        onClick={handleSubjectClick}
      >
        <LayoutDashboard />
        <span>Dashboard</span>
      </button>
      <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
        <CircleHelp />
        <span>Help</span>
      </div>
      <button
        className="flex flex-col gap-1 items-center justify-center cursor-pointer"
        type="button"
        onClick={handleGoBack}
      >
        <ArrowLeft />
        <span>Voltar</span>
      </button>
    </div>
  )
}
