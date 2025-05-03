import { useContext } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import './styles.scss';

function Home() {
    const { userData, globalLoading } = useContext(AuthContext);

    if (globalLoading) {
        return <p>Loading...</p>; // Exibe um texto enquanto os dados estão sendo carregados
    }

    if (!userData) {
        return <p>Dados do usuário não encontrados.</p>; // Caso não tenha dados do usuário
    }

    const nomes = userData.nome.split(' ');
    const primeiroNome = nomes[0];

    return (
        <main className='home-app__container'>
            <div className='home-app__welcome'>
                <p className='home-app__welcome--name'>Olá, {primeiroNome}!</p>
                <p className='home-app__welcome--text'>Veja o que preparamos para você hoje.</p>
            </div>
        </main>
    );
}

export default Home;
