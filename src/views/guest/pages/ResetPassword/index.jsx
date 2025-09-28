import './styles.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { solicitarResetSenha, redefinirSenha } from '../../../../api/redefinirSenha.api';

// Images
import starsoulBrandmark from '../../../../assets/branding/starsoul-brandmark-blue.png'
import starsoulLettermark from '../../../../assets/branding/starsoul-lettermark-blue.png'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import SubmitButton from '../../components/SubmitButton';
import { toast } from 'sonner';

function ResetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const isFormValidStep1 = email.trim() !== '';
    const isFormValidStep2 = token.trim() !== '' && newPassword.trim() !== '' && newConfirmPassword.trim() !== '';
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const showMessage = (text, type = 'error', duration = 3000) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), duration);
    };


    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });

    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const promise = solicitarResetSenha(email); // promise real
            toast.promise(promise, {
                loading: 'Enviando email de recuperação...',
                success: () => {
                    setStep(2);
                    return 'Um email com instruções foi enviado!';
                },
                error: (err) => {
                    const status = err.response?.status || 0;
                    if (status === 404) return 'Email não encontrado. Verifique e tente novamente.';
                    return 'Erro interno. Por favor, tente novamente mais tarde.';
                },
            });
            await promise;
        } finally {
            setLoading(false);
        }
    };


    const handleResetSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== newConfirmPassword) {
            toast.error('As senhas não correspondem.');
            return;
        }

        if (!Object.values(passwordRequirements).every(req => req)) {
            toast.error('A nova senha não atende a todos os requisitos.');
            return;
        }

        setLoading(true);
        try {
            const promise = redefinirSenha(email, token, newPassword);
            toast.promise(promise, {
                    loading: 'Redefinindo sua senha...',
                    success: () => {
                        setTimeout(() => navigate('/sign-in'), 500);
                        return 'Senha redefinida com sucesso!';
                    },
                    error: 'Erro ao redefinir a senha. Verifique se o token de redefinição corresponde ao enviado.',
                }
            );
            await promise;
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);

        setPasswordRequirements({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /\d/.test(value),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
        });
    };



    return (
        <main className="sign__container">
            {step === 1 && (
                <div className='sign__box'>
                    <div className='sign__header-img'>
                        <img src={starsoulBrandmark} />
                        <img src={starsoulLettermark} />
                    </div>
                    <p className='sign__box--p'>
                        Ups! Parece que você esqueceu sua senha. Sem problemas! 🔑<br />
                        <br />
                        Para recuperá-la, basta informar seu email no campo abaixo e seguir as instruções para criar uma nova senha e continuar explorando tudo o que temos para você.
                    </p>
                    <form onSubmit={handleEmailSubmit} className='sign__form'>
                        <div className='sign__form-content'>
                            <label className='sign__form-content-label'>Email</label>
                            <input
                                type="email"
                                value={email}
                                className='sign__form-content-input'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {message.text && (
                                <p className={`sign__message sign__message--${message.type}`}>
                                    {message.text}
                                </p>
                            )}

                        </div>
                        <SubmitButton isValid={isFormValidStep1} loading={loading}>
                            Enviar
                        </SubmitButton>
                    </form>
                    <div className='sign__link'>
                        <div className='divider'><span className='line' /> Lembrou da senha? <span className='line' /></div>
                        <Link to='/sign-in' className='sign__link-button-sign'>Volte para pagina de login</Link>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className='sign__box'>
                    <div className='sign__header-img'>
                        <img src={starsoulBrandmark} />
                        <img src={starsoulLettermark} />
                    </div>
                    <p className='sign__box--p'>
                        Vamos redefinir sua senha ! Para continuar, por favor: <br />
                        <br />
                        • Insira o token de redefinição que foi enviado para o seu email. 📧<br />
                        • Crie uma nova senha forte e confirme-a. 🛡️<br />
                    </p>
                    <form onSubmit={handleResetSubmit} className='sign__form'>
                        <div className='sign__form-content'>
                            <label className='sign__form-content-label'>Token</label>
                            <input
                                type="text"
                                value={token}
                                className='sign__form-content-input'
                                onChange={(e) => setToken(e.target.value)}
                                required
                            />
                            {message.text && (
                                <p className={`sign__message sign__message--${message.type}`}>
                                    {message.text}
                                </p>
                            )}
                        </div>

                        <div className="password-field-wrapper ">
                            <div className="input-container sign__form-content">
                                <label className='sign__form-content-label'>Nova senha</label>
                                <div className="password-input-wrapper input-with-icon">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className='sign__form-content-input'
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        onFocus={() => setShowPasswordTooltip(true)}
                                        onBlur={() => setShowPasswordTooltip(false)}
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

                            {showPasswordTooltip && (
                                <div className="password-requirements-tooltip">
                                    <p>Requisitos da senha:</p>
                                    <ul>
                                        <li className={passwordRequirements.length ? 'valid' : 'invalid'}>8+ caracteres</li>
                                        <li className={passwordRequirements.uppercase ? 'valid' : 'invalid'}>Maiúscula (A-Z)</li>
                                        <li className={passwordRequirements.lowercase ? 'valid' : 'invalid'}>Minúscula (a-z)</li>
                                        <li className={passwordRequirements.number ? 'valid' : 'invalid'}>Número (0-9)</li>
                                        <li className={passwordRequirements.specialChar ? 'valid' : 'invalid'}>Caractere especial</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className='sign__form-content'>
                            <label className='sign__form-content-label'>Confirmar Senha</label>
                            <div className="input-with-icon">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className='sign__form-content-input'
                                    value={newConfirmPassword}
                                    onChange={(e) => setNewConfirmPassword(e.target.value)}
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
                        <SubmitButton isValid={isFormValidStep2} loading={loading}>
                            Redefinir Senha
                        </SubmitButton>
                    </form>
                    <div className='sign__link'>
                        <div className='divider'><span className='line' /> Deseja voltar por algum motivo?  <span className='line' /></div>
                        <Link to='/' className='sign__link-button-sign'>Volte para página inicial</Link>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ResetPassword;
