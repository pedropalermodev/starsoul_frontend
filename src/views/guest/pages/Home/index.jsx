import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import Content from '../../components/Content';
import './styles.scss'

// Images

import heroPhone from '../../assets/home/hero-phones.png';
import downloadPlayStore from '../../../../assets/shared/download-on-googlePlay_versionWhite.svg';
import downloadAppleStore from '../../../../assets/shared/download-on-appleStore_versionWhite.svg';

import Image1 from '../../assets/home/image1.png'
import Image2 from '../../assets/home/image2.png'
import Image3 from '../../assets/home/image3.png'
import Image4 from '../../assets/home/image4.png'

import ImageSection1 from '../../assets/home/image-section-1.png'
import ImageSection2 from '../../assets/home/image-section-2.png'
import ImageSection3 from '../../assets/home/image-section-3.png'

import VerticalLine from '../../assets/home/vertical-line-section.png'
import Test from '../../assets/home/test.svg'
import SectionImage from '../../assets/home/section-image1.png'

import starsoulPhoneApp from '../../assets/home/starsoul-phone-app.png'


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
            <Container className='home__container'>
                <Content className='home__container-info'>
                    <div className="home__container-info-box">
                        <img src={Image1} alt="Imagem 1" />
                        <p className="home__container-info-box--p">Alcance tranquilidade e foco com nossas meditações guiadas, projetadas para reduzir o estresse e melhorar sua concentração.</p>
                    </div>
                    <div className="home__container-info-box">
                        <img src={Image2} alt="Imagem 2" />
                        <p className="home__container-info-box--p">Descubra como atividades ao ar livre podem restaurar sua saúde mental, fortalecendo sua conexão com a natureza.</p>
                    </div>
                    <div className="home__container-info-box">
                        <img src={Image3} alt="Imagem 3" />
                        <p className="home__container-info-box--p">Pratique mindfulness diariamente com exercícios personalizados, projetados para aumentar a atenção plena e promover equilíbrio emocional.</p>
                    </div>
                    <div className="home__container-info-box">
                        <img src={Image4} alt="Imagem 4" />
                        <p className="home__container-info-box--p">Desfrute de uma seleção especial de músicas relaxantes, feitas para criar um ambiente de paz e introspecção durante suas meditações.</p>
                    </div>
                </Content>
            </Container>

            <Container className='home__container'>
                <Content className='home__container-section'>
                    <div className="home__container-section-img">
                        <img src={SectionImage} alt="Imagem 5" />
                    </div>
                    <div className="home__container-section-description">
                        <p className='home__container-section-description--p'>StarSoul é uma empresa dedicada a proporcionar momentos de paz e introspecção através da prática da meditação. Compreendemos que a jornada para o equilíbrio emocional e a clareza mental começa com os pequenos passos do dia a dia, e é por isso que oferecemos uma seleção especial de sons para meditação, projetados para ajudar as pessoas a se reconectarem consigo mesmas e com o momento presente. Na StarSoul, oferecemos uma variedade de faixas sonoras pensadas para diferentes necessidades. Seja você um iniciante na meditação ou alguém que já pratica regularmente, nossos sons podem ser usados para guiá-lo em sua jornada interior. Sons de natureza, como água corrente, vento suave e canto de pássaros, combinados com frequências específicas que favorecem o relaxamento e o foco, são alguns dos elementos que compõem nossas trilhas sonoras.</p>
                        <Link className='home__content-hero-description--button'> Aprenda a baixar nosso aplicativo </Link>
                    </div>
                </Content>
            </Container>

            <Container className='home__container'>
                <Content className='home__container-feature'>
                    <div className='home__container-feature-box'>
                        <img src={Test} alt="" />
                        <p className='home__container-feature-box--p'>Descubra seu caminho para a paz interior</p>
                        <h1 className='home__container-feature-box--h1'>Meditação, Yoga, Retiros e Programs gratuitos para transformar sua vida</h1>
                    </div>
                    <div className='home__container-feature-triple'>
                        <div className="home__container-feature-triple-child">
                            <img src={ImageSection1} alt="" />
                            <div className='home__container-feature-triple-child-text'>
                                <h1 className='home__container-feature-triple-child-text--title'>Dicas diárias para uma vida mais consciente</h1>
                                <p className='home__container-feature-triple-child-text--description'>Receba dicas práticas e rápidas para incorporar mindfulness no seu dia a dia. Pequenas mudanças podem trazer grandes transformações.</p>
                            </div>
                            <img src={ImageSection2} alt="" />
                        </div>

                        <div className="home__container-feature-triple-child"><img src={VerticalLine} alt="" /></div>

                        <div className="home__container-feature-triple-child">
                            <div className='home__container-feature-triple-child-text'>
                                <h1 className='home__container-feature-triple-child-text--title'>Explore nossa biblioteca de vídeos e podcasts</h1>
                                <p className='home__container-feature-triple-child-text--description'>Acesse uma curadoria especial de vídeos do YouTube, selecionados para ajudá-lo a encontrar paz, inspiração e conhecimento. Aprenda com especialistas e pratique no seu próprio ritmo.</p>
                            </div>
                            <img src={ImageSection3} alt="" /> 
                            <div className='home__container-feature-triple-child-text'>
                                <h1 className='home__container-feature-triple-child-text--title'>Recursos gratuitos para você</h1>
                                <p className='home__container-feature-triple-child-text--description'>Acesse uma variedade de recursos gratuitos, incluindo meditações guiadas, playlists relaxantes e guias práticos, para ajudá-lo a começar ou aprofundar sua prática de meditação.</p>
                            </div>  
                        </div>
                    </div>
                </Content>
            </Container>
            <Container className='home__container'>
                <Content className='home__container-starsoulapp'>
                    <div className="home__container-starsoulapp-content"><img src={starsoulPhoneApp} alt="" /></div>
                    <div className="home__container-starsoulapp-content">
                        <h1 className="home__container-starsoulapp-content-h1">Acalme-se com a StarSoul</h1>
                        <p className="home__container-starsoulapp-content-p">Descubra o poder da tranquilidade com a StarSoul, o aplicativo de meditação que te ajuda a encontrar paz e equilíbrio no seu dia a dia. Com uma variedade de sessões guiadas, sons relaxantes e técnicas de respiração, a StarSoul é seu companheiro perfeito para reduzir o estresse e melhorar seu bem-estar.</p>
                        <p className="home__container-starsoulapp-content-p">Baixe o aplicativo da StarSoul e comece sua jornada para uma mente mais calma e focada hoje mesmo!</p>
                        <div className="home__container-starsoulapp-content-link">
                            <a href=""><img src={downloadAppleStore} alt="" /></a>
                            <a href=""><img src={downloadPlayStore} alt="" /></a>
                        </div>
                    </div>
                </Content>
            </Container>
        </>
    )
}

export default Home;