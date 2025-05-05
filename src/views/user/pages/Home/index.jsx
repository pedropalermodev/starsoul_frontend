import { useContext, useState } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { useContent } from '../../../../shared/hooks/useContent';
import './styles.scss';

function Home() {
    const { userData, globalLoading } = useContext(AuthContext);
    const { contents } = useContent();

    const [selectedContent, setSelectedContent] = useState(null);

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
            <div className='home-app__welcome'>
                <p className='home-app__welcome--name'>Olá, {primeiroNome}!</p>
                <p className='home-app__welcome--text'>Veja o que preparamos para você hoje.</p>
            </div>

            {selectedContent ? (
                <div className="iframe-container">
                    <button onClick={() => setSelectedContent(null)} className="btn-voltar">← Voltar</button>
                    <h2>{selectedContent.titulo}</h2>
                    <iframe
                        className="content-iframe"
                        src={selectedContent.arquivoUrl.replace("watch?v=", "embed/")}
                        title={selectedContent.titulo}
                        allowFullScreen
                    />
                </div>
            ) : (
                <section className="conteudos__categoria">
                    <div className="content__list">
                        {meditacaoManha.map(content => (
                            <div key={content.id} className="content__card" onClick={() => setSelectedContent(content)}>
                                <img
                                    src={getYouTubeThumbnail(content.arquivoUrl)}
                                    alt={`Capa de ${content.titulo}`}
                                    className="content__thumbnail"
                                />
                                <div className="content__info">
                                    <h3>{content.titulo}</h3>
                                    <p>{content.descricao ?? ''}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default Home;
