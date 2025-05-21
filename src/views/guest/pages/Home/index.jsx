import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import Content from '../../components/Content';
import './styles.scss'

// Images

import heroPhone from '../../assets/home/hero-phones.png';

function Home() {
    return (
        <>
            <Container className='home__container'>
                <Content className='home__content-hero'>
                    <div className="home__content-hero-description">
                        <p className='home__content-hero-description--text'>
                            Seu bem-estar, agora com acompanhamento inteligente! 
                            Acesse nosso site com meditações e sons relaxantes e 
                            use o app para histórico, inspiração diária e seu diário 
                            pessoal. Sua jornada de autocuidado facilitada. Comece hoje!
                        </p>
                        <h2 className='home__content-hero-description--h2 fill'>StarSoul</h2>
                        <Link className='home__content-hero-description--button' to='/about-meditation'>Aprenda o que é meditação</Link>
                    </div>
                    <div className='home__content-hero-image'>
                        <img src={heroPhone} />
                    </div>
                </Content>
            </Container>
        </>
    )
}

export default Home;