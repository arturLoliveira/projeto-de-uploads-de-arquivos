import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { TriangleAlert } from "lucide-react";

export function NotAutorization() {
    const navigate = useNavigate();
    function handleBackToLogin() {
        navigate('/');
    }
    return(
        <div className="bg-zinc-900 flex flex-col items-center justify-center gap-4 h-screen">
            <TriangleAlert className="text-yellow-500"  />
            <h1 className="text-white">Você não está autorizado a acessar essa página, Faça login como adminstrador</h1>
            <Button onClick={handleBackToLogin}>Ir a página de login</Button>
        </div>
    )
}