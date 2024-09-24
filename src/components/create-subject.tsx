import { useState } from 'react'
import { Sidebar } from './SideBar'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'


export const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState('')
  const [message, setMessage] = useState('')
  
  const course = useParams();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!subjectName) {
      setMessage('O nome da matéria é obrigatório.')
      return
    }

    const subjectData = {
      name: subjectName,
    }

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(
        `http://localhost:3001/courses/${course.courseId}/subjects`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify(subjectData),
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao criar matéria.')
      }

      const result = await response.json()
      setMessage(`Matéria "${result.subjectId}" criada com sucesso!`)
      setSubjectName('') 
    } catch (error) {
      setMessage('Erro ao criar matéria.')
    }
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className=' flex flex-col gap-4 px-4 py-4'>
        <h1 className='font-bold text-2xl py-3'>Adicionar Matéria ao Curso</h1>
        <Separator />
        <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <label htmlFor="subjectName" className='font-semibold'>Nome da Matéria:</label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={e => setSubjectName(e.target.value)}
              required
              className='border-4 border-zinc-600 outline-none'
            />
          </div>
          <Button  type="submit">Criar Matéria</Button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}
