import './styles.scss'
import { useCallback, useContext, useEffect, useState } from 'react';
import { cadastrarCategoria, atualizarCategoria, listarTodasCategorias, excluirCategoria, buscarCategoriaPorId } from '../../../../api/categoria.api';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import GenericPageManager from '../../components/GenericPageManager';
import GenericForm from '../../components/GenericPageManager/components/GenericForm';
import GenericList from '../../components/GenericPageManager/components/GenericList';
import GenericActionButtons from '../../components/GenericPageManager/components/GenericActionButtons';
import { toast } from 'react-toastify';

const categoriesColumns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'descricao', label: 'Descrição' },
    {
        key: 'codStatus',
        label: 'Status',
        cellStyle: { padding: '10px' },
        render: (category) => <span className='badge-container'><p className={`badge  ${category.codStatus === 'Ativo' ? 'status-ativo' : (category.codStatus === 'Inativo' ? 'status-inativo' : (category.codStatus === 'Suspenso' ? 'status-suspenso' : undefined))}`}>{category.codStatus}</p></span>,
    },
    {
        key: 'actions',
        label: 'Ações',
        render: (category, onEdit, onDelete) => (
            <GenericActionButtons
                item={category}
                onEdit={() => onEdit(category)}
                onDelete={() => {onDelete(category.id);}}
            />
        ),
    }
];
const categoriesPages = [
    {
        view: 'add',
        label: 'Adicionar nova categoria',
        className: 'generic__bar-button generic__bar-button--add',
        iconClass: 'bi bi-database-add'
    }
];
const categoriesFormFields = [
    { name: 'nome', label: 'Nome', type: 'text', required: true },
    { name: 'descricao', label: 'Descricao', type: 'text', required: false },
    {
        name: 'codStatus',
        label: 'Status',
        type: 'select',
        required: true,
        options: [
            { label: 'Ativo', value: 'Ativo' },
            { label: 'Suspenso', value: 'Suspenso' },
            { label: 'Inativo', value: 'Inativo' }
        ]
    },
];



function CategoryManagement() {
    const { token, globalLoading } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [currentView, setCurrentView] = useState('list');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);

    const fetchData = useCallback(async () => {
        if (!globalLoading && token) {
            setLoading(true);
            setError(null);
            try {
                const data = await listarTodasCategorias(token);
                setCategories(data);
                console.log("Dados das categorias recebidos:", data);
                return data;
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
                setError(error.message || 'Erro ao buscar categorias.');
                toast.error('Erro ao buscar categorias.')
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
    }, [token, globalLoading, listarTodasCategorias]);

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

    // BOTÃO DE SALVAR CRIAÇÃO NO FORM
    const handleCreateSubmit = async (newCategory) => {
        setLoading(true);
        setError(null);

        if (newCategory.nome && newCategory.nome.length < 3) {
            toast.error('O nome deve ter pelo menos 3 caracteres.');
            setLoading(false);
            return;
        }

        if (newCategory.descricao && newCategory.descricao.length < 11) {
            toast.error('A descrição deve ter pelo menos 10 caracteres.');
            setLoading(false);
            return;
        }

        try {
            await cadastrarCategoria(newCategory, token);
            setCurrentView('list');
            toast.success('Informações salvas com sucesso!');
        } catch (err) {
            console.error('Erro ao cadastrar categoria: ', err)
            if (err.response && err.response.status === 409) {
                toast.error('Essa categoria já existe.');
            } else {
                setError(err.message || 'Erro ao cadastrar categoria.');
                toast.error('Erro ao cadastrar conteúdo.');
            }
        } finally {
            setLoading(false);
        }
    }

    // BOTÃO DE SALVAR EDIÇÃO NO FORM
    const handleEditSubmit = async (updateCategoryData) => {
        setLoading(true);
        setError(null);

        if (updateCategoryData.nome && updateCategoryData.nome.length < 3) {
            toast.error('O nome deve ter pelo menos 3 caracteres.');
            setLoading(false);
            return;
        }

        if (updateCategoryData.descricao && updateCategoryData.descricao.length < 11) {
            toast.error('A descrição deve ter pelo menos 10 caracteres.');
            setLoading(false);
            return;
        }

        try {
            await atualizarCategoria(itemToEdit.id, updateCategoryData, token);
            setCurrentView('list');
            setItemToEdit(null);
            toast.success('Informações atualizadas com sucesso!');
        } catch (err) {
            console.error('Erro ao atualizar categoria: ', err);
            setError(err.message || 'Erro ao atualizar categoria.');
            toast.error('Erro ao atualizar categoria.');
        } finally {
            setLoading(false);
        }
    }

    // BOTÃO DE EDITAR NO LIST
    const handleEditClick = async (category) => {
        setLoading(true);
        setError(null);
        try {
            const categoryData = await buscarCategoriaPorId(category.id, token);
            setItemToEdit(categoryData);
            setCurrentView('edit');
        } catch (err) {
            console.error('Erro ao buscar categoria para edição: ', err);
            setError(err.message || 'Erro ao buscar categoria para edição.');
            toast.error('Erro ao buscar categoria para edição.');
        } finally {
            setLoading(false);
        }
    }

    // BOTÃO DE EXCLUIR NO LIST
    const handleDeleteClick = async (categoryId) => {
        setLoading(true);
        setError(null);
        try {
            await excluirCategoria(categoryId, token);
            toast.success('Categoria deletada com sucesso!');
        } catch (err) {
            console.error('Erro ao deletar categoria: ', err);
            setError(err.message || 'Erro ao deletar categoria.');
            toast.error('Erro ao deletar categoria.');
        } finally {
            setLoading(false);
        }
    }


    const renderView = () => {
        switch (currentView) {
            case 'list':
                return (
                    <GenericList
                        columns={categoriesColumns}
                        dataFetcher={fetchData}
                        pages={categoriesPages}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        setCurrentView={setCurrentView}
                    />
                );
            case 'add':
                return (
                    <GenericForm
                        fields={categoriesFormFields}
                        onSubmit={handleCreateSubmit}
                        onBack={() => setCurrentView('list')}
                    />
                );
            case 'edit':
                return itemToEdit ? (
                    <GenericForm
                        fields={categoriesFormFields}
                        onSubmit={handleEditSubmit}
                        initialData={itemToEdit}
                        onBack={() => setCurrentView('list')}
                    />
                ) : null;
            default:
                return null;
        }
    }

    return (
        <main className='category-management'>
            <GenericPageManager
                pathMap={{
                    list: ["Categorias", ""],
                    add: ["Categorias", "Cadastrar"],
                    edit: ["Categorias", "Editar"],
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

export default CategoryManagement