import { useContext, useState, useRef, useEffect } from 'react';
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

    const scrollRef = useRef(null);

    // Dentro do componente
    useEffect(() => {
        const slider = scrollRef.current;
        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            slider.classList.add('dragging');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            slider.classList.remove('dragging');
        };

        const handleMouseUp = () => {
            isDown = false;
            slider.classList.remove('dragging');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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

            <div className='home-app__contents' ref={scrollRef}>
                {meditacaoManha.map(content => (
                    <div key={content.id} className="content__card">
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

        </main>
    );
}

export default Home;
