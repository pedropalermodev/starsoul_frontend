import './styles.scss'
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { useContent } from '../../../../shared/hooks/useContent';

const useHorizontalScroll = () => {
    const [isDragging, setIsDragging] = useState(false);
    const scrollRef = useRef(null);
    const isDraggingRef = useRef(false);

    const handleMouseDown = useCallback((e) => {
        isDraggingRef.current = false;
        setIsDragging(true);

        const slider = scrollRef.current;
        slider.dataset.mouseDown = 'true';
        slider.dataset.startX = e.pageX;
        slider.dataset.scrollLeft = slider.scrollLeft;
    }, []);

    const handleMouseMove = useCallback((e) => {
        const slider = scrollRef.current;
        if (slider.dataset.mouseDown !== 'true') return;

        e.preventDefault();
        isDraggingRef.current = true;

        const x = e.pageX;
        const walk = (x - slider.dataset.startX) * 2;
        slider.scrollLeft = slider.dataset.scrollLeft - walk;
    }, []);

    const handleMouseUp = useCallback(() => {
        const slider = scrollRef.current;
        slider.dataset.mouseDown = 'false';
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mousemove', handleMouseMove);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mouseleave', handleMouseUp);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mousemove', handleMouseMove);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp]);

    return { scrollRef, isDragging };
};

function Explore() {
    const [mensagem, setMensagem] = useState('');
    const { contents, loading, fetchContents } = useContent();
    const { userData } = useContext(AuthContext);

    const [currentFrase, setCurrentFrase] = useState(null);
    const [currentFraseIndex, setCurrentFraseIndex] = useState(0);
    const [animateClass, setAnimateClass] = useState('');

    const primeiroNome = userData?.nome?.split(' ')[0] || 'Visitante';

    const navigate = useNavigate();
    const { scrollRef: scrollRefMed, isDragging: isDraggingMed } = useHorizontalScroll();
    const { scrollRef: scrollRefMed1, isDragging: isDraggingMed1 } = useHorizontalScroll();
    const { scrollRef: scrollRefMed2, isDragging: isDraggingMed2 } = useHorizontalScroll();


    const handleOpenContent = useCallback((content) => {
        if (isDraggingMed) return; // Impede a navegação se estiver arrastando

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
    }, [isDraggingMed, navigate]);

    const frasesMotivacionais = React.useMemo(() => {
        return contents.filter(content =>
            content.tags?.includes('Frases motivacionais') && content.formato === 'Texto'
        );
    }, [contents]);

    useEffect(() => {
        const horaAtual = new Date().getHours();

        if (horaAtual >= 6 && horaAtual < 12) {
            setMensagem('Bom Dia');
        } else if (horaAtual >= 12 && horaAtual < 18) {
            setMensagem('Boa Tarde');
        } else {
            setMensagem('Boa Noite');
        }
    }, []);

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

    const meditacaoManha = contents.filter(content =>
        content.categorias?.includes('Meditação para manhã') && content.formato !== 'Audio'
    );

    const destaque = contents.filter(content =>
        content.tags?.includes('Destaque') && content.formato !== 'Audio'
    );

    const meditacaoAliviarStress = contents.filter(content =>
        content.categorias?.includes('Meditação para aliviar extresse') && content.formato !== 'Audio'
    );
    const spotifyPlaylists = contents.filter(content => content.formato === 'Audio');


    const getYouTubeThumbnail = (url) => {
        try {
            const videoId = new URL(url).searchParams.get("v");
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } catch {
            return null;
        }
    };


    return (
        <main className="explore-app__container">
            <div className="explore-app__content">
                <div className='explore-app__header'>
                    <div className='explore-app__welcome'>
                        <p className='explore-app__welcome--name'>Explorar</p>
                        <p className='explore-app__welcome--text'>A Arte de Navegar pelo Desconhecido: Uma Viagem ao Coração da Inovação.</p>
                    </div>

                    <div className='explore-app__content-box'>
                        <div className='box-div'>
                            <div className='box-div--text'>
                                <h1>{mensagem}, {userData?.apelido ? userData.apelido : primeiroNome}!</h1>
                                <p>Jornadas de Descoberta: Desvendando o Novo e o Inesperado.</p>
                            </div>
                        </div>
                        {/* <div className='box-div'>
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
                        </div> */}
                    </div>
                </div>

                <div className='content-box'>
                    <p>Em destaque: </p>
                    <div
                        className={`explore-app__contents-box ${isDraggingMed ? 'dragging' : ''}`}
                        ref={scrollRefMed}
                    >
                        {destaque.map(content => (
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

                <div className='content-box'>
                    <p>Meditações para aliviar o stress do dia-a-dia: </p>
                    <div
                        className={`explore-app__contents-box ${isDraggingMed1 ? 'dragging' : ''}`}
                        ref={scrollRefMed1}
                    >
                        {meditacaoAliviarStress.map(content => (
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

                <div className='content-box'>
                    <p>Meditações e playlists relaxantes: </p>
                    <div
                        className={`explore-app__contents-box ${isDraggingMed2 ? 'dragging' : ''}`}
                        ref={scrollRefMed2}
                    >
                        {spotifyPlaylists.map(playlist => (
                            <div
                                key={playlist.id}
                                className="sound__card"
                                onClick={() => handleOpenContent(playlist)}
                            >
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

            </div>

        </main>
    );
}

export default Explore;