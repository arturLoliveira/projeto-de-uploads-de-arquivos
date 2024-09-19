import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Summary } from './components/summary';
import { CreateLogin } from './components/create-login';
import { AuthProvider } from './services/AuthServices';
import ProtectedRoute from './services/ProtectedRoute';

export function Routers() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CreateLogin />} />
                    <Route
                        path="/app/:id"
                        element={
                            <ProtectedRoute>
                                <Summary />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
