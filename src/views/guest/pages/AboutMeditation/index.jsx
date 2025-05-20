import './styles.scss'

// Images
import pessoaMeditandoCalmo from '../../assets/about-meditation/pessoa-meditando-em-um-ambiente-calmo.png';
import estatuaBudaMeditacao from '../../assets/about-meditation/antiga-estatua-de-pedra-de-buda.png'


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
                            
                        </div>
                        <div className="article-content">
                            
                        </div>
                        <div className="article-content">
                            
                        </div>
                        <div className="article-content">
                            
                        </div>
                    </div>
                    <img src={estatuaBudaMeditacao} alt="" />
                </div>
            </article>
            -

        </main>
    );
}

export default AboutMeditaion;