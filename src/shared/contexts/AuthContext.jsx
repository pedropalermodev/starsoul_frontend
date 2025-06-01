import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { buscarUsuarioLogado , loginUsuario, atualizarUsuario  } from '../../api/login.api';


export const AuthContext = createContext({
    isAuthenticated: false,
    userRole: null,
    token: null,
    userData: null,
    globalLoading: true,
    login: (email, password) => {},
    logout: () => {},
    updateUser: (userData) => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken') || null); // Tenta pegar o token do localStorage
    const [globalLoading, setGlobalLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    if (decodedToken.exp * 1000 < Date.now()) {
                        logout();
                    } else {
                        setUserRole(decodedToken.role);
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error("Erro ao decodificar o token:", error);
                    localStorage.removeItem('authToken');
                    setToken(null);
                    setIsAuthenticated(false);
                    setUserRole(null);
                    logout();
                }
            }
            setGlobalLoading(false);
        };

        checkAuthStatus();
    }, [token]);

    
    useEffect(() => {
        let interval;
        if (token) {
            interval = setInterval(() => {
                try {
                    const decodedToken = jwtDecode(token);
                    if (decodedToken.exp * 1000 < Date.now()) {
                        logout();
                        toast.warn("Sua sessão expirou. Faça login novamente.");
                    }
                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                    logout();
                }
            }, 5000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [token]);


    useEffect(() => {
        const fetchUserData = async () => {
            setGlobalLoading(true);
            try {
                if (token) {
                    const user = await buscarUsuarioLogado(token);
                    const decodedToken = jwtDecode(token);
                    
                    setUserData(user);
                    setUserRole(decodedToken.role || user.tipoConta);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    toast.warn('Sessão expirada. Faça login novamente.');
                    logout();
                } else if (error.response?.status === 404) {
                    toast.error('Usuário não encontrado no sistema.');
                    logout();
                } else {
                    toast.error('Erro de conexão com o servidor');
                    console.error('Erro detalhado:', error);
                    logout();
                }
            } finally {
                setGlobalLoading(false);
            }
        };
    
        if (token && isAuthenticated) {
            fetchUserData();
        } else {
            setGlobalLoading(false);
        }
    }, [token, isAuthenticated]);
    

    const login = async (email, password) => {
        try {
            const data = await loginUsuario(email, password);
            const newToken = data.token;
            setToken(newToken);
            localStorage.setItem('authToken', newToken);
            const decodedToken = jwtDecode(newToken);
            setUserRole(decodedToken.role);
            setIsAuthenticated(true);
            navigate(decodedToken.role === 'Administrador' ? '/console/dashboard' : '/app/home');
        } catch (error) {
            // console.error('Erro ao comunicar com o servidor:', error);
            setIsAuthenticated(false);
            setUserRole(null);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('authToken');
        navigate('/sign-in');
    };


    const updateUser = async (userDataToUpdate) => {
        setUpdateLoading(true);
        try {
            if (!token) {
                toast.error('Não autenticado.');
                return false;
            }
            const updatedUser = await atualizarUsuario(token, userDataToUpdate);
            setUserData(updatedUser);
            toast.success('Perfil atualizado com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao atualizar o perfil:', error);
            toast.error('Erro ao atualizar o perfil.');
            return false;
        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, token, userData, globalLoading, login, logout, updateUser, updateLoading }}>
            {children}
        </AuthContext.Provider>
    );
};