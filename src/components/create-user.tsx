import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
        <div className='flex flex-col bg-zinc-800 h-screen items-center justify-center gap-6'>
            <h2 className='text-white font-extrabold text-3xl'>Criar Usuário no Curso</h2>
            <form onSubmit={handleSubmit} className='border-4 border-zinc-600 px-6 py-6'>
                <div className='flex flex-col gap-3 items-center justify-center'>
                <div className='flex gap-3 items-center'>
                    <label className="text-white" htmlFor="name">Nome:</label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='flex gap-3 items-center'>
                    <label className="text-white" htmlFor="course">Curso:</label>
                    <select
                        id="course"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        required
                        className='px-4 h-12 bg-black text-white border border-zinc-900 rounded-lg placeholder-zinc-400 outline-none text-sm  focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10'
                        >
                        <option value="">Selecione um curso</option>
                        <option value="course_sistemas_de_informação">Sistemas de Informação</option>
                        <option value="course_engenharia_de_computacao">Engenharia de computação</option>
                        <option value="course_engenharia_eletrica">Engenharia Eletrica</option>
                        <option value="course_engenharia_de_producao">Engenharia de Produção</option>
                        
                    </select>
                </div>
                <div className='flex gap-3 items-center'>
                    <label className="text-white" htmlFor="email">Email:</label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='flex gap-3 items-center'>
                    <label className="text-white" htmlFor="password">Senha:</label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <Button className='text-white' type="submit">Criar Usuário</Button>
                </div>
            </form>
            
            {message && <p>{message}</p>}
        </div>
    );
};
