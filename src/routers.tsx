import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Summary } from './components/summary';
import { CreateLogin } from './components/create-login';
import { AuthProvider } from './services/AuthServices';
import ProtectedRoute from './services/ProtectedRoute';
import { CoursePage } from './components/course-page';
import { CreateSubject } from './components/create-subject';
import { CreateUser } from './components/create-user';


export function Routers() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CreateLogin />} />
                    {/* <Route
                        path="/app/:id"
                        element={
                            <ProtectedRoute>
                                <Summary />
                            </ProtectedRoute>
                        }
                    /> */}
                    <Route path="/app" element={<Summary />} />
                    <Route path="/course/:subjectId" element={<CoursePage />} />   
                    <Route path="/create-course/:courseId" element={<CreateSubject />} />                  
                    <Route path="/course/create-user" element={<CreateUser />} />
                    
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
