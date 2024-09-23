import { CirclePlus, SquareLibrary, X } from 'lucide-react'
import { DialogClose, DialogContent, DialogDescription } from './ui/dialog'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface OpenCourseProps {
  course: string 
}
export function OpenCourse({ course }: OpenCourseProps) {
  const navigate = useNavigate()

  const handleSubjectClick = (subject: string) => {
    navigate(`/course/${subject.toLowerCase()}`) 
  }
  const handleCourseClick = (course: string) => {
    navigate(`/create-course/${course.toLowerCase()}`)
  }
  console.log(course)
  const [message, setMessage] = useState('')
  const [subjects, setSubjects] = useState<string[]>([])
  
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/courses/${course}/subject`
        )
        if (!response.ok) {
          throw new Error('Erro ao recuperar as materias.')
        }
        const result = await response.json()
        setSubjects(result.subjects)
      } catch (error) {
        setMessage('Erro ao recuperar arquivos.')
      }
    }

    fetchSubjects()
  }, [course])
  return (
    <DialogContent className="flex flex-col gap-6 h-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <DialogClose>
            <X className="size-5 text-zinc-600" />
          </DialogClose>
        </div>
        <DialogDescription>Escolha uma matéria abaixo:</DialogDescription>
      </div>

      <ul className="space-y-2 gap-6 my-6 flex flex-col">
        {subjects.map((subject, index) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            onClick={() => handleSubjectClick(subject)}
            className="flex gap-2 text-white cursor-pointer hover:underline"
          >
            <SquareLibrary className="text-zinc-600" />
            {subject}
          </li>
        ))}
      </ul>
        <button
          type="button"
          className="flex gap-2 items-center justify-center cursor-pointer"
          onClick={() => handleCourseClick(course)}
        >
          <CirclePlus className='text-zinc-400' />
          <span className="text-white">Adicionar Matéria</span>
        </button>
    </DialogContent>
  )
}
