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

    return (
        <main>
            <p>Olá usuário {userData.nome}</p>
        </main>
    );
}

export default Home;
