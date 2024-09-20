import { CircleHelp, CircleUser, LayoutDashboard } from "lucide-react";
import { InOrbitIcon } from "./in-orbit-icon";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
    const navigate = useNavigate();

    const handleSubjectClick = () => {
        navigate('/app'); 
      };

    return(
        <div className="flex flex-col items-center gap-16 bg-zinc-500 h-screen px-6 py-2">
                <InOrbitIcon />

                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <CircleUser />
                    <span>User</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer" onClick={handleSubjectClick}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <CircleHelp />
                    <span>Help</span>
                </div>
            </div>
    )
}