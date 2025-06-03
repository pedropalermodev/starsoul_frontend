import axios from "axios";

const API_BASE_URL = 'https://starsoul-backend.onrender.com/api'

// POST
export const cadastrarTag = async (newTag, token) => {
    try {
        // console.log('Dados para criar tag: ', newTag);
        const response = await axios.post(`${API_BASE_URL}/tags`, newTag, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log('Tag criado com sucesso: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar tag: ', error)
        throw error;
    }
};

// PUT
export const atualizarTag = async (tagId, updatedTagData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/tags/${tagId}`, updatedTagData, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log(`Tag com ID ${tagId} atualizado com sucesso: `, response.data)
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar tag com ID ${tagId}: `, error)
        throw error;
    }
};

// FindAll
export const listarTodasTags = async (token) => {
    try {
        // console.log('Tentando buscar tags...');
        const response = await axios.get(`${API_BASE_URL}/tags/findAll`, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log('Lista de Tags: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tags: ', error);
        throw error;
    }
}

// FindById
export const buscarTagPorId = async (tagId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tags/${tagId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log(`Tag com ID ${tagId}: `, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar tag com ID ${tagId}: `, error);
        throw error;
    }
}

// Delete
export const excluirTag = async (tagId, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/tags/${tagId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log(`Tag com ID ${tagId} deletado com sucesso: `, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar tag com ID ${tagId}: `, error);
        throw error;
    }
};