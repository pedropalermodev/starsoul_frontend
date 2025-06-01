import './styles.scss'
import { useContext, useEffect, useState, useCallback } from 'react';
import { cadastrarUsuario, atualizarUsuario, listarTodosUsuarios, buscarUsuarioPorId, excluirUsuario } from '../../../../api/usuario.api'
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import GenericPageManager from '../../components/GenericPageManager';
import GenericForm from '../../components/GenericPageManager/components/GenericForm';
import GenericList from '../../components/GenericPageManager/components/GenericList';
import GenericActionButtons from '../../components/GenericPageManager/components/GenericActionButtons';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const accessColumns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    {
        key: 'tipoConta',
        label: 'Perfil',
        cellStyle: { padding: '10px' },
        render: (user) => <span className='badge-container'><p className={`badge  ${user.tipoConta === 'Administrador' ? 'profile-admin' : 'profile-user'}`}>{user.tipoConta}</p></span>,
    },
    {
        key: 'codStatus',
        label: 'Status',
        cellStyle: { padding: '10px' },
        render: (user) => <span className='badge-container'><p className={`badge  ${user.codStatus === 'Ativo' ? 'status-ativo' : (user.codStatus === 'Inativo' ? 'status-inativo' : (user.codStatus === 'Suspenso' ? 'status-suspenso' : undefined))}`}>{user.codStatus}</p></span>,
    },
    {
        key: 'dataCadastro',
        label: 'Cadastro em:',
        render: (item) => {
            const data = new Date(item.dataCadastro);
            return format(data, 'dd/MM/yyyy HH:mm');
        },
    },
    {
        key: 'actions',
        label: 'Ações',
        render: (user, onEdit, onDelete) => (
            <GenericActionButtons
                item={user}
                onEdit={() => onEdit(user)}
                onDelete={() => { onDelete(user.id); }}
            />
        ),
    }
];

const accessPages = [
    {
        view: 'add',
        label: 'Adicionar novo acesso',
        className: 'generic__bar-button generic__bar-button--add',
        iconClass: 'bi bi-database-add'
    },
    // {
    //     view: 'edit',
    //     className: 'generic__bar-button generic__bar-button--edit',
    //     iconClass: 'bi bi-pencil-square'
    // }
];


const accessFormFields = [
    { name: 'nome', label: 'Nome', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'senha', label: 'Senha', type: 'password', required: true },
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
    {
        name: 'tipoConta',
        label: 'Perfil',
        type: 'radio',
        required: true,
        options: [
            { label: 'Administrador', value: 'Administrador' },
            { label: 'Usuário', value: 'Usuário' }
        ]
    },
    { name: 'apelido', label: 'Apelido', type: 'text', required: false },
    { name: 'dataNascimento', label: 'Data de Nascimento', type: 'date', required: false },
    {
        name: 'genero',
        label: 'Gênero',
        type: 'select',
        required: false,
        options: [
            { label: 'Masculino', value: 'Masculino' },
            { label: 'Feminino', value: 'Feminino' },
            { label: 'Não-binário', value: 'Não-binário' },
            { label: 'Outro', value: 'Outro' }
        ]
    },
];

