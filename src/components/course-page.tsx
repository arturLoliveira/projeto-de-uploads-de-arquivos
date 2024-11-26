import { useParams } from 'react-router-dom'
import { FileUpload } from './file-upload'
import { FileList } from './get-file'

import { Sidebar } from './SideBar'
import { Separator } from './ui/separator'
import { FolderPage } from './folder-page'
import { FolderList } from './get-folder'
import { CreateFolder } from './create-folder'

export function CoursePage() {
  const { subjectId } = useParams()

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col gap-4 px-8 py-8">
        <div className='flex gap-4 items-center justify-center'>
          <FileUpload subjectId={subjectId} />
          <Separator />
          <CreateFolder />
          <Separator />
        </div>
        <FolderList subjectId={subjectId} />
        <Separator />
        <FileList subjectId={subjectId} />
      </div>
    </div>
  )
}
