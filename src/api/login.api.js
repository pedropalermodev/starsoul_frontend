import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api'


// Função de login
export const loginUsuario = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        // console.error('Erro ao fazer login: ', error);
        throw error;
    }
};

// POST
export const usuarioCadastrar = async (newUser) => {
    try {
        // console.log('Dados para cadastrar usuário: ', newUser);
        const response = await axios.post(`${API_BASE_URL}/usuarios/cadastrar`, newUser);
        // console.log('Usuário cadastrado com sucesso: ', response.data);
        return response.data;
    } catch (error) {
        // console.error('Erro ao se cadastrar: ', error);
        throw error;
    }
};

// GET - Buscar o usuário logado
export const buscarUsuarioLogado = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/usuarios/me`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Erros 4xx/5xx
            console.error('Erro na resposta:', error.response.status, error.response.data);
            throw error.response.data;
        } else if (error.request) {
            // Sem resposta do servidor
            console.error('Sem resposta:', error.request);
            throw new Error('Sem resposta do servidor');
        } else {
            // Outros erros
            console.error('Erro na configuração:', error.message);
            throw error;
        }
    }
};

// PUT - Atualizar os dados do usuário
export const atualizarUsuario = async (token, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/usuarios/me`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        throw error;
    }
};