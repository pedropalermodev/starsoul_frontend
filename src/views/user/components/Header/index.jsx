import { Link } from 'react-router-dom';
import './styles.scss'

// Images
import starsouBrandmark from '../../../../assets/branding/starsoul-brandmark-white.png'

import profilePicture from '../../assets/header/profilePicture.png'
import home from '../../assets/header/home.svg'
import explore from '../../assets/header/explore.svg'
import songs from '../../assets/header/songs.svg'
import favorites from '../../assets/header/favorites.svg'


function Header() {
    return (
        <header className='header-app__container'>
            <div className='header-app__content'>
                <div className='header-app__web'>
                    <div className='header-app__web-logo'> <img src={starsouBrandmark} /> </div>
                    <nav className='header-app__web-navbar'>
                        <ul className='header-app__web-navbar-ul'>
                            <Link className='header-app__web-navbar-ul-link' to='/app/home'>
                                <div className='link__box'>
                                    <img src={home} /><li>Home</li>
                                </div>
                                <span className='header-app__web-navbar-ul-link-line' />
                            </Link>
                            {/* <Link className='header-app__web-navbar-ul-link' to='/app/profile'><img src={starsouBrandmark}/><li>Perfil</li></Link> */}
                            <Link className='header-app__web-navbar-ul-link' to='/app/explore'>
                                <div className='link__box'>
                                    <img src={explore} /><li>Explorar</li>
                                </div>
                                <span className='header-app__web-navbar-ul-link-line' />
                            </Link>
                            <Link className='header-app__web-navbar-ul-link' to='/app/songs'>
                                <div className='link__box'>
                                    <img src={songs} /><li>Sons</li>
                                </div>
                                <span className='header-app__web-navbar-ul-link-line' />
                            </Link>
                            <Link className='header-app__web-navbar-ul-link' to='/app/favorites'>
                                <div className='link__box'>
                                    <img src={favorites} /><li>Favoritos</li>
                                </div>
                                <span className='header-app__web-navbar-ul-link-line' />
                            </Link>
                        </ul>
                    </nav>
                    <div className='header-app__web-profile'>
                        <Link to='/app/profile'><img src={profilePicture} /></Link>
                    </div>

                </div>
                <div className='header-app__webapp'>
                    <div className='header-app__web-logo'> <img src={starsouBrandmark} /> </div>
                </div>
            </div>
        </header>
    )
}

export default Header;