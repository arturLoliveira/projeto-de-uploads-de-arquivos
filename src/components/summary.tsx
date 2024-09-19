import { Dialog } from "@radix-ui/react-dialog";
import { CardBox } from "./card-box";
import { InOrbitIcon } from "./in-orbit-icon";
import { Separator } from "./ui/separator";
import { CircleUser, LayoutDashboard, CircleHelp } from 'lucide-react'
import { OpenCourse } from "./open-course";
import { useState } from "react";

export function Summary() {
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);


    const openDialogWithSubjects = (subjects: string[]) => {
        setSelectedSubjects(subjects); // Define as matérias para o curso selecionado
    };
    return (
        <div className="flex flex-row">
            <div className="flex flex-col items-center gap-16 bg-zinc-500 h-screen px-6 py-2">
                <InOrbitIcon />

                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <CircleUser />
                    <span>User</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center cursor-pointer">
                    <CircleHelp />
                    <span>Help</span>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex px-4 py-2">
                    <h1 className="text-3xl font-bold">Cursos da UFOP</h1>
                </div>
                <Separator />
                <div className="mx-5 flex items-center justify-center gap-28 flex-wrap">


                    <CardBox title="Sistemas de Informação" subjects={['bd2', 'ftc', 'eng software', 'prog 1']} openDialog={openDialogWithSubjects} />
                    <CardBox title="Engenharia de computação" subjects={['prog1', 'fisica', 'compiladores', 'gaal']} openDialog={openDialogWithSubjects} />
                    <CardBox title="Engenharia Eletrica" subjects={['oac', 'quimica', 'circuitos']} openDialog={openDialogWithSubjects} />
                    <CardBox title="Engenharia de Produção" subjects={['custos', 'calculo', 'pli']} openDialog={openDialogWithSubjects} />

                    <Dialog open={selectedSubjects.length > 0} onOpenChange={(isOpen) => !isOpen && setSelectedSubjects([])}>
                        <OpenCourse subjects={selectedSubjects} />
                    </Dialog>
                </div>
            </div>
        </div>
    )
}