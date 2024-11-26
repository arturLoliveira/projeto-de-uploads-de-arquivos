import { useNavigate } from "react-router-dom"

export function FolderPage() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(''); 
      };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-xl">Pastas: </h1>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
<div className="flex gap-4" onClick={handleClick}>
        <div className="w-32 h-28 border-4 border-zinc-500 flex justify-center items-center cursor-pointer">
          <h1 className="font-bold">Provas</h1>
        </div>
        <div className="w-32 h-28 border-4 border-zinc-500 flex justify-center items-center cursor-pointer">
          <h1 className="font-bold">Exercicios</h1>
        </div>
        <div className="w-32 h-28 border-4 border-zinc-500 flex justify-center items-center cursor-pointer">
          <h1 className="font-bold">Slides</h1>
        </div>
      </div>
    </div>
  )
}
