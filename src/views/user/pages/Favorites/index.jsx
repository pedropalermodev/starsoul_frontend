import './styles.scss'
import { useContext, useEffect, useState } from 'react';
import { desfavoritarConteudo, listarFavoritos } from "../../../../api/historico.api";
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import LoadingContent from '../../components/LoadingContent';
import { Link } from 'react-router-dom';
import { IoRemoveOutline, IoHeartDislikeSharp } from 'react-icons/io5';

function Favorites() {
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const fetchFavoritos = async () => {
            setIsLoading(true);
            try {
                const data = await listarFavoritos(token);
                setFavoritos(data);
            } catch (error) {
                console.error("Erro ao buscar favoritos", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoritos();
    }, [token]);

    const handleDesfavoritar = async (conteudoId) => {
        try {
            await desfavoritarConteudo(conteudoId, token);
            setFavoritos(favoritos.filter(item => item.conteudo.id !== conteudoId));
        } catch (err) {
            console.error("Erro ao desfavoritar conteúdo", err);
        }
    };


    if (isLoading) {
        return <LoadingContent />;
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
        <main className="favorite-app">
            <div className='favorite-app__content'>
                <p className='favorite-app__content--title-page'>Meus Favoritos</p>
            </div>

            <div className='favorite-app__favorites'>
                {favoritos.length === 0 ? (
                    <div className="favorite-app__empty">
                        <IoHeartDislikeSharp size={48} color="#fff" />
                        <p>Você ainda não favoritou nenhum conteúdo.</p>
                        <Link to="/app/explore" className="favorite-app__empty-link">Explore nosso conteúdo!</Link>
                    </div>
                ) : (
                    <div className="favorite-app__grid">
                        {favoritos.map((item) => (
                            <div key={item.conteudo.id} className="favorito-item">
                                <Link
                                    to={`/app/content/${item.conteudo.id}`}
                                    className="favorito-item__link"
                                >
                                    <img
                                        src={getYouTubeThumbnail(item.conteudo.url)}
                                        alt={`Capa de ${item.conteudo.titulo}`}
                                        draggable={false}
                                    />
                                    <p className="favorito-item__title">{item.conteudo.titulo}</p>
                                    {item.conteudo.categorias && (
                                        <p className="favorito-item__category">
                                            {item.conteudo.categorias?.[0]?.categoria?.nome ?? 'Sem categoria'}
                                        </p>
                                    )}
                                </Link>
                                <div
                                    onClick={() => handleDesfavoritar(item.conteudo.id)}
                                    className='unfavorite-button'
                                >
                                    <IoRemoveOutline />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Favorites;