function AccessManagement() {
    const { token, globalLoading } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [currentView, setCurrentView] = useState('list');
    const [loading, setLoading] = useState(true);
    const [itemToEdit, setItemToEdit] = useState(null);

    const fetchData = useCallback(async () => {
        if (!globalLoading && token) {
            setLoading(true);
            try {
                const data = await listarTodosUsuarios(token);
                setUsers(data);
                // console.log("Dados dos usuários recebidos:", data);
                return data;
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                toast.error('Erro ao buscar usuários.', { toastId: 'userFetchError' })
                return [];
            } finally {
                setLoading(false);
            }
        } else if (globalLoading) {
            setLoading(true);
            return [];

        } else if (!token) {
            toast.error('Autenticação necessária.')
            return [];
        }
        return [];
    }, [token, globalLoading, listarTodosUsuarios]);

    useEffect(() => {
        // console.log('useEffect executado - Token:', token, 'Global Loading:', globalLoading);
        fetchData();
    }, [token, globalLoading]);

    if (globalLoading) {
        return <div>Carregando informações de autenticação...</div>;
    }

    if (!token) {
        return <div>Autenticação necessária...</div>;
    }

    const handleCreateSubmit = async (newUser) => {
        setLoading(true);

        let dataNascimentoBRT = null;
        const dataNascimentoInput = newUser.dataNascimento;
        if (dataNascimentoInput) {
            const selectedDate = new Date(dataNascimentoInput);
            const today = new Date();
            const minDate = new Date('1911-10-06');

            selectedDate.setUTCHours(0, 0, 0, 0);
            today.setUTCHours(0, 0, 0, 0);
            minDate.setUTCHours(0, 0, 0, 0);

            if (selectedDate > today) {
                toast.error('A data de nascimento não pode ser posterior ao dia de hoje.');
                setLoading(false);
                return;
            }

            if (selectedDate < minDate) {
                toast.error('A data de nascimento não pode ser anterior a 06/10/1911.'); // Ajuste a mensagem conforme a data mínima
                setLoading(false);
                return;
            }

            dataNascimentoBRT = `${dataNascimentoInput}T00:00:00-03:00`;
            console.log('Data de Nascimento enviada (BRT) para CREATE:', dataNascimentoBRT);
        }

        console.log('Validando nome:', newUser.nome);
        if (newUser.nome && newUser.nome.length < 3) {
            toast.error('O nome do usuário deve ter pelo menos 2 caracteres.');
            setLoading(false);
            return;
        }

        console.log('Validando nome (números):', newUser.nome);
        const hasNumber = /\d/.test(newUser.nome);
        if (newUser.nome && hasNumber) {
            toast.error('O nome do usuário não pode conter números.');
            setLoading(false);
            return;
        }

        if (newUser.senha && newUser.senha.length < 8) {
            toast.error('A senha deve ter pelo menos 8 caracteres.');
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (newUser.email && !emailRegex.test(newUser.email)) {
            toast.error('Por favor, insira um email válido.');
            setLoading(false);
            return;
        }


        try {
            await cadastrarUsuario(newUser, token);
            setCurrentView('list');
            toast.success('Informações salvas com sucesso!');
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err);
            if (err.response && err.response.status === 409) {
                toast.error('Este email já está cadastrado.');
            } else {
                toast.error('Erro ao cadastrar usuário.');
            }
        } finally {
            setLoading(false);
        }
    };

    // BOTÃO DE SALVAR EDIÇÃO NO FORM
    const handleUpdateSubmit = async (updatedUserData) => {
        setLoading(true);

        if (!updatedUserData.senha && itemToEdit?.senha) {
            updatedUserData.senha = itemToEdit.senha;
        }

        let dataNascimentoBRT = null;
        const dataNascimentoInput = updatedUserData.dataNascimento;
        if (dataNascimentoInput) {
            const selectedDate = new Date(dataNascimentoInput);
            const today = new Date();
            const minDate = new Date('1911-10-06');

            selectedDate.setUTCHours(0, 0, 0, 0);
            today.setUTCHours(0, 0, 0, 0);
            minDate.setUTCHours(0, 0, 0, 0);

            if (selectedDate > today) {
                toast.error('A data de nascimento não pode ser posterior ao dia de hoje.');
                setLoading(false);
                return;
            }

            if (selectedDate < minDate) {
                toast.error('A data de nascimento não pode ser anterior a 06/10/1911.');
                setLoading(false);
                return;
            }

            dataNascimentoBRT = `${dataNascimentoInput}T00:00:00-03:00`;
            // console.log('Data de Nascimento enviada (BRT):', dataNascimentoBRT);
        }

        if (updatedUserData.nome && updatedUserData.nome.length < 3) {
            toast.error('O nome do usuário deve ter pelo menos 2 caracteres.');
            setLoading(false);
            return;
        }

        const hasNumber = /\d/.test(updatedUserData.nome);
        if (updatedUserData.nome && hasNumber) {
            toast.error('O nome do usuário não pode conter números.');
            setLoading(false);
            return;
        }

        if (updatedUserData.senha && updatedUserData.senha.length < 8) {
            toast.error('A senha deve ter pelo menos 8 caracteres.');
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (updatedUserData.email && !emailRegex.test(updatedUserData.email)) {
            toast.error('Por favor, insira um email válido.');
            setLoading(false);
            return;
        }

        try {
            await atualizarUsuario(itemToEdit.id, updatedUserData, token);
            setCurrentView('list');
            setItemToEdit(null);
            toast.success('Informações atualizadas com sucesso!');
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
            toast.error('Erro ao atualizar usuário.');
        } finally {
            setLoading(false);
        }
    };

    // BOTÃO DE EDITAR NO LIST
    const handleEditClick = async (user) => {
        setLoading(true);
        try {
            const userData = await buscarUsuarioPorId(user.id, token);
            setItemToEdit(userData);
            setCurrentView('edit');
        } catch (err) {
            console.error('Erro ao buscar usuário para edição:', err);
            toast.error('Erro ao buscar usuário para edição.');
        } finally {
            setLoading(false);
        }
    };

    // BOTÃO DE EXCLUIR NO LIST
    const handleDeleteClick = async (userId) => {
        setLoading(true);
        try {
            await excluirUsuario(userId, token);
            toast.success('Usuário deletado com sucesso!');
        } catch (err) {
            console.error('Erro ao deletar usuário:', err);
            toast.error('Erro ao deletar usuário.');
        } finally {
            setLoading(false);
        }
    };

    const renderView = () => {
        switch (currentView) {
            case 'list':
                return (
                    <GenericList
                        columns={accessColumns}
                        dataFetcher={fetchData}
                        pages={accessPages}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        setCurrentView={setCurrentView}
                    />
                );

            case 'add':
                return (
                    <GenericForm
                        fields={accessFormFields}
                        onSubmit={handleCreateSubmit}
                        onBack={() => setCurrentView('list')}
                    />
                );

            case 'edit':
                return itemToEdit ? (
                    <GenericForm
                        fields={accessFormFields.filter(field => field.name !== 'senha')}
                        onSubmit={handleUpdateSubmit}
                        initialData={itemToEdit}
                        onBack={() => setCurrentView('list')}
                    />
                ) : null;
            default:
                return null;
        }
    };

    return (
        <main className="access-management">
            <GenericPageManager
                pathMap={{
                    list: ["Acessos", ""],
                    add: ["Acessos", "Cadastrar"],
                    edit: ["Acessos", "Editar"]
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

export default AccessManagement;