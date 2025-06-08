import React, { useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { useContent } from '../../../../shared/hooks/useContent';
import { CiSearch } from "react-icons/ci";
import LoadingPage from '../../../../shared/components/LoadingPage'

import './styles.scss';

import AccordionList from '../../components/Accordion';
import cta from '../../assets/home/cta-app.png'
import ctaMobile from '../../assets/home/cta-mobile.png'

import downloadOnAppStore from '../../../../assets/shared/download-on-appleStore_versionWhite.svg';
import downloadOnPlayStore from '../../../../assets/shared/download-on-googlePlay_versionWhite.svg';


function Home() {
    const { userData, globalLoading } = useContext(AuthContext);
    const { contents, loading, fetchContents } = useContent();

    const [currentFrase, setCurrentFrase] = useState(null);
    const [currentFraseIndex, setCurrentFraseIndex] = useState(0);
    const [animateClass, setAnimateClass] = useState('');

    const navigate = useNavigate();
    const { scrollRef: scrollRefMed, isDraggingRef: isDraggingRefMed } = useHorizontalScroll();
    const { scrollRef: scrollRefSpo, isDraggingRef: isDraggingRefSpo } = useHorizontalScroll();

    const handleOpenContent = useCallback((content) => {
        if (isDraggingRefMed.current) return;

        if (content.formato === 'Audio') {
            window.location.href = content.url;
        } else {
            navigate(`/app/content/${content.id}`, {
                state: {
                    titulo: content.titulo,
                    videoUrl: content.url,
                    descricao: content.descricao,
                },
            });
        }
    }, [isDraggingRefMed, navigate]);

    const frasesMotivacionais = React.useMemo(() => {
        return contents.filter(content =>
            content.tags?.includes('Frases motivacionais') && content.formato === 'Texto'
        );
    }, [contents]);

    const meditacaoManha = contents.filter(content =>
        content.categorias?.includes('Meditação para manhã') && content.formato !== 'Audio'
    );

    const spotifyPlaylists = useMemo(() => { // Use useMemo para evitar recalcular em cada renderização
        return contents.filter(content => content.formato === 'Audio');
    }, [contents])


    useEffect(() => {
        if (frasesMotivacionais.length > 0) {
            setCurrentFrase(frasesMotivacionais[currentFraseIndex]);

            const intervalId = setInterval(() => {
                setCurrentFraseIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % frasesMotivacionais.length;
                    return nextIndex;
                });
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [frasesMotivacionais, currentFraseIndex]);

    useEffect(() => {
        if (frasesMotivacionais.length > 0) {
            setAnimateClass('fade-out');

            const timeoutId = setTimeout(() => {
                setCurrentFrase(frasesMotivacionais[currentFraseIndex]);
                setAnimateClass('fade-in');
            }, 150);

            return () => clearTimeout(timeoutId);
        }
    }, [currentFraseIndex, frasesMotivacionais]);

    useEffect(() => {
        if (frasesMotivacionais.length > 0) {
            setCurrentFrase(frasesMotivacionais[currentFraseIndex]);
        }
    }, [currentFraseIndex, frasesMotivacionais]);


    const primeiroNome = useMemo(() => {
        return userData?.nome ? userData.nome.split(' ')[0] : 'Usuário';
    }, [userData]);

    if (globalLoading || loading || !userData) {
        return <LoadingPage message="Carregando..." />;
    }

    const getYouTubeThumbnail = (url) => {
        try {
            const videoId = new URL(url).searchParams.get("v");
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } catch {
            return null;
        }
    };

    return (
        <main className='home-app__container'>
            <div className='home-app__content'>
                <div className='home-app__welcome'>
                    <p className='home-app__welcome--name'>Olá, {userData.apelido ? userData.apelido : primeiroNome}!</p>
                    <p className='home-app__welcome--text'>Veja o que preparamos para você hoje.</p>
                </div>
                {/* <div className='home-app__search'>
                    <input className='home-app__search--input' type="text" placeholder='Pesquisar...' />
                    <button className='home-app__search--button'><CiSearch /></button>
                </div> */}
            </div>

            <div className='box-div'>
                {currentFrase ? (
                    <div
                        key={currentFrase.id}
                        className={`box-div--text ${animateClass}`}
                    >
                        <p>"{currentFrase.titulo}"</p>
                    </div>
                ) : (
                    <div className='box-div--text'>
                        <p>Carregando frases motivacionais...</p>
                    </div>
                )}
            </div>

            <div className="content-box">
                <p>Meditações para manhâ: </p>
                <div
                    className={`home-app__contents ${isDraggingRefMed.current ? 'dragging' : ''}`}
                    ref={scrollRefMed}
                >
                    {meditacaoManha.map(content => (
                        <div
                            key={content.id}
                            className="content__card"
                            onClick={() => handleOpenContent(content)}
                        >
                            <img
                                src={getYouTubeThumbnail(content.url)}
                                alt={`Capa de ${content.titulo}`}
                                className="content__thumbnail"
                                draggable={false}
                            />
                            <div className="content__info">
                                <p>{content.titulo}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {spotifyPlaylists.length > 0 && (
                <div className="content-box">
                    <p>Playlists do Spotify:</p>
                    <div
                        className={`home-app__contents ${isDraggingRefSpo.current ? 'dragging' : ''}`}
                        ref={scrollRefSpo}
                    >
                        {spotifyPlaylists.map(playlist => (
                            <div
                                key={playlist.id}
                                className="sound__card"
                                onClick={() => handleOpenContent(playlist)}
                            >
                                {/* Para áudios, o caminhoMiniatura pode ser a capa da playlist/álbum */}
                                <img
                                    src={"https://blog.trocafone.com/wp-content/uploads/2019/12/spotify.blog_-1200x640.jpg"} // Usando favicon do Spotify como placeholder
                                    alt={`Playlist do Spotify: ${playlist.titulo}`}
                                    className="sound__thumbnail"
                                    draggable={false}
                                />
                                <div className="content__info">
                                    <p>{playlist.titulo}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* <div className="home-app__details">
                <div className="home-app__details-box">
                    <AccordionList />
                </div>
                <div className="home-app__details-box">
                    <p>Imagem</p>
                </div>
            </div> */}

            <div className="home-app__details">
                <div className="home-app__details-box">
                    <img src={cta} alt="" />
                    <img src={ctaMobile} alt="" />

                </div>

                <div className="home-app__details-box">
                    <p className='home-app__details-box--text'>Receba conteúdos novos e exclusivos com notificações instantâneas. Baixe agora e transforme sua experiência!</p>
                    <div>
                        <img src={downloadOnAppStore} alt="" />
                        <img src={downloadOnPlayStore} alt="" />
                    </div>
                </div>
            </div>

        </main>
    );
}

export default Home;