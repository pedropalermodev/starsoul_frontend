import { useContent } from '../../../../shared/hooks/useContent';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';
import LoadingContent from '../../components/LoadingContent';
import ErrorFoundPage from '../../../../shared/components/ErrorFoundPage';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { listarFavoritos, favoritarConteudo, desfavoritarConteudo, registrarAcesso } from "../../../../api/content-user.api";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function SoundPage() {
    const { id } = useParams();
    const { contents, globalLoading } = useContent();
    const { token } = useContext(AuthContext);
    const [favorito, setFavorito] = useState(false);
    const [soundContent, setSoundContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const fetchedContent = contents.find(c => c.id === Number(id));

        // *** CORREÇÃO AQUI: USANDO 'tipoConteudo' ***
        if (fetchedContent && fetchedContent.tipoConteudo === 'Audio') {
            setSoundContent(fetchedContent);
            setIsLoading(false);
        } else if (globalLoading) {
            // Ainda carregando do useContent, espera
            return;
        } else {
            // Conteúdo não encontrado ou não é do tipo 'Audio'
            setSoundContent(null);
            setError("Conteúdo de áudio não encontrado ou tipo incorreto. Por favor, verifique a URL.");
            setIsLoading(false);
        }

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Ajuste o tempo conforme necessário

        return () => clearTimeout(timeout);

    }, [id, contents, globalLoading]); // Dependências incluem contents e globalLoading

    useEffect(() => {
        if (id && token) {
            listarFavoritos(token)
                .then(favoritos => {
                    console.log("Favoritos retornados:", favoritos); // opcional para debug
                    const estaFavoritado = favoritos.some(
                        fav => String(fav.soundContent?.id) === String(id)
                    );
                    setFavorito(estaFavoritado);
                })
                .catch(err => console.error("Erro ao listar favoritos", err));
        }
    }, [id, token]);

    // Função para converter uma URL de playlist do Spotify para uma URL de embed
    const getSpotifyEmbedUrl = (spotifyUrl) => {
        if (!spotifyUrl) return null;

        try {
            // Regex para extrair o ID da playlist de diferentes formatos de URL do Spotify
            const playlistIdMatch = spotifyUrl.match(/playlist\/([a-zA-Z0-9]+)/);
            const albumIdMatch = spotifyUrl.match(/album\/([a-zA-Z0-9]+)/);
            const trackIdMatch = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
            const artistIdMatch = spotifyUrl.match(/artist\/([a-zA-Z0-9]+)/);

            let embedType = '';
            let embedId = '';

            if (playlistIdMatch && playlistIdMatch[1]) {
                embedType = 'playlist';
                embedId = playlistIdMatch[1];
            } else if (albumIdMatch && albumIdMatch[1]) {
                embedType = 'album';
                embedId = albumIdMatch[1];
            } else if (trackIdMatch && trackIdMatch[1]) {
                embedType = 'track';
                embedId = trackIdMatch[1];
            } else if (artistIdMatch && artistIdMatch[1]) {
                embedType = 'artist';
                embedId = artistIdMatch[1];
            } else {
                // Se nenhum tipo conhecido for encontrado, retorna null
                console.warn("URL do Spotify não reconhecida para embed:", spotifyUrl);
                return null;
            }

            // Construir a URL de embed do Spotify
            // Pode ajustar o "theme" para 0 (escuro) ou 1 (claro)
            // Também pode adicionar 'autoplay=1' se quiser que toque automaticamente
            return `https://open.spotify.com/embed/${embedType}/${embedId}?utm_source=generator&theme=0`;
        } catch (e) {
            console.error("Erro ao gerar URL de embed do Spotify:", e);
            return null;
        }
    };


    // --- Renderização Condicional ---
    if (isLoading || globalLoading) { // Usa o loading global do useContent também
        return <LoadingContent />;
    }

    if (error) { // Se houver um erro específico (ex: URL inválida)
        return <ErrorFoundPage message={error} />;
    }

    // Usamos 'soundContent' agora, não 'sound'
    if (!soundContent) { // Se o som não for encontrado após o carregamento
        return <ErrorFoundPage message="Conteúdo de áudio não encontrado." />;
    }

    const embedSrc = getSpotifyEmbedUrl(soundContent.arquivoUrl);

    if (!embedSrc || !soundContent || soundContent.tipoConteudo !== 'Audio') {
        return <ErrorFoundPage />;
    }

    const toggleFavorito = async () => {
        try {
            if (favorito) {
                await desfavoritarConteudo(soundContent.id, token);
            } else {
                await favoritarConteudo(soundContent.id, token);
            }

            const favoritos = await listarFavoritos(token);
            const estaFavoritado = favoritos.some(
                fav => String(fav.conteudo.id) === String(soundContent.id)
            );
            setFavorito(estaFavoritado);

        } catch (err) {
            console.error("Erro ao favoritar/desfavoritar conteúdo", err);
        }
    };

    return (
        <main className='sound-page__container'>
            <div className='sound-page__content'>
                <div className='sound-container'>
                    <p className="preview-warning">
                        * Apenas prévia de 30 segundos disponível. Ouça a faixa completa no <a href={soundContent.arquivoUrl} target="_blank" rel="noopener noreferrer">Spotify</a>.
                    </p>

                    <iframe
                        title={`Spotify Player: ${soundContent.titulo}`}
                        src={embedSrc}
                        frameBorder="0"
                        allow="encrypted-media"
                        loading="lazy"
                    />
                    <a
                        href={soundContent.arquivoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="spotify-link-button"
                    >
                        Ouvir no Spotify
                    </a>

                </div>

                <div className='sound-info'>

                    <div className='sound-title-favorite'>
                        <p className='sound-info--title'>{soundContent.titulo}</p>
                        <motion.button
                            onClick={toggleFavorito}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className='button-motion'
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {favorito ? (
                                    <motion.span
                                        key="filled"
                                        initial={{ scale: 0.3, opacity: 0.8 }}
                                        animate={{ scale: 1.3, opacity: 1 }}
                                        exit={{ scale: 0.3, opacity: 0.8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 12 }}
                                        style={{
                                            color: "red",
                                            fontSize: "2.2rem",
                                            filter: "drop-shadow(0 0 4px rgba(255,0,0,0.4))",
                                        }}
                                    >
                                        <AiFillHeart style={{ width: '20px', height: '20px' }} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="outline"
                                        initial={{ scale: 0.3, opacity: 0.8 }}
                                        animate={{ scale: 1.3, opacity: 1 }}
                                        exit={{ scale: 0.3, opacity: 0.8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 12 }}
                                        style={{
                                            color: "gray",
                                            fontSize: "2.2rem",
                                            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.2))",
                                        }}
                                    >
                                        <AiOutlineHeart style={{ width: '20px', height: '20px' }} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    <div className='sound-info__box'>
                        <div className='categories'>
                            {soundContent.categorias?.map((cat, index) => (
                                <p key={index} className='sound-info__box--categories'>
                                    {cat}
                                </p>
                            ))}
                        </div>

                        <div className='tags'>
                            {soundContent.tags?.map((tag, index) => (
                                <p key={index} className='sound-info__box--tags'>
                                    {tag}
                                </p>
                            ))}
                        </div>
                    </div>


                    <p className='sound-info--description'>
                        {soundContent.descricao ? soundContent.descricao : 'Desconecte-se do mundo exterior e reconecte-se com sua paz interior. Esta sessão foi cuidadosamente elaborada para ajudá-lo a relaxar, reduzir o estresse e cultivar a atenção plena. Seja você um iniciante ou um praticante experiente, encontre neste espaço um momento de tranquilidade e bem-estar. Permita-se respirar profundamente e embarcar nesta jornada de serenidade.'}
                    </p>
                </div>
            </div>
        </main>
    );
}

export default SoundPage;