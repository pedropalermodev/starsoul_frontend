import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

// POST
export const solicitarResetSenha = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error('Erro ao solicitar reset de senha: ', error);
        throw error;
    }
};

// POST
export const redefinirSenha = async (email, token, newPassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reset-password`, { email, token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Erro ao redefinir senha: ', error);
        throw error;
    }
};
