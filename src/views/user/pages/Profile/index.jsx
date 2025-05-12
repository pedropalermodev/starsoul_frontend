import './styles.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';

function Profile() {
    const { userData, globalLoading, updateUser, logout } = useContext(AuthContext);

    if (globalLoading) return <p>Loading...</p>;

    if (!userData) return <p>Dados do usuário não encontrados.</p>;

    return (
        <main className='profile-app__container'>

            <div className='profile-app__content'>
                <p className='profile-app__content--title-page'>Configurações</p>
                <div className='profile-app__user'>
                    <p className='profile-app__user--text'>Informações pessoais</p>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </main>
    );
}

export default Profile;