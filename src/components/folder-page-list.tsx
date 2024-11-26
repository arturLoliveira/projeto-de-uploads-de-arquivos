import { Separator } from "./ui/separator";
import { useParams } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { FolderFileList } from "./get-folder-file";
import { FolderFileUpload } from "./folder-file-upload";

export function FolderPageList() {

    const { folderId } = useParams();
    console.log(folderId)
    
    return(
        <div className="flex">
            <Sidebar />
         
            <div className="flex flex-col gap-4 px-8 py-8">
            <FolderFileUpload folderId={folderId} />
            <Separator />
            <FolderFileList folderId={folderId} />
            </div>
        </div>
    )
}