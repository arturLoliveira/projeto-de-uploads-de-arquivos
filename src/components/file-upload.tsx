import { useState } from 'react'

interface FileUploadProps {
  subjectId: string
}


export const FileUpload: React.FC<FileUploadProps> = ({ subjectId }) => {
 
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file) // Nome do campo que o backend espera

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
      setFile(null) // Limpa o estado do arquivo após o upload
    } catch (error) {
      setMessage('Erro ao enviar arquivo.')
    }
  }

  return (
    <div className="flex flex-col gap-5 space-x-4">
      <h1 className='font-bold'>Envie seu arquvio referente a matéria</h1>
      <form onSubmit={handleSubmit}>
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
        <button type='submit' className='mx-4'>Enviar arquivo</button>
      </form>
      {message && <span className='text-gray-500'>{message}</span>}
    </div>
  )
}
