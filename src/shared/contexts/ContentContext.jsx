import React, { createContext, useState, useEffect } from 'react';
import { listarTodosConteudos } from '../../api/conteudo.api'

export const ContentContext = createContext({

});

export const ContentProvider = ({ children }) => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredContents, setFilteredContents] = useState([]);
    const [filters, setFilters] = useState({
        tags: [],
        categorias: [],
        tipoConteudo: '',
    });

    const fetchContents = async () => {
        setLoading(true);
        try {
            const data = await listarTodosConteudos();
            const conteudosAtivos = data.filter(content => content.codStatus === 'Ativo');
            setContents(conteudosAtivos);
        } catch (err) {
            console.error("Erro ao carregar conteúdos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const aplicarFiltros = () => {
            let filtrados = [...contents];

            if (filters.tags.length > 0) {
                filtrados = filtrados.filter(content =>
                    content.tags?.some(tag => filters.tags.includes(tag))
                );
            }

            if (filters.categorias.length > 0) {
                filtrados = filtrados.filter(content =>
                    content.categorias?.some(cat => filters.categorias.includes(cat))
                );
            }

            if (filters.tipoConteudo) {
                filtrados = filtrados.filter(content => content.tipoConteudo === filters.tipoConteudo);
            }

            setFilteredContents(filtrados);
        };

        aplicarFiltros();
    }, [filters, contents]);

    useEffect(() => {
        fetchContents();
    }, []);

    return (
        <ContentContext.Provider value={{
            contents,
            filteredContents,
            filters,
            setFilters,
            fetchContents,
            loading,
        }}>
            {children}
        </ContentContext.Provider>
    );
};