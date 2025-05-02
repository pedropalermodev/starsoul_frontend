import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import './styles.scss';

// Images
import profilePicture from '../../../../assets/branding/starsoul-icon-circle.png';

function Header() {
    const { userData, globalLoading, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    if (globalLoading) return <p>Loading...</p>;
    if (!userData) return <p>Dados do usuário não encontrados.</p>;

    const nomes = userData.nome.split(' ');
    const nomeSequente = `${nomes[0]}${nomes[1] ? ' ' + nomes[1] : ''}`;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="headeradmin__container">
            <div className="headeradmin__left">
                <p>Bem-vindo de volta, <span>{nomeSequente}</span></p>
            </div>
            <div className="headeradmin__right" ref={dropdownRef}>
                <button className="headeradmin__icon">
                    <i className="bi bi-bell-fill"></i>
                </button>

                <div
                    className="headeradmin__avatar"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={profilePicture} alt="User" />
                </div>

                {isOpen  && (
                    <div className="dropdown-menu">
                        <div className='user-info'>
                            <p className="name">{userData.nome}</p>
                            <p className="email">{userData.email}</p>
                        </div>
                        <button className="logout-btn" onClick={logout}>
                            <i className="bi bi-box-arrow-right"></i> Sair
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
