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
        genero: '',
    });

    useEffect(() => {
        if (userData) {
            setEditableUserData({
                nome: userData.nome || '',
                email: userData.email || '',
                apelido: userData.apelido || '',
                dataNascimento: userData.dataNascimento || '',
                genero: userData.genero || '',
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
        setIsEditing(!isEditing)
        if (!isEditing) {
            setEditableUserData({
                nome: userData.nome || '',
                email: userData.email || '',
                apelido: userData.apelido || '',
                dataNascimento: userData.dataNascimento || '',
                genero: userData.genero || '',
            });
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        const updatedUserData = { ...editableUserData }; 

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
        
        if (updatedUserData.nome) {
            if (updatedUserData.nome.length < 2) {
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


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (updatedUserData.email) {
            if (!emailRegex.test(updatedUserData.email)) {
                toast.error('Por favor, insira um email válido.');
                setLoading(false);
                return;
            }
        }


        const emailChanged = userData.email !== updatedUserData.email;

        try {
            const response = await atualizarUsuario(token, updatedUserData);

            if (emailChanged) {
                alert('Seu e-mail foi alterado. Por favor, faça login novamente.')
                setTimeout(() => {
                    logout();
                }, 1000);
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
                                id="nome"
                                name="nome"
                                value={isEditing ? editableUserData.nome : userData.nome}
                                readOnly={!isEditing}
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

                        <div className='line'>
                            <span/>
                            <p>Opcionais</p>
                            <span/>
                        </div>

                        <label htmlFor="apelido">
                            Apelido:
                            <input
                                type="text"
                                id="apelido"
                                name="apelido"
                                value={isEditing ? (editableUserData.apelido || '') : (userData.apelido || '')}
                                readOnly={!isEditing}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="dataNascimento">
                            Data de Nascimento:
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                value={isEditing ? editableUserData.dataNascimento : userData.dataNascimento}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="genero">
                            Gênero:
                            {isEditing ? (
                                <select
                                    id="genero"
                                    name="genero"
                                    value={editableUserData.genero || ''}
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
                                    value={userData.genero || ''}
                                    readOnly
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