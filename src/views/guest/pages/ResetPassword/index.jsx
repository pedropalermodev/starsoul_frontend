import './styles.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { solicitarResetSenha, redefinirSenha } from '../../../../api/redefinirSenha.api';
import { toast } from 'react-toastify';

// Images
import starsoulBrandmark from '../../../../assets/branding/starsoul-brandmark-blue.png'
import starsoulLettermark from '../../../../assets/branding/starsoul-lettermark-blue.png'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import SubmitButton from '../../components/SubmitButton';

function ResetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const isFormValidStep1 = email.trim() !== '' ;
    const isFormValidStep2 = token.trim() !== '' && newPassword.trim() !== '' && newConfirmPassword.trim() !== '';
    const [loading, setLoading] = useState(false);

    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });

    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await solicitarResetSenha(email);
            toast.success('Um email com instruções foi enviado!');
            setStep(2);
        } catch (err) {
            console.error(err);
            toast.error('Erro ao enviar o email. Tente novamente mais tarde!');
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (newPassword !== newConfirmPassword) {
            toast.error('As senhas não correspondem.');
            return;
        }

        if (!Object.values(passwordRequirements).every(req => req)) {
            toast.error('A nova senha não atende a todos os requisitos.');
            return;
        }

        try {
            await redefinirSenha(email, token, newPassword);
            toast.success('Senha redefinida com sucesso!');
            navigate('/sign-in');
        } catch (err) {
            console.error(err);
            toast.error('Erro ao redefinir senha.');
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
