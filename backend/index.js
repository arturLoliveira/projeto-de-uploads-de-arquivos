const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nano = require('nano')('http://admin:password@localhost:5984'); // Conexão com o CouchDB

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Seleciona o banco de dados do CouchDB
const coursesDB = nano.db.use('courses');

// Cria uma rota para adicionar um curso
app.post('/courses', async (req, res) => {
  try {
    const { name, description } = req.body;
    const response = await coursesDB.insert({
      _id: `course_${name.toLowerCase().replace(/\s/g, '_')}`,
      type: 'course',
      name,
      description,
      subjects: []
    });
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para listar todos os cursos
app.get('/courses', async (req, res) => {
  try {
    const result = await coursesDB.view('courses', 'by_name', { include_docs: true });
    const courses = result.rows.map(row => row.doc);
    res.send(courses);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para adicionar uma matéria a um curso
app.post('/courses/:courseId/subjects', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name } = req.body;

    const course = await coursesDB.get(courseId);
    course.subjects.push({
      subject_id: `subject_${name.toLowerCase().replace(/\s/g, '_')}`,
      name
    });

    const response = await coursesDB.insert(course);
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para subir arquivos em uma matéria
app.post('/subjects/:subjectId/files', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const file = req.body; // Assumindo que você está recebendo metadados do arquivo

    const subject = await coursesDB.get(subjectId);
    subject.files = subject.files || [];
    subject.files.push({
      file_id: `file_${new Date().getTime()}`,
      name: file.name,
      size: file.size,
      upload_date: new Date().toISOString()
    });

    const response = await coursesDB.insert(subject);
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Inicializa o servidor na porta 3001
app.listen(3001, () => {
  console.log('Servidor backend rodando na porta 3001');
});
