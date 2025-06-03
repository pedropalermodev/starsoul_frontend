import axios from "axios";

const API_BASE_URL = 'https://starsoul-backend.onrender.com/api'

// POST
export const enviarFeedback = async (newFeedback) => {
    try {
        // console.log('Dados para enviar o feedback: ', newFeedback);
        const response = await axios.post(`${API_BASE_URL}/feedbacks`, newFeedback);
        // console.log('Feedback enviado com sucesso: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar feedback: ', error)
        throw error;
    }
};


// FindAll
export const listarTodosFeedbacks = async (token) => {
    try {
        // console.log('Tentando buscar feedbacks...');
        const response = await axios.get(`${API_BASE_URL}/feedbacks/findAll`, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log('Lista de feedbacks: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar feedbacks: ', error);
        throw error;
    }
}