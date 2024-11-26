import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateLogin } from './components/create-login';
import { AuthProvider } from './services/AuthServices';
import ProtectedRoute from './services/ProtectedRoute';
import { CoursePage } from './components/course-page';
import { CreateSubject } from './components/create-subject';
import { CreateUser } from './components/create-user';
import { Summary } from './components/summary'; 
import { NotAutorization } from './components/not-autorization';
import RecoverPassword from './components/reset-password';
import { RequestRecoverPassword } from './components/recover-password';
import { FolderPageList } from './components/folder-page-list';

export function Routers() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateLogin />} />
          <Route path="/admin" element={<NotAutorization />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/reset-password/:token" element={<RequestRecoverPassword />} />  
          <Route 
            path="/app" 
            element={
              <ProtectedRoute requiredRole='user'>
                <Summary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:subjectId" 
            element={
              <ProtectedRoute requiredRole="user">
                <CoursePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/subject/:folderId" 
            element={
              <ProtectedRoute requiredRole="user">
                <FolderPageList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-course/:courseId" 
            element={
              <ProtectedRoute requiredRole="admin">
                <CreateSubject />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/create-user" 
            element={
                <CreateUser />
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
