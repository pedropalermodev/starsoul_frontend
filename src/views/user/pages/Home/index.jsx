import { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { useContent } from '../../../../shared/hooks/useContent';
import { CiSearch } from "react-icons/ci";
import './styles.scss';

function Home() {
    const { userData, globalLoading } = useContext(AuthContext);
    const { contents } = useContent();

    const navigate = useNavigate();

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

    const handleOpenContent = (content) => {
        if (isDraggingRef.current) return; // não navega se estiver arrastando

        navigate(`/app/content/${content.id}`, {
            state: {
                titulo: content.titulo,
                videoUrl: content.arquivoUrl,
                descricao: content.descricao,
            }
        });
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

            <div className='content-box'>
                <p>Meditações para manhâ: </p>
                <div
                    className={`home-app__contents ${isDragging ? 'dragging' : ''}`}
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {meditacaoManha.map(content => (
                        <div
                            key={content.id}
                            className="content__card"
                            onClick={() => handleOpenContent(content)}
                        >
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
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Home;
