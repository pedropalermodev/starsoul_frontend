import { Link } from 'react-router-dom'
import './styles.scss'
import starnata from '../../../assets/shared/starnata.svg'

function ErrorFoundPage() {
    return (
        <main className='error'>
            <div className='error__container'>
                <h1 className='error__container-title'>404</h1>
                <h2 className='error__container-subtitle'>UH OH! Você esta PERDIDO.</h2>
                <p className='error__container-text'>A página que você procura não existe. Como você chegou aqui é um mistério. Mas você pode clicar no botão abaixo para voltar à página inicial.</p>
                <Link to='/app/home' className='error__container-button'>Voltar para inicial</Link>
            </div>
            
            <div className='error__image'> <img src={starnata} className='error__image-img' /> </div>
        </main>
    )
}

export default ErrorFoundPage