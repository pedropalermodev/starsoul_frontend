import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/conteudo-usuario';

export const registrarAcesso = async (conteudoId, token) => {
    const response = await axios.post(`${API_BASE_URL}/${conteudoId}/acessar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const favoritarConteudo = async (conteudoId, token) => {
    const response = await axios.post(`${API_BASE_URL}/${conteudoId}/favoritar`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const desfavoritarConteudo = async (conteudoId, token) => {
    const response = await axios.post(`${API_BASE_URL}/${conteudoId}/desfavoritar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const listarFavoritos = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/favoritos`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const listarHistorico = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/historico`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
