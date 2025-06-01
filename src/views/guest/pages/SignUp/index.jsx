import React, { useState } from 'react';
import { usuarioCadastrar } from '../../../../api/login.api';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../SignIn/styles.scss'

// Images
import starsoulBrandmark from '../../../../assets/branding/starsoul-brandmark-blue.png'
import starsoulLettermark from '../../../../assets/branding/starsoul-lettermark-blue.png'
import SubmitButton from '../../components/SubmitButton';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });

    const [errors, setErrors] = useState({});
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '' && formData.confirmPassword.trim() !== '';
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });

        if (name === 'password') {
            setPasswordRequirements({
                length: value.length >= 8,
                uppercase: /[A-Z]/.test(value),
                lowercase: /[a-z]/.test(value),
                number: /\d/.test(value),
                specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (formData.name && formData.name.length < 3) {
            newErrors.name = 'O nome deve ter pelo menos 2 caracteres.';
        }

        const hasNumber = /\d/.test(formData.name);
        if (formData.name && hasNumber) {
            newErrors.name = 'O nome não pode conter números.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Por favor, insira um email válido.';
        }

        if (formData.password && formData.password.length < 8) {
            newErrors.password = 'A senha deve ter pelo menos 8 caracteres.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não correspondem.';
        }

        if (!Object.values(passwordRequirements).every(req => req)) {
            newErrors.password = 'A senha não atende a todos os requisitos';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);

            await usuarioCadastrar({
                nome: formData.name,
                email: formData.email,
                senha: formData.password,
                tipoConta: 'Usuário'
            });
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            setErrors({});
            navigate('/sign-in');

        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrors({ email: 'Este email já está cadastrado.' });
            } else {
                setErrors({ general: 'Erro ao se cadastrar. Por favor, tente novamente.' })
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='sign__container'>
            <div className='sign__box'>
                <div className='sign__header-img'>
                    <img src={starsoulBrandmark} />
                    <img src={starsoulLettermark} />
                </div>
                <form onSubmit={handleSubmit} className='sign__form'>
                    <div className='sign__form-content'>
                        <label className='sign__form-content-label'>Nome</label>
                        <input
                            type="text"
                            name="name"
                            className='sign__form-content-input'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <p className="sign__form-error">{errors.name}</p>}
                    </div>

                    <div className='sign__form-content'>
                        <label className='sign__form-content-label'>Email</label>
                        <input
                            type="email"
                            name="email"
                            className='sign__form-content-input'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="sign__form-error">{errors.email}</p>}

                    </div>

                    <div className="password-field-wrapper ">
                        <div className="input-container sign__form-content">
                            <label className='sign__form-content-label'>Senha</label>
                            <div className="password-input-wrapper input-with-icon">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className='sign__form-content-input'
                                    value={formData.password}
                                    onChange={handleChange}
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
                            {errors.password && <p className="sign__form-error">{errors.password}</p>}
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
                                value={formData.confirmPassword}
                                onChange={handleChange}
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
                        {errors.confirmPassword && <p className="sign__form-error">{errors.confirmPassword}</p>}

                    </div>

                    {errors.general && <p className="sign__form-error">{errors.general}</p>}

                    <SubmitButton isValid={isFormValid} loading={loading}>
                        Cadastrar
                    </SubmitButton>
                </form>
                <div className='sign__link'>
                    <div className='divider'><span className='line' /> Já possui uma conta StarSoul? <span className='line' /></div>
                    <Link to='/sign-in' className='sign__link-button-sign'>Entre com sua conta</Link>
                    {/* <Link to='/'>Volte para página inicial</Link> */}
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

export default SignUp;