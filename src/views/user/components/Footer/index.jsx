import './styles.scss'
import { Link } from 'react-router-dom';


// Images 

import home from '../../assets/header/home.svg'
import explore from '../../assets/header/explore.svg'
import profile from '../../assets/header/profile.svg'
import songs from '../../assets/header/songs.svg'
import favorites from '../../assets/header/favorites.svg'


function Footer() {
    return (
        <footer className='footer-app__container'>
            <div className='footer-app__content'>
                <div className='footer-app__web'>
                    <Link to=''>Termos de Uso</Link>
                    <Link to=''>Políticas de Privacidade</Link>
                    <p>© 2025 StarSoul</p>
                </div>

                <div className='footer-app__webapp'>
                    <nav className='footer-app__webapp-navbar'>
                        <ul className='footer-app__webapp-navbar-ul'>
                            <Link className='footer-app__webapp-navbar-ul-link' to='/app/home'> <img src={home} /> <li>Home</li> </Link>
                            <Link className='footer-app__webapp-navbar-ul-link' to='/app/profile'> <img src={profile} /> <li>Perfil</li> </Link>
                            <Link className='footer-app__webapp-navbar-ul-link' to='/app/explore'> <img src={explore} /> <li>Explorar</li> </Link>
                            <Link className='footer-app__webapp-navbar-ul-link' to='/app/songs'> <img src={songs} /> <li>Sons</li> </Link>
                            <Link className='footer-app__webapp-navbar-ul-link' to='/app/favorites'> <img src={favorites} /> <li>Favoritos</li> </Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer;