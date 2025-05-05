import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './shared/contexts/AuthContext';
import { ContentProvider } from './shared/contexts/ContentContext';
import { ToastContainer } from 'react-toastify';
import './styles/globalStyles.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';

import GuestApp from './views/guest/GuestApp';
import UserApp from './views/user/UserApp';
import AdminApp from './views/admin/AdminApp';

// Component
import LoadingPage from './shared/components/LoadingPage'

// Página de Login/Cadastro
import SignIn from './views/guest/pages/SignIn';
import SignUp from './views/guest/pages/SignUp';
import ResetPassword from './views/guest/pages/ResetPassword';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ContentProvider>
                    <AppRoutes />
                    <ToastContainer className="toast-container-custom" position="top-center" />
                </ ContentProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

function AppRoutes() {
    const { isAuthenticated, userRole, globalLoading } = useContext(AuthContext);

    if (globalLoading) {
        return <LoadingPage />;
    }

    return (
        <Routes>

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
                path="/*"
                element={
                    !isAuthenticated ? (
                        <GuestApp />
                    ) : userRole === 'Administrador' ? (
                        <Navigate to="/console" replace />
                    ) : userRole === 'Usuário' ? (
                        <Navigate to="/app" replace />
                    ) : (
                        <Navigate to="/sign-in" replace />
                    )
                }
            />


            <Route
                path="/console/*"
                element={
                    isAuthenticated && userRole === 'Administrador' ? (
                        <AdminApp />
                    ) : (
                        <Navigate to="/sign-in" replace />
                    )
                }
            />


            <Route
                path="/app/*"
                element={
                    isAuthenticated && userRole === 'Usuário' ? (
                        <UserApp />
                    ) : (
                        <Navigate to="/sign-in" replace />
                    )
                }
            />

        </Routes>
    );
}

export default App;