import { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { useContent } from '../../../../shared/hooks/useContent';
import { CiSearch } from "react-icons/ci";

import './styles.scss';

import AccordionList from '../../components/Accordion';
import cta from '../../assets/home/cta-app.png'
import downloadOnAppStore from '../../../../assets/shared/download-on-appleStore_versionWhite.svg';
import downloadOnPlayStore from '../../../../assets/shared/download-on-googlePlay_versionWhite.svg';

function Home() {
    const { userData, globalLoading } = useContext(AuthContext);
    const { contents } = useContent();

    const navigate = useNavigate();

    if (globalLoading) return <p>Loading...</p>;
    if (!userData) return <p>Dados do usuário não encontrados.</p>;

    const nomes = userData.nome.split(' ');
    const primeiroNome = nomes[0];

    const meditacaoManha = contents.filter(content =>
        content.categorias?.includes('Meditação para manhã') && content.tipoConteudo !== 'Audio'
    );

    const getYouTubeThumbnail = (url) => {
        try {
            const videoId = new URL(url).searchParams.get("v");
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } catch {
            return null;
        }
    };

    const scrollRef = useRef(null);
    const isDraggingRef = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        isDraggingRef.current = false;
        setIsDragging(true);

        const slider = scrollRef.current;
        slider.dataset.mouseDown = 'true';
        slider.dataset.startX = e.pageX;
        slider.dataset.scrollLeft = slider.scrollLeft;
    };

    const handleMouseMove = (e) => {
        const slider = scrollRef.current;
        if (slider.dataset.mouseDown !== 'true') return;

        e.preventDefault();
        isDraggingRef.current = true;

        const x = e.pageX;
        const walk = (x - slider.dataset.startX) * 2;
        slider.scrollLeft = slider.dataset.scrollLeft - walk;
    };

    const handleMouseUp = () => {
        const slider = scrollRef.current;
        slider.dataset.mouseDown = 'false';
        setIsDragging(false);
    };

    const scrollRefMed = useRef(null);
    const scrollRefSpotify = useRef(null);

    const isDraggingRefMed = useRef(false);
    const isDraggingRefSpotify = useRef(false);

    const [isDraggingMed, setIsDraggingMed] = useState(false);
    const [isDraggingSpotify, setIsDraggingSpotify] = useState(false);

    // Criar handlers separados para cada lista

    const handleMouseDownMed = (e) => {
        isDraggingRefMed.current = false;
        setIsDraggingMed(true);

        const slider = scrollRefMed.current;
        slider.dataset.mouseDown = 'true';
        slider.dataset.startX = e.pageX;
        slider.dataset.scrollLeft = slider.scrollLeft;
    };

    const handleMouseMoveMed = (e) => {
        const slider = scrollRefMed.current;
        if (slider.dataset.mouseDown !== 'true') return;

        e.preventDefault();
        isDraggingRefMed.current = true;

        const x = e.pageX;
        const walk = (x - slider.dataset.startX) * 2;
        slider.scrollLeft = slider.dataset.scrollLeft - walk;
    };

    const handleMouseUpMed = () => {
        const slider = scrollRefMed.current;
        slider.dataset.mouseDown = 'false';
        setIsDraggingMed(false);
    };

    const handleMouseDownSpotify = (e) => {
        isDraggingRefSpotify.current = false;
        setIsDraggingSpotify(true);

        const slider = scrollRefSpotify.current;
        slider.dataset.mouseDown = 'true';
        slider.dataset.startX = e.pageX;
        slider.dataset.scrollLeft = slider.scrollLeft;
    };

    const handleMouseMoveSpotify = (e) => {
        const slider = scrollRefSpotify.current;
        if (slider.dataset.mouseDown !== 'true') return;

        e.preventDefault();
        isDraggingRefSpotify.current = true;

        const x = e.pageX;
        const walk = (x - slider.dataset.startX) * 2;
        slider.scrollLeft = slider.dataset.scrollLeft - walk;
    };

    const handleMouseUpSpotify = () => {
        const slider = scrollRefSpotify.current;
        slider.dataset.mouseDown = 'false';
        setIsDraggingSpotify(false);
    };


    const handleOpenContent = (content) => {
        if (isDraggingRef.current) return;

        if (content.tipoConteudo === 'Audio') {
            window.location.href = content.arquivoUrl;
        } else {
            navigate(`/app/content/${content.id}`, {
                state: {
                    titulo: content.titulo,
                    videoUrl: content.arquivoUrl,
                    descricao: content.descricao,
                }
            });
        }
    };

    // Filtrar conteúdos do Spotify (agora como tipoConteudo: "Audio")
    const spotifyPlaylists = contents.filter(content => content.tipoConteudo === 'Audio');

    return (
        <main className='home-app__container'>
            <div className='home-app__content'>
                <div className='home-app__welcome'>
                    <p className='home-app__welcome--name'>Olá, {userData.apelido ? userData.apelido : primeiroNome}!</p>
                    <p className='home-app__welcome--text'>Veja o que preparamos para você hoje.</p>
                </div>
                <div className='home-app__search'>
                    <input className='home-app__search--input' type="text" placeholder='Pesquisar...' />
                    <button className='home-app__search--button'><CiSearch /></button>
                </div>
            </div>

            <p>Teste</p>

            <div className="content-box">
                <p>Meditações para manhâ: </p>
                <div
                    className={`home-app__contents ${isDraggingMed ? 'dragging' : ''}`}
                    ref={scrollRefMed}
                    onMouseDown={handleMouseDownMed}
                    onMouseMove={handleMouseMoveMed}
                    onMouseUp={handleMouseUpMed}
                >
                    {meditacaoManha.map(content => (
                        <div
                            key={content.id}
                            className="content__card"
                            onClick={() => handleOpenContent(content)}
                        >
                            {/* Assumimos que o caminhoMiniatura será usado para conteúdos não-áudio */}
                            <img
                                src={content.caminhoMiniatura || getYouTubeThumbnail(content.arquivoUrl)}
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

            {/* Nova seção para playlists do Spotify (tipoConteudo: "Audio") */}
            {spotifyPlaylists.length > 0 && (
                <div className="content-box">
                    <p>Playlists do Spotify:</p>
                    <div
                        className={`home-app__contents ${isDraggingSpotify ? 'dragging' : ''}`}
                        ref={scrollRefSpotify}
                        onMouseDown={handleMouseDownSpotify}
                        onMouseMove={handleMouseMoveSpotify}
                        onMouseUp={handleMouseUpSpotify}
                    >
                        {spotifyPlaylists.map(playlist => (
                            <div
                                key={playlist.id}
                                className="sound__card"
                                onClick={() => handleOpenContent(playlist)}
                            >
                                {/* Para áudios, o caminhoMiniatura pode ser a capa da playlist/álbum */}
                                <img
                                    src={playlist.caminhoMiniatura || "https://blog.trocafone.com/wp-content/uploads/2019/12/spotify.blog_-1200x640.jpg"} // Usando favicon do Spotify como placeholder
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