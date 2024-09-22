import  { useState } from 'react';

interface CreateSubjectProps {
  courseId: string;  // O ID do curso ao qual a matéria será associada
  onSubjectCreated: (subjectId: string) => void;  // Função de callback após a matéria ser criada
}

export const CreateSubject: React.FC<CreateSubjectProps> = ({ courseId, onSubjectCreated }) => {
  const [subjectName, setSubjectName] = useState('');
  const [message, setMessage] = useState('');



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subjectName) {
      setMessage('O nome da matéria é obrigatório.');
      return;
    }

    // Dados a serem enviados ao backend
    const subjectData = {
      name: subjectName,
    };

    try {
      // Envia a requisição POST para o backend
      const response = await fetch(`http://localhost:3001/courses/${courseId}/subjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar matéria.');
      }

      const result = await response.json();
      setMessage(`Matéria "${result.subjectId}" criada com sucesso!`);
      onSubjectCreated(result.subjectId);  // Chama o callback para notificar que a matéria foi criada
      setSubjectName('');  // Limpa o campo de entrada após o sucesso
    } catch (error) {
      setMessage('Erro ao criar matéria.');
    }
  };

  return (
    <div>
      <h2>Adicionar Matéria ao Curso</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subjectName">Nome da Matéria:</label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Matéria</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
