import axios from "axios";

const API_BASE_URL = 'https://starsoul-backend.onrender.com/api'

// POST
export const cadastrarCategoria = async (newCategory, token) => {
    try {
        // console.log('Dados para cirar categoria: ', newCategory);
        const response = await axios.post(`${API_BASE_URL}/categorias`, newCategory, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log('Categoria criado com sucesso: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar categoria: ', error)
        throw error;
    }
};

// PUT
export const atualizarCategoria = async (categoryId, updatedCategoryData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/categorias/${categoryId}`, updatedCategoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
        // console.log(`Categoria com ID ${categoryId} atualizado com sucesso: `, response.data);
    } catch (error) {
        console.error(`Erro ao atualizar categoria com ID ${categoryId}: `, error)
        throw error;
    }
};

// FindAll
export const listarTodasCategorias = async (token) => {
    try {
        // console.log('Tentando buscar categorias...');
        const response = await axios.get(`${API_BASE_URL}/categorias/findAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },    
        });
        // console.log('Lista de Categorias: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar categorias: ', error);
        throw error;
    }
}

// FindById
export const buscarCategoriaPorId = async (categoryId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categorias/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, 
        });
        // console.log(`Categoria com ID ${categoryId}: `, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar categoria com ID ${categoryId}: `, error);
        throw error;
    }
}

// Delete
export const excluirCategoria = async (categoryId, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/categorias/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, 
        });
        // console.log(`Categoria com ID ${categoryId} deletado com sucesso: `, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar categoria com ID ${categoryId}: `, error);
        throw error;
    }
};