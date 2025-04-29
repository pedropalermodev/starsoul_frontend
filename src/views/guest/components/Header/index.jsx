import './styles.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import starSoulLogo from '../../../../assets/branding/starsoul-combinationmark-white.png';
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <header className={`header ${menuOpen ? 'open' : ''}`}>
                <Link className='header__menu-logo' to='/' ><img src={starSoulLogo} /></Link>
                <div className='header__menu-toggler' onClick={toggleMenu}> {menuOpen ? <IoClose /> : <LuMenu />} </div>

                <div className='header__side-painel'>
                    <Link className='header__content-logo' to='/' ><img src={starSoulLogo} /></Link>
                    <nav className='header__content-navbar'>
                        <li className='header__content-navbar--li'>
                            <Link to={'/'} onClick={toggleMenu}>Inicial </Link>
                            <div className='header__content-navbar--li-line'></div>
                        </li>
                        <li className='header__content-navbar--li'>
                            <Link to={'/about-meditation'} onClick={toggleMenu}>Conheça a meditação</Link>
                            <div className='header__content-navbar--li-line'></div>
                        </li>
                        <li className='header__content-navbar--li'>
                            <Link to={'/about-us'} onClick={toggleMenu}>Sobre Nós</Link>
                            <div className='header__content-navbar--li-line'/>
                        </li>
                        {/* <li className='header__content-navbar--li'>
                        <Link onClick={toggleMenu}>Empresa StarSoul</Link>
                        <div className='header__content-navbar--li-line'></div>
                    </li> */}
                        <li className='header__content-navbar--li'>
                            <Link to={'/contact'} onClick={toggleMenu}>Contato</Link>
                            <div className='header__content-navbar--li-line'></div>
                        </li>
                    </nav>

                    <div className='header__content-sign'>
                        <Link to='/sign-in' className='header__content-sign--link'>Entrar</Link>
                        <Link to='/sign-up' className='header__content-sign--link'>Cadastre-se</Link>
                    </div>

                </div>
        </header>
    )
}

export default Header;