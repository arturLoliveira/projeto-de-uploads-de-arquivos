
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from './SideBar';
import { Separator } from './ui/separator';

export function CoursePage() {
    const { subject } = useParams<{ subject: string }>();
    const [files, setFiles] = useState<File[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const uploadedFiles = Array.from(event.target.files);
            setFiles(uploadedFiles);
        }
    };

    return (
        <div className='flex '>
            <Sidebar />
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4 py-2 px-4'>
                    <h1 className="text-2xl font-bold">Matéria: {subject}</h1>
                    <p>Envie arquivos referentes à matéria de {subject}:</p>
                </div>
                <Separator />
                <div className='mx-5 flex flex-col gap-6 flex-wrap'>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="mt-4"
                    />
                    <h2 className="text-xl font-semibold">Arquivos Enviados:</h2>
                    <ul className="mt-2">
                        {files.map((file, index) => (
                            <li key={index} className="text-zinc-800">{file.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        // <div className="p-4">
        //    

        //     

        //     <div className="mt-6">
        //         <h2 className="text-xl font-semibold">Arquivos Enviados:</h2>
        //         <ul className="mt-2">
        //             {files.map((file, index) => (
        //                 <li key={index} className="text-blue-500">{file.name}</li>
        //             ))}
        //         </ul>
        //     </div>
        // </div>
    );
}
