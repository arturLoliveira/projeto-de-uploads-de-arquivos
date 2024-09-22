import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateUser = () => {
    const [courseId, setCourseId] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = { name, email, password };

        try {
            const response = await fetch(`http://localhost:3001/courses/${courseId}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar usuário.');
            }

            const result = await response.json();
            setMessage(`Usuário ${result.name} criado com sucesso!`);
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage('Erro ao criar usuário.');
        }
        navigate('/app')
    };

    return (
        <div>
            <h2>Criar Usuário no Curso</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="course">Curso:</label>
                    <select
                        id="course"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        required
                    >
                        <option value="">Selecione um curso</option>
                        <option value="course_sistemas_de_informação">Sistemas de Informação</option>
                        <option value="course_engenharia_de_computacao">Engenharia de computação</option>
                        <option value="course_engenharia_eletrica">Engenharia Eletrica</option>
                        <option value="course_engenharia_de_producao">Engenharia de Produção</option>
                        
                    </select>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Criar Usuário</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
