import { useContext } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import './styles.scss'


// Images
import profilePicture from '../../../../assets/branding/starsoul-icon-circle.png'


function Header() {
    const { userData, globalLoading, logout } = useContext(AuthContext);

    if (globalLoading) {
        return <p>Loading...</p>;
    }

    if (!userData) {
        return <p>Dados do usuário não encontrados.</p>;
    }

    return (
        <div className="headeradmin__container">
            <div className='headeradmin__profile'>
                <img src={profilePicture} />
                <p>Bem vindo(a) de volta <span>{userData.nome}!</span></p>
            </div>
        </div>
    )
}

export default Header;