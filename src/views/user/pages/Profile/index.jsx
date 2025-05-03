import './styles.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';

function Profile() {
    const { userData, globalLoading, updateUser, logout } = useContext(AuthContext);

    if (globalLoading) return <p>Loading...</p>;

    if (!userData) return <p>Dados do usuário não encontrados.</p>;

    return (
        <main className='profile-app__container'>
            <p className='profile-app__page'>Configurações</p>
            <div className='profile-app__content'>
                <p>Informações pessoais</p>
            </div>
            <button onClick={logout}>Logout</button>
        </main>
    );
}

export default Profile;