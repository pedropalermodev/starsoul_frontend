import './styles.scss';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Images
import starsoulBrandmark from '../../../../assets/branding/starsoul-brandmark-blue.png'
import starsoulLettermark from '../../../../assets/branding/starsoul-lettermark-blue.png'
import SubmitButton from '../../components/SubmitButton';
import LoadingPage from '../../../../shared/components/LoadingPage';

function SignIn() {
    const { login, userRole } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isFormValid = email.trim() !== '' && password.trim() !== '';
    const [globalLoading, setGlobalLoading] = useState(true);

    // 🔒 Verifica se já existe um token ao montar
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            // Mostra tela de carregamento durante o redirecionamento
            setGlobalLoading(true);

            const timer = setTimeout(() => {
                if (userRole === 'Administrador') {
                    navigate('/console', { replace: true });
                } else {
                    navigate('/app', { replace: true });
                }
            }, 800); // tempo curto para animação de loading

            return () => clearTimeout(timer);
        } else {
            // Se não tiver token, remove o loading inicial
            setGlobalLoading(false);
        }
    }, [userRole, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
        } catch (err) {
            setError('Email ou senha inválidos');
        } finally {
            setLoading(false);
        }
    };

    if (globalLoading) {
        return <LoadingPage />;
    }

    return (
        <main className="sign__container">
            <div className='sign__box'>
                <div className='sign__header-img'>
                    <img src={starsoulBrandmark} alt="StarSoul logo" />
                    <img src={starsoulLettermark} alt="StarSoul" />
                </div>

                <form onSubmit={handleSubmit} className='sign__form'>
                    <div className='sign__form-content'>
                        <label className='sign__form-content-label'>Email</label>
                        <input
                            type="email"
                            value={email}
                            className='sign__form-content-input'
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                            required
                        />
                        {error && <p className="sign__form-error">{error}</p>}
                    </div>

                    <div>
                        <div className='sign__form-content'>
                            <label className='sign__form-content-label'>Senha</label>
                            <div className='input-with-icon'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    className='sign__form-content-input'
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError('');
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password small-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>
                        <Link to='/reset-password' className='sign__form-reset-password'>Esqueceu sua senha?</Link>
                    </div>

                    <SubmitButton isValid={isFormValid} loading={loading}>
                        Entrar
                    </SubmitButton>
                </form>

                <div className='sign__link'>
                    <div className='divider'>
                        <span className='line' />
                        Novo na nossa comunidade
                        <span className='line' />
                    </div>
                    <Link to='/sign-up' className='sign__link-button-sign'>Não possui uma conta? Cadastre-se</Link>
                    <Link to='/' className='sign__link-button-back'>Volte para página inicial</Link>
                </div>
            </div>

            <footer className='sign__footer'>
                <Link to='' className='sign__footer--text'>Termos de Uso</Link>
                <Link to='' className='sign__footer--text'>Políticas de Privacidade</Link>
                <p className='sign__footer--text'>© 2025 StarSoul</p>
            </footer>
        </main>
    );
}

export default SignIn;