import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'

interface FileListProps {
  subjectId: string
}

interface FileMetadata {
  file_id: string
  name: string
  original_name: string
  size: number
  type: string
  upload_date: string
  url: string // URL do arquivo gerado pelo backend
}
dayjs.locale(ptBR)

export const FileList: React.FC<FileListProps> = ({ subjectId }) => {
  const [files, setFiles] = useState<FileMetadata[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Função para buscar os arquivos associados à matéria
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/subjects/${subjectId}/files`
        )
        console.log(response)
        if (!response.ok) {
          throw new Error('Erro ao recuperar arquivos.')
        }
        const result = await response.json()
        setFiles(result.files)
      } catch (error) {
        setMessage('Erro ao recuperar arquivos.')
      }
    }

    fetchFiles()
  }, [subjectId])

  return (
    <div>
      <h2 className='font-bold py-5'>Arquivos da Matéria:</h2>
      {message && <p>{message}</p>}
      <div className='flex flex-wrap gap-3'>
      {files.map(file => (
        <div key={file.file_id} className=" flex flex-col border-4 border-zinc-700 gap-2 px-3 py-4">
            <h1 className='font-bold'>Nome do Arquivo</h1>
            <span>{file.original_name}</span>
            <h1 className='font-bold'>Data de envio</h1>
            <span>{file.upload_date}</span>
            <a href={file.url} target="_blank" rel="noopener noreferrer" className='font-bold'>Download</a>
          </div>
      ))}
      </div>
      </div>

  )
}
