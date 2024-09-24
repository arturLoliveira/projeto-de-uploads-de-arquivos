import { useState } from 'react'
import { Button } from './ui/button'

interface FileUploadProps {
  subjectId: string | undefined
}

export const FileUpload: React.FC<FileUploadProps> = ({ subjectId }) => {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [message, setMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name) 
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(
        `http://localhost:3001/subjects/${subjectId}/files`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao enviar arquivo.')
      }

      const result = await response.json()
      setMessage(result.message)
      setFile(null) 
      setFileName('') 
    } catch (error) {
      setMessage('Erro ao enviar arquivo.')
    }
  }

  return (
    <div className="flex flex-col gap-5 space-x-4">
      <h1 className='font-bold'>Envie seu arquivo referente à matéria</h1>
      <form onSubmit={handleSubmit} className='flex gap-4'>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transition"
        >
          Escolher arquivo
        </label>

        <Button variant='secondary' type='submit' className='mx-4'>
          Enviar arquivo
        </Button>
      </form>
    
      {fileName && <span className='text-gray-500'>Arquivo selecionado: {fileName}</span>}

      {message && <span className='text-gray-500'>{message}</span>}
    </div>
  )
}
