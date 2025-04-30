import './styles.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';

// Images
import starsoulLogo from '../../../../assets/branding/starsoul-lettermark-blue.png';
import profilePicture from '../../../../assets/branding/starsoul-icon-circle.png'


function Aside() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const { userData, globalLoading, logout } = useContext(AuthContext);

    if (globalLoading) {
        return <p>Loading...</p>; // Exibe um texto enquanto os dados estão sendo carregados
    }

    if (!userData) {
        return <p>Dados do usuário não encontrados.</p>; // Caso não tenha dados do usuário
    }

    const links = [
        { to: '/console/dashboard', icon: 'bi-box-fill', label: 'Dashboard' },
        { to: '/console/access-management', icon: 'bi-person-lines-fill', label: 'Acessos' },
        { to: '/console/content-management', icon: 'bi-body-text', label: 'Conteúdos' },
        { to: '/console/tag-management', icon: 'bi-tags-fill', label: 'Tags' },
        { to: '/console/category-management', icon: 'bi-bookmarks-fill', label: 'Categorias e Seções' },
        { to: '/console/feedback-management', icon: 'bi bi-person-heart', label: 'Feedbacks' },
    ];

    return (
        <div className="aside__container">
            <div className='aside__navbar'>
                <div className='aside__navbar-logo'>
                    <img src={starsoulLogo} />
                </div>
                <nav className='aside__navbar-content'>
                    <div className='aside__navbar-content-ul'>
                        {links.map(({ to, icon, label }, index) => (
                            <Link
                                key={index}
                                to={to}
                                className={`aside__navbar-content-ul-li ${currentPath.startsWith(to) ? 'active' : ''}`}
                            >
                                <i className={`bi ${icon}`}></i>
                                {label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>

            <div className='aside__profile'>
                <div className='aside__profile-widget'>
                    <img src={profilePicture} />
                    <div className='aside__profile-widget-account'>
                        <h3 className='aside__profile-widget-account--name'>{userData.nome}</h3>
                        <p className='aside__profile-widget-account--email'>{userData.email}</p>
                    </div>
                </div>
                <button onClick={logout} className='aside__profile-logout'>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Aside;