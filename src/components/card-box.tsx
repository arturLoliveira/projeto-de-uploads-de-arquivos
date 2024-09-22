import { CirclePlus } from 'lucide-react'
import LogoUfop from '../assets/ufop.png'
import { DialogTrigger } from '@radix-ui/react-dialog'

interface CardBoxProps {
  title: string
  subjects: string[]
  openDialog: (subjects: string[], title: string) => void
}

export function CardBox({ title, subjects, openDialog }: CardBoxProps) {
  function formatCourseTitle(title: string) {
    
    if (title.startsWith('course_')) {
      title = title.replace(/^course_/, '') 
    }
    return title
      .replace(/_/g, ' ') 
      .split(' ') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' ') 
  }
  const formattedCourse = formatCourseTitle(title)
  return (
    <DialogTrigger>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="border-4 border-zinc-500 flex flex-col gap-4 py-4 px-1 items-center justify-center cursor-pointer"
        onClick={() => openDialog(subjects, title)}
      >
        <img src={LogoUfop} alt="hello" className="px-4" />
        <h1 className="text-lg font-bold">{formattedCourse}</h1>
        <button type="button" className="flex gap-4 py-5">
          <CirclePlus size={32} className="cursor-pointer" />
        </button>
      </div>
    </DialogTrigger>
  )
}
