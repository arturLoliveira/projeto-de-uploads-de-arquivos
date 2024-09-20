import { Dialog } from "@radix-ui/react-dialog";
import { CardBox } from "./card-box";
import { Separator } from "./ui/separator";
import { OpenCourse } from "./open-course";
import { useState } from "react";
import { Sidebar } from "./SideBar";

export function Summary() {
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);


    const openDialogWithSubjects = (subjects: string[]) => {
        setSelectedSubjects(subjects); 
    };
    return (
        <div className="flex">
            <Sidebar />
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