import { useContext, useState } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { useContent } from '../../../../shared/hooks/useContent';
import { CiSearch } from "react-icons/ci";
import './styles.scss';

function Home() {
    const { userData, globalLoading } = useContext(AuthContext);
    const { contents } = useContent();

    if (globalLoading) return <p>Loading...</p>;
    if (!userData) return <p>Dados do usuário não encontrados.</p>;

    const nomes = userData.nome.split(' ');
    const primeiroNome = nomes[0];

    const meditacaoManha = contents.filter(content =>
        content.categorias?.includes('Meditação para manhã')
    );

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
                    <p className='home-app__welcome--name'>Olá, {primeiroNome}!</p>
                    <p className='home-app__welcome--text'>Veja o que preparamos para você hoje.</p>
                </div>
                <div className='home-app__search'>
                    <input className='home-app__search--input' type="text" placeholder='Pesquisar...' />
                    <button className='home-app__search--button'><CiSearch /></button>
                </div>
            </div>

            <div className='home-app__content'>
                <section className="conteudos__categoria">
                    <div className="content__list">
                        {meditacaoManha.map(content => (
                            <div key={content.id} className="content__card">
                                <img
                                    src={getYouTubeThumbnail(content.arquivoUrl)}
                                    alt={`Capa de ${content.titulo}`}
                                    className="content__thumbnail"
                                />
                                <div className="content__info">
                                    <h3>{content.titulo}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

        </main>
    );
}

export default Home;
