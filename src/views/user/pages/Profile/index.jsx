import './styles.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { atualizarUsuario } from '../../../../api/login.api';
import { toast } from 'react-toastify';

import profilePicture from '../../assets/header/profilePicture.png'


function Profile() {
    const { userData, globalLoading, updateUser, logout, token } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editableUserData, setEditableUserData] = useState({
        nome: '',
        email: '',
        apelido: '',
        dataNascimento: '',
        genero: null,
    });

    useEffect(() => {
        if (userData) {
            setEditableUserData({
                // Garanta que todas as propriedades sejam strings vazias se forem null/undefined
                nome: userData.nome || '',
                email: userData.email || '',
                apelido: userData.apelido || '',
                dataNascimento: userData.dataNascimento || '',
                genero: userData.genero === null ? null : (userData.genero || ''), // Gênero: null ou string
            });
        }
    }, [userData]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUserData({
            ...editableUserData,
            [name]: value,
        });
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        // Quando entra no modo de edição (isEditing era false e agora é true), copia os dados atuais
        if (!isEditing) {
            setEditableUserData({
                nome: userData.nome || '',
                email: userData.email || '',
                apelido: userData.apelido || '',
                dataNascimento: userData.dataNascimento || '',
                genero: userData.genero === null ? null : (userData.genero || ''),
            });
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        // Use editableUserData para as validações, pois é o que o usuário modificou
        const updatedUserData = { ...editableUserData }; // Faça uma cópia para evitar mutações diretas

        // 1. Validação da Data de Nascimento (já existente)
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
        }
        // Se você estiver enviando dataNascimentoBRT, certifique-se de que `updatedUserData.dataNascimento`
        // seja atualizado com esse formato, ou crie um novo objeto para envio.
        // Por enquanto, vou assumir que você enviará `updatedUserData.dataNascimento` como está no input.


        // 2. Validação do Nome (comprimento e sem números)
        if (updatedUserData.nome) { // Verifique se o nome não é nulo/vazio antes de validar
            if (updatedUserData.nome.length < 2) { // Alterei para 2 caracteres para corresponder à sua mensagem 'pelo menos 2 caracteres'
                toast.error('O nome do usuário deve ter pelo menos 2 caracteres.');
                setLoading(false);
                return;
            }
            const hasNumber = /\d/.test(updatedUserData.nome);
            if (hasNumber) {
                toast.error('O nome do usuário não pode conter números.');
                setLoading(false);
                return;
            }
        }


        // 3. Validação do Email (formato)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (updatedUserData.email) { // Verifique se o email não é nulo/vazio antes de validar
            if (!emailRegex.test(updatedUserData.email)) {
                toast.error('Por favor, insira um email válido.');
                setLoading(false);
                return;
            }
        }


        // 4. Lógica para Expiração da Sessão se o Email Mudar
        const emailChanged = userData.email !== updatedUserData.email; // Compara com o email original do contexto

        try {
            // Envie os dados para a API (atualizado: usando updatedUserData)
            const response = await atualizarUsuario(token, updatedUserData); // Envia os dados validados

            // Se a atualização for bem-sucedida
            if (emailChanged) {
                toast.info('Seu e-mail foi alterado. Por favor, faça login novamente.', {
                    autoClose: false, // Opcional: mantém o toast visível até o usuário fazer algo
                    closeOnClick: false,
                    draggable: false,
                });
                setTimeout(() => {
                    logout(); // Função para encerrar a sessão e limpar o token
                }, 3000); // Dá um tempo para o usuário ler a mensagem antes de deslogar
            } else {
                updateUser(response);
            }

            setIsEditing(false);

        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
            if (err.response && err.response.status === 409) {
                toast.error('Este e-mail já está cadastrado.');
            } else {
                setError(err.message || 'Erro ao atualizar usuário.');
                toast.error('Erro ao atualizar usuário.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (globalLoading) return <p>Loading...</p>;

    if (!userData) return <p>Dados do usuário não encontrados.</p>;

    return (
        <main className='profile-app__container'>

            <div className='profile-app__content'>
                <p className='profile-app__content--title-page'>Configurações</p>
                <div className='profile-app__user'>

                    <div className='info-user'>
                        <p className='profile-app__user--text'>Informações pessoais</p>
                        <div className='info-user-div'>
                            <img src={profilePicture} alt="" />
                            <span>{userData.nome}</span>
                            <span>{userData.email}</span>
                        </div>
                    </div>

                    <div className='profile-app__user-content'>
                        <label htmlFor="nome">
                            Nome:
                            <input
                                type="text"
                                id="nome" // Adicione um id para a label htmlFor
                                name="nome" // Adicione um name para handleChange
                                value={isEditing ? editableUserData.nome : userData.nome}
                                readOnly={!isEditing} // readOnly é true se não estiver editando
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="email">
                            Email:
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={isEditing ? editableUserData.email : userData.email}
                                readOnly={!isEditing}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="apelido">
                            Apelido (Opcional):
                            <input
                                type="text"
                                id="apelido"
                                name="apelido"
                                value={isEditing ? (editableUserData.apelido || '') : (userData.apelido || 'não possui')}
                                readOnly={!isEditing}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="dataNascimento">
                            Data de Nascimento (Opcional):
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                value={isEditing ? editableUserData.dataNascimento : userData.dataNascimento}
                                readOnly={!isEditing}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="genero">
                            Gênero (Opcional):
                            {isEditing ? (
                                <select
                                    id="genero"
                                    name="genero"
                                    value={editableUserData.genero === null ? '' : editableUserData.genero}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione seu gênero</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    id="genero"
                                    name="genero"
                                    // Se o gênero for null no modo de visualização, exibe 'não possui'
                                    value={userData.genero || 'não possui'}
                                    readOnly // Sempre readOnly no modo de visualização
                                />
                            )}
                        </label>

                        {isEditing ? (
                            <div className="buttons-actions">
                                <button onClick={handleSave} className='button'>Salvar</button>
                                <button onClick={toggleEditMode} className='button'>Cancelar</button>
                            </div>
                        ) : (
                            <button onClick={toggleEditMode} className='button'>Editar</button>
                        )}
                        <button onClick={logout} className='logout-button'>Sair da conta</button>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default Profile;