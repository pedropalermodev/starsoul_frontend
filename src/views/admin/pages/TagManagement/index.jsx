import './styles.scss'
import { useCallback, useContext, useEffect, useState } from 'react';
import { listarTodasTags, buscarTagPorId, cadastrarTag, atualizarTag, excluirTag } from '../../../../api/tag.api';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import GenericPageManager from '../../components/GenericPageManager';
import GenericList from '../../components/GenericPageManager/components/GenericList';
import GenericForm from '../../components/GenericPageManager/components/GenericForm';
import GenericActionButtons from '../../components/GenericPageManager/components/GenericActionButtons';
import { toast } from 'react-toastify';

const tagsColumns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    {
        key: 'actions',
        label: 'Ações',
        render: (tag, onEdit, onDelete) => (
            <GenericActionButtons
                item={tag}
                onEdit={() => onEdit(tag)}
                onDelete={() => {onDelete(tag.id);}}
            />
        )
    }
];

const tagsPages = [
    {
        view: 'add',
        label: 'Adicionar nova tag',
        className: 'generic__bar-button generic__bar-button--add',
        iconClass: 'bi bi-database-add'
    }
];

const tagsFormFields = [
    { name: 'nome', label: 'Nome', type: 'text', required: true },
];


function TagManagement() {
    const { token, globalLoading } = useContext(AuthContext);
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
                const data = await listarTodasTags(token);
                setTags(data);
                console.log("Dados das tags recebidos:", data);
                return data;
            } catch (error) {
                console.error('Erro ao buscar tags:', error);
                setError(error.message || 'Erro ao buscar tags.');
                toast.error('Erro ao buscar tags.')
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
    }, [token, globalLoading, listarTodasTags]);

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
    const handleCreateSubmit = async (newTag) => {
        setLoading(true);
        setError(null);
        try {
            await cadastrarTag(newTag, token);
            setCurrentView('list');
            toast.success('Informações salvas com sucesso!');
        } catch (err) {
            console.error('Erro ao cadastrar tag: ', err);
            if (err.response && err.response.status === 409) {
                toast.error('Essa tag já existe.');
            } else {
                setError(err.message || 'Erro ao cadastrar tag.');
                toast.error('Erro ao cadastrar tag.');
            }
        } finally {
            setLoading(false);
        }
    }

    // BOTÃO DE SALVAR EDIÇÃO NO FORM
    const handleEditSubmit = async (updateTagData) => {
        setLoading(true);
        setError(null);
        try {
            await atualizarTag(itemToEdit.id, updateTagData, token);
            setCurrentView('list');
            setItemToEdit(null);
            toast.success('Informações atualizadas com sucesso!');
        } catch (err) {
            console.error('Erro ao atualizar tag: ', err);
            setError(err.message || 'Erro ao atualizar tag.');
            toast.error('Erro ao atualizar tag.');
        } finally { }
    }

    // BOTÃO DE EDITAR NO LIST
    const handleEditClick = async (tag) => {
        setLoading(true);
        setError(null);
        try {
            const tagData = await buscarTagPorId(tag.id, token);
            setItemToEdit(tagData);
            setCurrentView('edit');
        } catch (err) {
            console.error('Erro ao buscar tag para edição: ', err);
            setError(err.message || 'Erro ao buscar tag para edição.');
            toast.error('Erro ao buscar tag para edição.');
        } finally {
            setLoading(false);
        }
    }

    // BOTÃO DE EXCLUIR NO LIST
    const handleDeleteClick = async (tagId) => {
        setLoading(true);
        setError(null);
        try {
            await excluirTag(tagId, token);
            toast.success('Tag deletada com sucesso!');
        } catch (err) {
            console.error('Erro ao deletar tag: ', err);
            setError(err.message || 'Erro ao deletar tag.');
            toast.error('Erro ao deletar tag.');
        } finally {
            setLoading(false);
        }
    }

    const renderView = () => {
        switch (currentView) {
            case "list":
                return (
                    <GenericList
                        columns={tagsColumns}
                        dataFetcher={fetchData}
                        pages={tagsPages}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        setCurrentView={setCurrentView}
                    />
                )
            case "add":
                return (
                    <GenericForm
                        fields={tagsFormFields}
                        onSubmit={handleCreateSubmit}
                        onBack={() => setCurrentView('list')}
                    />
                )
            case "edit":
                return itemToEdit ? (
                    <GenericForm
                        fields={tagsFormFields}
                        onSubmit={handleEditSubmit}
                        initialData={itemToEdit}
                        onBack={() => setCurrentView('list')}
                    />
                ) : null;
            default:
        }
    }

    return (
        <main className='tag-management'>
            <GenericPageManager
                pathMap={{
                    list: ["Tags", ""],
                    add: ["Tags", "Cadastrar"],
                    edit: ["Tags", "Editar"],
                }}
                views={{
                    list: renderView(),
                    add: renderView(),
                    edit: renderView(),
                }}
                currentViewKey={currentView}
            />
        </main>
    );
}

export default TagManagement