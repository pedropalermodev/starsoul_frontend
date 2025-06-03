import axios from 'axios';

const API_BASE_URL = 'https://starsoul-backend.onrender.com/api/password-reset';

// POST
export const solicitarResetSenha = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot`, { email });
        return response.data;
    } catch (error) {
        console.error('Erro ao solicitar reset de senha: ', error);
        throw error;
    }
};

// POST
export const redefinirSenha = async (email, token, newPassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reset`, { email, token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Erro ao redefinir senha: ', error);
        throw error;
    }
};
