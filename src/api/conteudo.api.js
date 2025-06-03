import axios from "axios";

const API_BASE_URL = 'https://starsoul-backend.onrender.com/api'

// POST
export const cadastrarConteudo = async (newContent, token) => {
    try {
        // console.log('Dados para criar conteúdo: ', newContent);
        const response = await axios.post(`${API_BASE_URL}/conteudos`, newContent, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log('Conteúdo criado com sucesso: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar conteúdo: ', error)
        throw error;
    }
};

// PUT
export const atualizarConteudo = async (contentId, updatedContentData, token) => {
    try {
        // console.log(`Dados para atualizar conteúdo com ID ${contentId}: `, updatedContentData);
        const response = await axios.put(`${API_BASE_URL}/conteudos/${contentId}`, updatedContentData, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log(`Conteúdo com ID ${contentId} atualizado com sucesso: `, response.data)
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar conteúdo com ID ${contentId}: `, error)
        throw error;
    }
};

// FindAll
export const listarTodosConteudos = async () => {
    try {
        // console.log('Tentando buscar conteúdos...');
        const response = await axios.get(`${API_BASE_URL}/conteudos/findAll`);
        // console.log('Lista de Conteudos: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar conteúdos: ', error);
        throw error;
    }
}

// FindById
export const buscarConteudoPorId = async (contentId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/conteudos/${contentId}` , {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log(`Conteúdo com ID ${contentId}: `, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar conteúdo com ID ${contentId}: `, error);
        throw error;
    }
}

// Delete
export const excluirConteudo = async (contentId, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/conteudos/${contentId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
            },
        });
        // console.log(`Conteúdo com ID ${contentId} deletado com sucesso: `, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar conteúdo com ID ${contentId}: `, error);
        throw error;
    }
};