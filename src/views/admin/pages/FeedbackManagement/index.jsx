import './styles.scss'
import { useCallback, useContext, useEffect, useState } from 'react';
import { listarTodosFeedbacks } from '../../../../api/feedback.api'
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import GenericPageManager from '../../components/GenericPageManager';
import GenericList from '../../components/GenericPageManager/components/GenericList';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const feedbacksColumns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Enviado por:' },
    { key: 'email', label: 'Email:' },
    { key: 'assunto', label: 'Assunto' },
    { key: 'mensagem', label: 'Mensagem' },
    {
        key: 'dataEnvio',
        label: 'Enviado em:',
        render: (item) => {
            const data = new Date(item.dataEnvio);
            // Formato: dia/mês/ano hora:minuto
            return format(data, 'dd/MM/yyyy HH:mm');
        },
    }
]

function FeedbackManagement() {
    const { token, globalLoading } = useContext(AuthContext);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentView, setCurrentView] = useState('list');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!globalLoading && token) {
            setLoading(true);
            setError(null);
            try {
                const data = await listarTodosFeedbacks(token);
                setFeedbacks(data);
                console.log("Dados dos feedbacks recebidos:", data);
                return data;
            } catch (error) {
                console.error('Erro ao buscar feedbacks:', error);
                setError(error.message || 'Erro ao buscar feedbacks.');
                toast.error('Erro ao buscar feedbacks.')
                return [];
            } finally {
                setLoading(false);
            }
        } else if (globalLoading) {
            setLoading(true);
            return [];

        } else if (!token) {
            setError('Autenticação necessária.');
            return [];

        }
        return [];
    }, [token, globalLoading, listarTodosFeedbacks]);

    useEffect(() => {
        console.log('useEffect executado - Token:', token, 'Global Loading:', globalLoading);
        fetchData();
    }, [token, globalLoading]);

    if (globalLoading) {
        return <div>Carregando informações de autenticação...</div>;
    }

    if (!token) {
        return <div>Autenticação necessária...</div>;
    }

    const renderView = () => {
        switch (currentView) {
            case 'list':
                return (
                    <GenericList
                        columns={feedbacksColumns}
                        dataFetcher={fetchData}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <main className='feedback-management'>
            <GenericPageManager
                pathMap={{
                    list: ["Feedbacks", ""]
                }}
                views={{
                    list: renderView()
                }}
                currentViewKey={currentView}
            />
        </main>
    )
}

export default FeedbackManagement