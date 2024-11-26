import { Trash2, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { useNavigate } from 'react-router-dom'

interface FileListProps {
  subjectId: string | undefined
}

interface FileMetadata {
  name: string
  folder_id: string
}
dayjs.locale(ptBR)

export const FolderList: React.FC<FileListProps> = ({ subjectId }) => {
  const [folders, setFolders] = useState<FileMetadata[]>([])
  const [message, setMessage] = useState('')


  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/subjects/${subjectId}/folders`
        )
        if (!response.ok) {
          throw new Error('Erro ao recuperar arquivos.')
        }
        const result = await response.json()
        setFolders(result.subjects)
      } catch (error) {
        setMessage('Erro ao recuperar arquivos.')
      }
    }

    fetchFolders()
    const intervalId = setInterval(() => {
      fetchFolders()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [subjectId])

  const navigate = useNavigate()
  const handleClick = (folder: string) => {
    navigate(`/subject/${folder}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-xl">Pastas: </h1>
      <div className="flex  gap-4">
        {folders.map((folder, index) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className="flex flex-row gap-4"
            onClick={() => handleClick(folder)}
          >
            <div className="w-32 h-28 border-4 border-zinc-500 flex justify-center items-center cursor-pointer">
              <h1 className="font-bold break-all px-4 py-3">{folder}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
