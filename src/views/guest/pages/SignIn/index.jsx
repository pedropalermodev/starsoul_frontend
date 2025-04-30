import './styles.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../shared/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './styles.scss'

// Images
import starsoulBrandmark from '../../../../assets/branding/starsoul-brandmark-blue.png'
import starsoulLettermark from '../../../../assets/branding/starsoul-lettermark-blue.png'
import SubmitButton from '../../components/SubmitButton';


function SignIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const isFormValid = email.trim() !== '' && password.trim() !== '';
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Login realizado com sucesso!');
        } catch (err) {
            // toast.error('Email ou senha inválidos');
            // console.error('Erro de login:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="sign__container">
            <div className='sign__box'>
                <div className='sign__header-img'>
                    <img src={starsoulBrandmark} />
                    <img src={starsoulLettermark} />
                </div>
                {/* <h1 className='sign__box-h1'>Sign in</h1> */}
                <form onSubmit={handleSubmit} className='sign__form'>
                    <div className='sign__form-content'>
                        <label className='sign__form-content-label'>Email</label>
                        <input
                            type="email"
                            value={email}
                            className='sign__form-content-input'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <div className='sign__form-content'>
                            <label className='sign__form-content-label'>Senha</label>
                            <div className='input-with-icon'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    className='sign__form-content-input'
                                    onChange={(e) => setPassword(e.target.value)}
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
                    <div className='divider'><span className='line' />Novo na nossa comunidade <span className='line' /></div>
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