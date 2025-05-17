import { useContent } from '../../../../shared/hooks/useContent';
import { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.scss'
import LoadingContent from '../../components/LoadingContent';
import ErrorFoundPage from '../../../../shared/components/ErrorFoundPage';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { listarFavoritos, favoritarConteudo, desfavoritarConteudo, registrarAcesso } from "../../../../api/content-user.api";

function ContentPage() {
    const { id } = useParams();
    const { contents, globalLoading } = useContent();
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const isDraggingRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isDelayedLoading, setIsDelayedLoading] = useState(true);
    const { token } = useContext(AuthContext);
    const [favorito, setFavorito] = useState(false);

    const content = contents.find(c => c.id === Number(id));

    useEffect(() => {
        setIsDelayedLoading(true);
        const timeout = setTimeout(() => {
            setIsDelayedLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [id]);

    useEffect(() => {
        if (id && token) {
            listarFavoritos(token)
                .then(favoritos => {
                    console.log("Favoritos retornados:", favoritos); // opcional para debug
                    const estaFavoritado = favoritos.some(
                        fav => String(fav.conteudo.id) === String(id)
                    );
                    setFavorito(estaFavoritado);
                })
                .catch(err => console.error("Erro ao listar favoritos", err));
        }
    }, [id, token]);



    useEffect(() => {
        if (content && token) {
            registrarAcesso(content.id, token)
                .then(() => console.log("Acesso registrado"))
                .catch(err => console.error("Erro ao registrar acesso", err));
        }
    }, [content?.id, token]);




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


    const getEmbedUrl = (url) => {
        try {
            const videoId = new URL(url).searchParams.get("v");
            return `https://www.youtube.com/embed/${videoId}`;
        } catch {
            return null;
        }
    };

    const getYouTubeThumbnail = (url) => {
        try {
            const videoId = new URL(url).searchParams.get("v");
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } catch {
            return null;
        }
    };

    const handleOpenContent = (content, e) => {
        if (isDraggingRef.current) {
            return;
        }

        navigate(`/app/content/${content.id}`, {
            state: {
                titulo: content.titulo,
                videoUrl: content.arquivoUrl,
                descricao: content.descricao,
            }
        });
    };

    if (globalLoading || isDelayedLoading || !contents || contents.length === 0) {
        return <LoadingContent />;
    }

    if (!content) {
        return <ErrorFoundPage />;
    };

    const meditacoesRelacionadas = contents.filter(otherContent =>
        otherContent.id !== content.id &&
        otherContent.categorias?.some(categoria =>
            content.categorias?.includes(categoria)
        )
    );

    const toggleFavorito = async () => {
        try {
            if (favorito) {
                await desfavoritarConteudo(content.id, token);
            } else {
                await favoritarConteudo(content.id, token);
            }

            const favoritos = await listarFavoritos(token);
            const estaFavoritado = favoritos.some(
                fav => String(fav.conteudo.id) === String(content.id)
            );
            setFavorito(estaFavoritado);

        } catch (err) {
            console.error("Erro ao favoritar/desfavoritar conteúdo", err);
        }
    };


    return (
        <main className='content-page__container' >
            <div className="content-page__content">
                <div className='video-container'>
                    <iframe
                        className='iframe'
                        src={getEmbedUrl(content.arquivoUrl)}
                        title={content.titulo}
                        allowFullScreen
                    />
                </div>
                <div className='video-info'>
                    <p className='video-info--title'>{content.titulo}</p>
                    <div className='video-info__box'>
                        <p className='video-info__box--categories'>{content.categorias}</p>
                        {content.tags?.length > 0 && (
                            <p className='video-info__box--tags'>{content.tags.join(', ')}</p>
                        )}

                    </div>
                    {/* <p className='video-info--description'>{content.descricao}</p> */}
                    <p className='video-info--description'>
                        {content.descricao ? content.descricao : 'Desconecte-se do mundo exterior e reconecte-se com sua paz interior. Esta sessão de meditação guiada foi cuidadosamente elaborada para ajudá-lo a relaxar, reduzir o estresse e cultivar a atenção plena. Seja você um iniciante ou um praticante experiente, encontre neste espaço um momento de tranquilidade e bem-estar. Permita-se respirar profundamente e embarcar nesta jornada de serenidade.'}
                    </p>

                    <button onClick={toggleFavorito}>
                        {favorito ? "★ Favoritado" : "☆ Favoritar"}
                    </button>
                </div>
            </div>

            <div className='content-page__related'>
                <p className='content-page__related--p'>Conteúdos relacionados: </p>

                <div
                    className={`content-page__contents ${isDragging ? 'dragging' : ''}`}
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {meditacoesRelacionadas.length > 0 ? (
                        meditacoesRelacionadas.map(content => (
                            <div key={content.id} className="content__card" onClick={(e) => handleOpenContent(content, e)}>
                                <img
                                    src={getYouTubeThumbnail(content.arquivoUrl)}
                                    alt={`Capa de ${content.titulo}`}
                                    className="content__thumbnail"
                                    draggable={false}
                                />
                                <div className="content__info">
                                    <p>{content.titulo}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#c0c0c0", fontStyle: 'italic' }}>Nenhuma meditação relacionada encontrada.</p>
                    )}
                </div>
            </div>
        </main>
    );
}

export default ContentPage