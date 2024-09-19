import { SquareLibrary, X } from 'lucide-react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
} from './ui/dialog'
import { useNavigate } from 'react-router-dom';

interface OpenCourseProps {
  subjects: string[]; 
}
export function OpenCourse({ subjects }: OpenCourseProps) {
  const navigate = useNavigate();

  const handleSubjectClick = (subject: string) => {
    navigate(`/materias/${subject.toLowerCase()}`); // Redireciona para a página da matéria
  };

  return (
    <DialogContent className="flex flex-col gap-6 h-full">
      <div className="space-y-3">
    <div className="flex items-center justify-between">
      <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
    </div>
    <DialogDescription>
      Escolha uma matéria abaixo:
    </DialogDescription>
    </div>

    <ul className="space-y-2 gap-6 my-6 flex flex-col ">
      {subjects.map((subject, index) => (
        <li key={index} onClick={() => handleSubjectClick(subject)} className="flex gap-2 text-white cursor-pointer hover:underline">
          <SquareLibrary className='text-zinc-600'/>
          {subject}
        </li>
      ))}
    </ul>
  </DialogContent>
  )
}
