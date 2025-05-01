import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api'

// POST
export const cadastrarUsuario = async (newUser, token) => {
    try {
        // console.log('Dados para cadastrar usuário: ', newUser);
            const response = await axios.post(`${API_BASE_URL}/usuarios/criar/cadastro`, newUser, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
                },
            });
        // console.log('Usuário cadastrado com sucesso: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário: ', error);
        throw error;
    }
};


// PUT
export const atualizarUsuario = async (userId, updatedUserData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/usuarios/${userId}`, updatedUserData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
        // console.log(`Usuário com ID ${userId} atualizado com sucesso: `, response.data)
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${userId}: `, error)
        throw error;
    }
};

// FindAll
export const listarTodosUsuarios = async (token) => {
    console.log("Token recebido por listarTodosUsuarios:", token);
    try {
        // console.log('Tentando buscar usuários...');
        const response = await axios.get(`${API_BASE_URL}/usuarios/findAll`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log('Lista de Usuários: ', response.data);
        console.log("Resposta da API (listarTodosUsuarios):", response);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários: ', error);
        throw error;
    }
}

// FindById
export const buscarUsuarioPorId = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/usuarios/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(`Usuário com ID ${userId}: `, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${userId}: `, error);
        throw error;
    }
}

// Delete
export const excluirUsuario = async (userId, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/usuarios/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(`Usuário com ID ${userId} deletado com sucesso: `, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar usuário com ID ${userId}: `, error);
        throw error;
    }
};