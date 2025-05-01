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

    const nomes = userData.nome.split(' ');
    const primeiroNome = nomes[0];
    const segundoNome = nomes[1];

    let nomeSequente = primeiroNome;
    if (segundoNome) {
        nomeSequente = `${primeiroNome} ${segundoNome}`;
    }

    return (
        <div className="headeradmin__container">
            <div className='headeradmin__profile'>
                <p>Como vai seu dia <span>{nomeSequente}?</span></p>
            </div>
            
        </div>
    )
}

export default Header;