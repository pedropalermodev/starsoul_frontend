import './styles.scss'
import { GiLotus, GiMeditation, GiWindSlap, GiYinYang } from 'react-icons/gi';

// Images
import pessoaMeditandoCalmo from '../../assets/about-meditation/pessoa-meditando-em-um-ambiente-calmo.png';
import estatuaBudaMeditacao from '../../assets/about-meditation/antiga-estatua-de-pedra-de-buda.png'
import homemMeditando from '../../assets/about-meditation/homem-meditando.png'

function AboutMeditaion() {
    return (
        <main className='about-meditation' >
            <div className="about-meditation__hero container-meditation">
                <div className="hero-box content-meditation">
                    <p className='hero-box__title fill'>
                        Desvende o Universo <br />
                        da Meditação
                    </p>

                    <div className='hero-box__subtitle'>
                        <p>Encontre paz interior, clareza mental e um caminho para o bem-estar integral.</p>

                        <blockquote className='hero-box__quote'>
                            "A meditação é a chave para descobrir o mundo interior." – Thich Nhat Hanh
                        </blockquote>
                    </div>


                </div>
            </div>

            <section className='about-meditation__section container-meditation'>
                <div className='section-box content-meditation'>

                    <div className='section-div'>
                        <p className='section-div__title'>Introdução a</p>
                        <p className='section-div__title'>Meditação</p>
                        <span className='section-div__line'></span>
                    </div>

                    <div className='section-box__content'>

                        <div className='section-div'>
                            <img src={pessoaMeditandoCalmo} alt="Imagem" className='section-div__img' />
                        </div>

                        <div className='section-div__content'>
                            <p className='section-box__content--text'>
                                A meditação é uma prática milenar que visa treinar a mente para
                                um estado de maior clareza, calma e estabilidade emocional.
                                Longe de ser um esforço para "não pensar em nada", a meditação
                                nos ensina a observar nossos pensamentos, emoções e sensações
                                corporais com curiosidade e sem julgamento, ancorando-nos no momento
                                presente.
                            </p>

                            <p className='section-box__content--text'>
                                Ela pode ser uma ferramenta poderosa para o autoconhecimento, redução
                                do estresse e cultivo de uma perspectiva mais equilibrada sobre a vida.
                                Esta página é um convite para você explorar esse universo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='about-meditation__section container-meditation'>

                <div className='section-box content-meditation'>
                    <div className='section-div'>
                        <p className='section-div__title'>Origem e</p>
                        <p className='section-div__title'>Evolução</p>
                        <span className='section-div__line'></span>

                        <div className="section-div__content">
                            <p className='section-box__content--text'>
                                As práticas meditativas têm raizes profundas em diversas tradições espirituais
                                e filosóficas do Oriente, como o Hinduismo (Vedas, Upanishads, Yoga Sutras),
                                Budismo e Taoismo, datando de milhares de anos, Inicialmente, estavam intrinsecamente
                                ligadas à busca por iluminação e compreensão da natureza da realidade.
                            </p>

                            <p className='section-box__content--text'>
                                No século XX, a meditação começou a ganhar popularidade no Ocidente, em parte
                                devido ao crescente interesse por filosofias orientais e, mais tarde, pela
                                pesquisa científica que começou a validar seus beneficios para a saúde física
                                e mental, como os estudos pioneiros sobre a Meditação Transcendental e,
                                posteriormente, sobre Mindfulness.
                            </p>
                        </div>
                    </div>

                    <div className='section-div'>
                        <img src={estatuaBudaMeditacao} alt="Imagem" className='section-div__img' />
                    </div>
                </div>
            </section>

            <article className='about-meditation__article container-meditation'>
                <div className='article-box content-meditation'>
                    <div className='article-box__content'>
                        <div className="article-content">
                            <GiLotus />
                            <div className="article-div">
                                <p className="article-content__title">Programas de Bem-Estar Holístico</p>
                                <p className="article-content__text">
                                    Ao longo dos séculos, a meditação passou a integrar práticas físicas, mentais e emocionais, promovendo um cuidado mais completo. Hoje, é parte essencial de iniciativas que buscam equilíbrio e bem-estar integral.
                                </p>
                            </div>
                        </div>

                        <div className="article-content">
                            <GiMeditation />
                            <div className="article-div">
                                <p className="article-content__title">Sessões de Meditação em Grupo</p>
                                <p className="article-content__text">
                                    Da tradição monástica às salas modernas, a prática em grupo fortalece conexão e foco. Nessas sessões, a energia coletiva potencializa a experiência individual.
                                </p>
                            </div>
                        </div>

                        <div className="article-content">
                            <GiWindSlap />
                            <div className="article-div">
                                <p className="article-content__title">Técnicas de Relaxamento</p>
                                <p className="article-content__text">
                                    Com a expansão da meditação no Ocidente, surgiram abordagens voltadas ao relaxamento físico e mental. Técnicas como escaneamento corporal e relaxamento guiado ajudam a reduzir o estresse e melhorar a qualidade de vida.
                                </p>
                            </div>
                        </div>

                        <div className="article-content">
                            <GiYinYang />
                            <div className="article-div">
                                <p className="article-content__title">Práticas de Respiração Consciente</p>
                                <p className="article-content__text">
                                    A respiração sempre foi central nas tradições meditativas. Hoje, práticas como o breathwork se destacam por sua eficácia no controle da ansiedade, foco e equilíbrio emocional.
                                </p>
                            </div>
                        </div>

                    </div>
                    {/* <img src={homemMeditando} alt="" /> */}
                </div>
            </article>

            <section className='about-meditation__section container-meditation'>

                <div className='section-box content-meditation'>
                    <div className='section-div'>
                        <div className='section-text'>
                            <p className='section-div__title'>Origem e</p>
                            <p className='section-div__title'>Evolução</p>
                            <span className='section-div__line'></span>
                        </div>

                        <img src={homemMeditando} alt="" />
                    </div>

                    <div className='section-div'>
                        <div className='section-div'>
                            <p className='section-div__text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore sit cumque dolorum provident, distinctio at dolorem ipsum magni laborum temporibus neque earum saepe consequuntur sint eveniet quod quo aut odit?</p>
                        </div>

                        <div className='section-images'>
                            <img src={homemMeditando} alt="" />
                            <img src={homemMeditando} alt="" />
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

export default AboutMeditaion;