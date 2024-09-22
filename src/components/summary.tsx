import { Dialog } from "@radix-ui/react-dialog";
import { CardBox } from "./card-box";
import { Separator } from "./ui/separator";
import { OpenCourse } from "./open-course";
import { useState } from "react";
import { Sidebar } from "./SideBar";

export function Summary() {
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    const openDialogWithSubjects = (subjects: string[], courseTitle: string) => {
        setSelectedSubjects(subjects); 
        setSelectedCourse(courseTitle); 
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col gap-6">
                <div className="flex px-4 py-2">
                    <h1 className="text-3xl font-bold">Cursos da UFOP</h1>
                </div>
                <Separator />
                <div className="mx-5 py-6 flex items-center justify-center gap-28 flex-wrap">
                    <CardBox title="course_sistemas_de_informação" subjects={['subject_redes_1', 'ftc', 'eng software', 'prog 1']} openDialog={openDialogWithSubjects} />
                    <CardBox title="course_engenharia_de_computacao" subjects={['fisica', 'compiladores']} openDialog={openDialogWithSubjects} />
                    <CardBox title="course_engenharia_eletrica" subjects={['oac', 'circuitos']} openDialog={openDialogWithSubjects} />
                    <CardBox title="course_engenharia_de_producao" subjects={['custos', 'calculo']} openDialog={openDialogWithSubjects} />

                    <Dialog open={selectedSubjects.length > 0} onOpenChange={(isOpen) => !isOpen && setSelectedSubjects([])}>
                        <OpenCourse subjects={selectedSubjects} course={selectedCourse} />
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

