import './styles.scss';
import { cadastrarConteudo, atualizarConteudo, listarTodosConteudos, buscarConteudoPorId, excluirConteudo } from '../../../../api/content.api'
import { listarTodasCategorias } from '../../../../api/category.api';
import { listarTodasTags } from '../../../../api/tag.api';
import GenericPageManager from '../../components/GenericPageManager';
import GenericList from '../../components/GenericPageManager/components/GenericList';
import GenericForm from '../../components/GenericPageManager/components/GenericForm';
import GenericActionButtons from '../../components/GenericPageManager/components/GenericActionButtons';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { AuthContext } from '../../../../shared/contexts/AuthContext';

const contentColumns = [
    { key: 'id', label: 'ID' },
    { key: 'titulo', label: 'Titulo' },
    { key: 'descricao', label: 'Descricao' },
    {
        key: 'tipoConteudo',
        label: 'Modelo',
        cellStyle: { padding: 0 },
        render: (content) => (
            <div className='badge-container'>
                <span className="badge badge-modelo">
                    {content.tipoConteudo}
                </span>
            </div>
        ),
    },
    {
        key: 'codStatus',
        label: 'Status',
        cellStyle: { padding: '10px' },
        render: (content) => <span className='badge-container'><p className={`badge ${content.codStatus === 'Ativo' ? 'status-ativo' : (content.codStatus === 'Inativo' ? 'status-inativo' : (content.codStatus === 'Suspenso' ? 'status-suspenso' : undefined))}`}>{content.codStatus}</p></span>,
    },
    {
        key: 'dataPublicacao',
        label: 'Publicado em:',
        render: (item) => {
            const data = new Date(item.dataPublicacao);
            return format(data, 'dd/MM/yyyy HH:mm');
        },
    },
    {
        key: 'categorias',
        label: 'Categorias',
        cellStyle: { padding: '10px' },
        render: (content) => (
            <div className="badge-container">
                {content.categorias?.map((categoria, index) => (
                    <span key={index} className="badge badge-categoria">
                        {categoria}
                    </span>
                ))}
            </div>
        ),
    },
    {
        key: 'tags',
        label: 'Tags',
        cellStyle: { padding: '10px' },
        render: (content) => (
            <div className="badge-container">
                {content.tags?.map((tag, index) => (
                    <span key={index} className="badge badge-tag">
                        {tag}
                    </span>
                ))}
            </div>
        ),
    },


    {
        key: 'actions',
        label: 'Ações',
        render: (user, onEdit, onDelete) => (
            <GenericActionButtons
                item={user}
                onEdit={() => onEdit(user)}
                onDelete={() => {onDelete(user.id);}}
            />
        ),
    }
];

const contentPages = [
    {
        view: 'add',
        label: 'Adicionar novo conteúdo',
        className: 'generic__bar-button generic__bar-button--add',
        iconClass: 'bi bi-database-add'
    },
    // {
    //     view: 'edit',
    //     className: 'generic__bar-button generic__bar-button--edit',
    //     iconClass: 'bi bi-pencil-square'
    // }
];

const getcontentFormFields = (categorias, tags) => [
    { name: 'titulo', label: 'Titulo', type: 'text', required: true },
    {
        name: 'tipoConteudo',
        label: 'Modelo',
        type: 'select',
        required: true,
        options: [
            { value: 'Audio', label: 'Audio' },
            { value: 'Video', label: 'Video' },
            { value: 'Texto', label: 'Texto' },
        ],
    },
    {
        name: 'categoriaIds',
        label: 'Categoria',
        type: 'select',
        required: true,
        multiple: true,
        options: categorias.map(cat => ({
            value: cat.id,
            label: cat.nome
        })),
    },
    {
        name: 'tagIds',
        label: 'Tag',
        type: 'select',
        required: true,
        multiple: true,
        options: tags.map(cat => ({
            value: cat.id,
            label: cat.nome
        })),
    },
    {
        name: 'codStatus',
        label: 'Status',
        required: true,
        type: 'select',
        options: [
            { value: 'Ativo', label: 'Ativo' },
            { value: 'Suspenso', label: 'Suspenso' },
            { value: 'Inativo', label: 'Inativo' }
        ],
    },
    { name: 'arquivoUrl', label: 'Adicione a URL para o conteúdo', type: 'text', required: true },
    { name: 'descricao', label: 'Descricao', type: 'text', required: false },
    { name: 'caminhoMiniatura', label: 'Caminho para miniatura', type: 'text', required: false },
];


