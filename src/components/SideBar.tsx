import { CircleHelp, LayoutDashboard, LogOutIcon } from "lucide-react";
import { InOrbitIcon } from "./in-orbit-icon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthServices";

export function Sidebar() {
    const navigate = useNavigate();
    const { signout } = useAuth()

    const handleSubjectClick = () => {
        navigate('/app'); 
      };
      function handleLogout() {
        signout()
        navigate('/')
      }

    return(
        <div className="flex flex-col items-center gap-16 h-screen bg-zinc-500  px-6 py-2">
                <InOrbitIcon />

                <button type="button" onClick={handleLogout} className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <LogOutIcon />
                    <span>Logout</span>
                </button>
                <button type="button" className="flex flex-col gap-1 items-center justify-center cursor-pointer" onClick={handleSubjectClick}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </button>
                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <CircleHelp />
                    <span>Help</span>
                </div>
            </div>
    )
}