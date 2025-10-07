import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { MdError } from "react-icons/md";
import { AuthContext } from '../../contexts/AuthContext';


const NotFoundPage = () => {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    const homeDestination = !isAuthenticated
        ? '/'
        : userRole === 'Administrador'
            ? '/console'
            : '/app';

    // Define o texto do botão de acordo com o estado do usuário
    const homeButtonText = isAuthenticated
        ? 'Voltar para minha conta'
        : 'Voltar para Home';

    return (
        <div className="minimal-404-container">
            <div className="minimal-404-content">

                <div className="error-code-icon-group">
                    <span className="error-number">4</span>
                    <MdError color="#ffffff" size={35} />
                    <span className="error-number">4</span>
                </div>

                <h2 className="error-title-minimal">UH OH! Você está PERDIDO.</h2>
                <p className="error-message-minimal">
                    A página que você procura não existe. Como você chegou aqui é um mistério.
                </p>

                <div className="cta-group-minimal">
                    <Link to={homeDestination} className="home-button-minimal">
                        {homeButtonText}
                    </Link>

                    <Link to="/contact" className="contact-button-minimal">
                        Falar Conosco
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