function ContentManagement() {
    const { token, globalLoading } = useContext(AuthContext);
    const [contents, setContents] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentView, setCurrentView] = useState('list');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);

    const fetchData = useCallback(async () => {
        if (!globalLoading && token) {
            setLoading(true);
            setError(null);
            try {
                const [conteudos, categoriasResult, tagsResult] = await Promise.all([
                    listarTodosConteudos(token),
                    listarTodasCategorias(token),
                    listarTodasTags(token)
                ]);
                console.log('Dados de conteúdos recebidos:', conteudos);
                setContents(conteudos);
                setCategorias(categoriasResult);
                setTags(tagsResult);
                return conteudos;
            } catch (error) {
                console.error('Erro ao buscar conteúdos:', error);
                setError(error.message || 'Erro ao buscar conteúdos.');
                toast.error('Erro ao buscar conteúdos.')
                return [];
            } finally {
                setLoading(false);
            }
        } else if (globalLoading) {
            setLoading(true);
            return [];

        } else if (!token) {
            setError('Autenticação necessária.');
            return [];

        }
        return [];
    }, [token, globalLoading, listarTodosConteudos, listarTodasCategorias, listarTodasTags]);

    useEffect(() => {
        console.log('useEffect executado - Token:', token, 'Global Loading:', globalLoading);
        fetchData();
    }, [token, globalLoading]);

    if (globalLoading) {
        return <div>Carregando informações de autenticação...</div>;
    }

    if (!token) {
        return <div>Autenticação necessária...</div>;
    }


    const handleCreateSubmit = async (newContent) => {
        setLoading(true);
        setError(null);

        if (newContent.titulo && newContent.titulo.length < 11) {
            toast.error('O titulo deve ter pelo menos 10 caracteres.');
            setLoading(false);
            return;
        }

        try {
            await cadastrarConteudo(newContent, token);
            setCurrentView('list');
            toast.success('Informações salvas com sucesso!');
        } catch (err) {
            console.error('Error ao criar conteúdo:', err);
            setError(err.message || 'Erro ao criar conteúdo.');
            if (err.response && err.response.status === 400) {
                toast.error('Esse conteúdo já existe.');
            } else {
                setError(err.message || 'Erro ao criar conteúdo.');
                toast.error('Erro ao criar conteúdo.');
            }
        } finally {
            setLoading(false);
        }

    }
    const handleUpdateSubmit = async (updatedContentData) => {
        setLoading(true);
        setError(null);

        if (updatedContentData.titulo && updatedContentData.titulo.length < 11) {
            toast.error('O titulo deve ter pelo menos 10 caracteres.');
            setLoading(false);
            return;
        }

        console.log('Dados recebidos para atualização:', updatedContentData);

        try {
            await atualizarConteudo(itemToEdit.id, updatedContentData, token);
            setCurrentView('list');
            setItemToEdit(null);
            toast.success('Informações atualizadas com sucesso!');
        } catch (err) {
            console.error('Error ao atualizar conteúdo:', err);
            setError(err.message || 'Erro ao atualizar conteúdo.');
            toast.error('Erro ao atualizar categoria.');
        } finally {
            setLoading(false);
        }
    }

    const handleEditClick = async (content) => {
        setLoading(true);
        setError(null);
        try {
            const contentData = await buscarConteudoPorId(content.id, token);
            console.log("Dados para edição:", contentData);

            const initialCategoriaIds = contentData.categorias?.map(nomeCategoria => {
                const categoriaEncontrada = categorias.find(cat => cat.nome === nomeCategoria);
                return categoriaEncontrada?.id ? String(categoriaEncontrada.id) : null;
            }).filter(id => id !== null) || [];

            const initialTagIds = contentData.tags?.map(nomeTag => {
                const tagEncontrada = tags.find(tag => tag.nome === nomeTag);
                return tagEncontrada?.id ? String(tagEncontrada.id) : null;
            }).filter(id => id !== null) || [];

            setItemToEdit({
                ...contentData,
                tipoConteudo: Array.isArray(contentData.tipoConteudo) ? contentData.tipoConteudo[0] : contentData.tipoConteudo,
                codStatus: Array.isArray(contentData.codStatus) ? contentData.codStatus[0] : contentData.codStatus,
                categoriaIds: initialCategoriaIds,
                tagIds: initialTagIds,
            });
            setCurrentView('edit');
        } catch (err) {
            console.error('Error ao buscar conteúdo para edicão:', err);
            setError(err.message || 'Erro ao buscar conteúdo para edição.');
            toast.error('Erro ao buscar conteúdo para edição.');
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteClick = async (contentId) => {
        setLoading(true);
        setError(null);
        try {
            await excluirConteudo(contentId, token);
            toast.success('Conteúdo deletada com sucesso!');
        } catch (err) {
            console.error('Error ao deletar conteúdo:', err);
            setError(err.message || 'Erro ao deletar conteúdo.');
            toast.error('Erro ao deletar conteúdo.');
        } finally {
            setLoading(false);
        }
    }


    const renderView = () => {
        switch (currentView) {
            case 'list':
                return (
                    <GenericList
                        columns={contentColumns}
                        dataFetcher={fetchData}
                        pages={contentPages}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        setCurrentView={setCurrentView}
                    />
                );
            case 'add':
                return (
                    <GenericForm
                        fields={getcontentFormFields(categorias, tags)}
                        onSubmit={handleCreateSubmit}
                        onBack={() => setCurrentView('list')}
                    />
                );
            case 'edit':
                return itemToEdit ? (
                    <GenericForm
                        fields={getcontentFormFields(categorias, tags)}
                        onSubmit={handleUpdateSubmit}
                        initialData={itemToEdit}
                        onBack={() => setCurrentView('list')}
                    />
                ) : null;
            default:
                return null;
        }
    }

    return (
        <main className='content-management'>
            <GenericPageManager
                pathMap={{
                    list: ['Conteúdos', ''],
                    add: ['Conteúdos', 'Cadastrar'],
                    edit: ['Conteúdos', 'Editar'],
                }}

                views={{
                    list: renderView(),
                    add: renderView(),
                    edit: renderView(),
                }}
                currentViewKey={currentView}
            />
        </main>
    )
}

export default ContentManagement