import { useState } from 'react';
import './styles.scss'

import { IoIosArrowDown } from "react-icons/io";
import faqElement from '../../assets/faq/faq-element.svg'

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = index => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <main className="faq">
            <div className='faq__hero container-faq'>
                <div className='hero-box content-faq'>
                    <div className='hero-box__image'>
                        <img src={faqElement} />
                    </div>
                    <div className='div-box'>
                        <h1 className='div-box__intro'>Perguntas e respostas frequentes</h1>
                        <div className='div-box__content'>
                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 0 ? 'active' : ''}`} onClick={() => toggleFAQ(0)}>
                                    O que é a StarSoul?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 0 ? '200px' : '0' }}>
                                    <p>A StarSoul é uma plataforma dedicada ao bem-estar mental e emocional, oferecendo meditações guiadas, artigos, exercícios e músicas relaxantes para ajudar você a encontrar paz e equilíbrio em sua vida diária.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 1 ? 'active' : ''}`} onClick={() => toggleFAQ(1)}>
                                    Como a StarSoul pode me ajudar?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 1 ? '200px' : '0' }}>
                                    <p>A StarSoul fornece ferramentas para reduzir o estresse, melhorar a concentração e promover o relaxamento. Nossas meditações guiadas e exercícios são desenvolvidos por especialistas em bem-estar.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 2 ? 'active' : ''}`} onClick={() => toggleFAQ(2)}>
                                    Como faço para começar a usar a StarSoul?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 2 ? '200px' : '0' }}>
                                    <p>Baixe o aplicativo StarSoul na App Store ou Google Play, crie uma conta gratuita e comece a explorar nossos recursos, como meditações, artigos e exercícios de bem-estar.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 3 ? 'active' : ''}`} onClick={() => toggleFAQ(3)}>
                                    A StarSoul é gratuito?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 3 ? '200px' : '0' }}>
                                    <p>Sim! A StarSoul é totalmente gratuita. Você terá acesso a todo o conteúdo sem qualquer necessidade de assinatura ou pagamento.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 4 ? 'active' : ''}`} onClick={() => toggleFAQ(4)}>
                                    Como faço para acessar as meditações?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 4 ? '200px' : '0' }}>
                                    <p>Após fazer login no aplicativo, navegue até a seção de meditações no menu principal. Lá, você encontrará uma variedade de meditações guiadas que pode começar a qualquer momento.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 5 ? 'active' : ''}`} onClick={() => toggleFAQ(5)}>
                                    Quais tipos de meditações estão disponíveis na StarSoul?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 5 ? '200px' : '0' }}>
                                    <p>Oferecemos uma variedade de meditações, como atenção plena, relaxamento, foco, sono e muito mais, todas adaptadas para atender diferentes necessidades.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 6 ? 'active' : ''}`} onClick={() => toggleFAQ(6)}>
                                    Quanto tempo duram as meditações?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 6 ? '200px' : '0' }}>
                                    <p>As meditações variam de 5 a 30 minutos, permitindo que você escolha a duração que melhor se adapta ao seu tempo e necessidade.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 7 ? 'active' : ''}`} onClick={() => toggleFAQ(7)}>
                                    Posso ouvir as meditações offline?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 7 ? '200px' : '0' }}>
                                    <p>Atualmente, a StarSoul funciona apenas online, mas estamos trabalhando em recursos futuros que permitirão o uso offline.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 8 ? 'active' : ''}`} onClick={() => toggleFAQ(8)}>
                                    Estou tendo problemas técnicos com o aplicativo. O que devo fazer?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 8 ? '200px' : '0' }}>
                                    <p>Verifique se está utilizando a versão mais recente do aplicativo. Se o problema persistir, entre em contato com o suporte via suporte@starsoul.com.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 9 ? 'active' : ''}`} onClick={() => toggleFAQ(9)}>
                                    Como a StarSoul protege minha privacidade?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 9 ? '200px' : '0' }}>
                                    <p>Levamos sua privacidade a sério. Utilizamos criptografia para proteger seus dados pessoais e garantimos a segurança de suas informações.</p>
                                </div>
                            </div>

                            <div className='faq-item'>
                                <button className={`faq-item-button ${activeIndex === 10 ? 'active' : ''}`} onClick={() => toggleFAQ(10)}>
                                    Minhas informações de meditação são compartilhadas com terceiros?
                                    <IoIosArrowDown className='arrow' />
                                </button>
                                <div className='faq-item-content' style={{ maxHeight: activeIndex === 10 ? '200px' : '0' }}>
                                    <p>Não. Suas informações de meditação são privadas e não são compartilhadas com terceiros.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}

export default FAQ;