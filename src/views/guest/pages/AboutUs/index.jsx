import './styles.scss'

import heroElements from '../../assets/about-us/hero-elements.svg'

import ourMission from '../../assets/about-us/our-mission.svg'

function AboutUs() {
    return (
        <main className='about-us' >
            <div className="about-us__hero container-about-us">
                <div className="hero-box content-about-us">
                    <div className="hero-box__text">
                        <p className='fill'>Olá, somos a StarSoul</p>
                        <p className='fill'>
                            Nossa missão é despertar o equilíbrio e a presença
                            através da meditação. Criamos experiências acolhedoras
                            e acessíveis que ajudam você a se reconectar com seu
                            interior, encontrar leveza no dia a dia e cultivar
                            bem-estar de forma simples e significativa.
                        </p>
                    </div>

                    <div className='hero-box__image'>
                        <img src={heroElements} alt="" />
                    </div>
                </div>
            </div>

            <section className='about-us__section container-about-us'>
                <div className='section-box content-about-us'>

                    <span className="line"></span>

                    <div className='section-box__title'>
                        <p>About Us</p>
                        <span className='line'></span>
                    </div>

                    <div className='section-box__description'>
                        <p>Conectando tecnologia e bem-estar para uma vida mais equilibrada.</p>
                        <p>Recursos de saúde mental criados com empatia, ciência e propósito.</p>
                    </div>

                    <span className="line"></span>

                    <div className='section-box__about-us'>
                        <p>Quem nós somos?</p>
                        <span className="line"></span>

                        <p>
                            Criada por estudantes apaixonados por inovação e bem-estar, a StarSoul é uma plataforma dedicada a transformar a saúde mental em uma experiência acessível, acolhedora e significativa.
                            Acreditamos que o cuidado emocional pode ser simples, profundo e integrado à rotina. Por isso, combinamos práticas como meditação, mindfulness e reconexão com a natureza para ajudar você a viver com mais equilíbrio, clareza e leveza.
                            Nosso compromisso é com a escuta, a ciência e a presença — para que cada passo da sua jornada interior seja apoiado com consciência e respeito.
                        </p>
                    </div>

                    <div className='section-box__our-mission'>
                        <div className='section-div'>
                            <p>Nossa missão</p>
                            <span className="line"></span>

                            <p>
                                Nossa missão na StarSoul é transformar a forma como as pessoas cuidam da mente e das emoções. Acreditamos que o bem-estar mental deve ser acessível, simples e parte natural do cotidiano.
                                Em um mundo acelerado, onde o estresse e a ansiedade se tornaram quase universais, queremos oferecer um espaço seguro e acolhedor para o autocuidado. Um espaço onde você possa respirar fundo, reconectar-se consigo mesmo e encontrar equilíbrio — mesmo nos dias mais difíceis.
                                Desenvolvemos experiências digitais que unem ciência psicológica, práticas contemplativas e design centrado no humano. Não criamos apenas ferramentas — criamos companhias diárias, lembretes de que você merece paz, clareza e presença.
                                Nossa missão é também quebrar o estigma em torno da saúde mental. Falamos de emoções com leveza e profundidade, promovendo uma cultura onde sentir é permitido, pedir ajuda é sinal de força e cuidar de si é um ato de coragem.
                            </p>
                        </div>

                        <div className="section-div">
                            <img src={ourMission} />
                        </div>
                    </div>

                    <span className="line"></span>

                    <div className='section-box__more-about'>
                        <p>Na StarSoul, nossa missão é ser mais do que uma plataforma — queremos ser sua aliada silenciosa, sempre ao seu lado nos altos e baixos da vida. Porque cuidar da mente não é luxo: é necessidade, é direito, é um ato de amor-próprio.</p>
                    </div>
                </div>
            </section>


        </main>
    )
}

export default AboutUs;