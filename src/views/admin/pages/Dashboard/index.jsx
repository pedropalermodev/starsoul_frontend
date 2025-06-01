import './styles.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { listarTodosFeedbacks } from '../../../../api/feedback.api';
import { listarTodosUsuarios } from '../../../../api/usuario.api';
import { listarTodosConteudos } from '../../../../api/conteudo.api';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
import useFeedbacksChartData from '../../hooks/useFeedbackChartData';
import useUsersChartData from '../../hooks/useUsersChartData';

function Dashboard() {
    const { userData, globalLoading, token } = useContext(AuthContext);

    const [recentFeedbacks, setRecentFeedbacks] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalContents, setTotalContents] = useState(0);
    const [recentContents, setRecentContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState([]);
    const [users, setUsers] = useState([]);

    const chartData = useFeedbacksChartData(feedbacks);
    const usersChartData = useUsersChartData(users);

    const mergedChartData = chartData.map(dayFeedback => {
        const userDay = usersChartData.find(d => d.name === dayFeedback.name);
        return {
            ...dayFeedback,
            users: userDay ? userDay.users : 0,
        };
    });

    useEffect(() => {
        async function fetchUsers() {
            if (!token) return;
            const data = await listarTodosUsuarios(token);
            setUsers(data);
        }
        fetchUsers();
    }, [token]);

    useEffect(() => {
        async function fetchFeedbacks() {
            if (!token) return;
            const data = await listarTodosFeedbacks(token);
            setFeedbacks(data);
        }
        fetchFeedbacks();
    }, [token]);

    useEffect(() => {
        async function fetchData() {
            if (!token) return;
            try {
                setLoading(true);

                // Feedbacks recentes
                const feedbacks = await listarTodosFeedbacks(token);
                const recentFb = [...feedbacks]
                    .sort((a, b) => new Date(b.dataEnvio) - new Date(a.dataEnvio))
                    .slice(0, 5);
                setRecentFeedbacks(recentFb);

                // Usuários
                const users = await listarTodosUsuarios(token);
                setTotalUsers(users.length);

                // Conteúdos
                const contents = await listarTodosConteudos(token);
                setTotalContents(contents.length);
                const recentC = [...contents]
                    .sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao))
                    .slice(0, 5);
                setRecentContents(recentC);

            } catch (err) {
                console.error('Erro ao carregar dados do dashboard:', err);
            } finally {
                setLoading(false);
            }
        }

        if (!globalLoading) {
            fetchData();
        }
    }, [token, globalLoading]);

    if (globalLoading || loading) return <p className="dashboard__loading">Carregando dashboard...</p>;
    if (!userData) return <p className="dashboard__error">Usuário não encontrado</p>;

    return (
        <main className="dashboard">
            <section className="dashboard__charts">
                <h3 className="dashboard__section-title">Atividades da semana</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={mergedChartData}
                        margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
                        className="dashboard__line-chart"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="feedbacks" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="users" stroke="#5d4386" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </section>

            <section className="dashboard__lists">
                <div className="dashboard__list">
                    <h3 className="dashboard__section-title">Últimos Feedbacks</h3>
                    <ul className="dashboard__list-items">
                        {recentFeedbacks.map((fb) => (
                            <li key={fb.id} className="dashboard__list-item">
                                <strong className="dashboard__list-item-name">{fb.nome}</strong>{' '}
                                <span className="dashboard__list-item-email">({fb.email})</span> -{' '}
                                <span className="dashboard__list-item-subject">{fb.assunto}</span>
                                <br />
                                <small className="dashboard__list-item-date">
                                    {format(new Date(fb.dataEnvio), 'dd/MM/yyyy HH:mm')}
                                </small>
                                <p className="dashboard__list-item-message">{fb.mensagem}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard__list">
                    <h3 className="dashboard__section-title">Últimos Conteúdos Publicados</h3>
                    <ul className="dashboard__list-items">
                        {recentContents.map((content) => (
                            <li key={content.id} className="dashboard__list-item">
                                <strong className="dashboard__list-item-title">{content.titulo}</strong>
                                <br />
                                <small className="dashboard__list-item-date">
                                    {format(new Date(content.dataPublicacao), 'dd/MM/yyyy')}
                                </small>
                                <p className="dashboard__list-item-description">{content.descricao}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;