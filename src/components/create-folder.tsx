import { useState } from 'react'
import { Sidebar } from './SideBar'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'


export const CreateFolder = () => {
  const [folderName, setFolderName] = useState('')
  const [message, setMessage] = useState('')
  
  const subject = useParams();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!folderName) {
      setMessage('O nome da matéria é obrigatório.')
      return
    }

    const folderData = {
      name: folderName,
    }

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(
        `http://localhost:3001/courses/${subject.subjectId}/folders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify(folderData),
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao criar matéria.')
      }

      const result = await response.json()
      setMessage(`Matéria "${result.subjectId}" criada com sucesso!`)
      setFolderName('') 
    } catch (error) {
      setMessage('Erro ao criar matéria.')
    }
  }

  return (
    <div className='flex'>
      <div className=' flex flex-col gap-4 px-4 py-4'>
       
        <form onSubmit={handleSubmit} className=' flex gap-4 items-end'>
          <div className='flex flex-col gap-4 '>
            <label htmlFor="subjectName" className='font-semibold'>Nome da Pasta:</label>
            <input
              type="text"
              id="subjectName"
              value={folderName}
              onChange={e => setFolderName(e.target.value)}
              required
              className='border-4 border-zinc-600 outline-none'
            />
          </div>
          <Button className='h-9'  type="submit">Criar Pasta</Button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}
