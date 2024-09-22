const API_URL = 'http://localhost:3001';

// Função para adicionar um curso
export const addCourse = async (course: { name: string, description: string }) => {
  const response = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });
  return await response.json();
};

// Função para obter todos os cursos
export const getCourses = async () => {
  const response = await fetch(`${API_URL}/courses`);
  return await response.json();
};

// Função para adicionar uma matéria a um curso
export const addSubjectToCourse = async (courseId: string, subjectName: string) => {
  const response = await fetch(`${API_URL}/courses/${courseId}/subjects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: subjectName }),
  });
  return await response.json();
};

// Função para subir um arquivo para uma matéria
export const addFileToSubject = async (subjectId: string, file: any) => {
  const response = await fetch(`${API_URL}/subjects/${subjectId}/files`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(file), // Assumindo que o 'file' é um objeto com metadados
  });
  return await response.json();
};
