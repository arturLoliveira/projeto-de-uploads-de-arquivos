import { useParams } from "react-router-dom";
import { FileUpload } from "./file-upload";
import { FileList } from "./get-file"

import { Sidebar } from "./SideBar";
import { Separator } from "./ui/separator";


export function CoursePage() {

  const { subjectId } = useParams();
   
    return(
        <div className="flex">
            <Sidebar />
         
            <div className="flex flex-col gap-4 px-8 py-8">
            <FileUpload subjectId={subjectId} />
            <Separator />
            <FileList subjectId={subjectId} />
            </div>
        </div>
        
    )
}
