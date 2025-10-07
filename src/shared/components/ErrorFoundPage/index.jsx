import { Link } from 'react-router-dom';
import './styles.scss';
import starnata from '../../../assets/shared/starnata.svg';
import { MdError } from "react-icons/md";

function ErrorFoundPage() {
    return (
        <main className="error">
            <div className="error__container">
                <div className="error-code-icon-group">
                    <span className="error-number">4</span>
                    <MdError color="#ffffff" size={35} />
                    <span className="error-number">4</span>
                </div>

                <h2 className="error__container-subtitle">Conteúdo não encontrado</h2>
                <p className="error__container-text">
                    Parece que a estrela que você procurava se perdeu no cosmos 🌌<br />
                    Mas tudo bem! Você pode voltar para o início e continuar sua jornada.
                </p>
                <Link to="/app/home" className="error__container-button">
                    Voltar para a inicial
                </Link>
            </div>

            <div className="error__image">
                <img src={starnata} alt="Estrela perdida" className="error__image-img" />
            </div>
        </main>
    );
}

export default ErrorFoundPage;