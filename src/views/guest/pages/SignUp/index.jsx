import React, { useState } from 'react';
import { usuarioCadastrar } from '../../../../api/login.api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './styles.scss'

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


    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '' && formData.confirmPassword.trim() !== '';
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

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

        if (formData.name && formData.name.length < 3) {
            toast.error('O nome deve ter pelo menos 2 caracteres.');
            return;
        }

        const hasNumber = /\d/.test(formData.name);
        if (formData.name && hasNumber) {
            toast.error('O nome não pode conter números.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            toast.error('Por favor, insira um email válido.');
            return;
        }

        if (formData.password && formData.password.length < 8) {
            toast.error('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('As senhas não correspondem.')
            return;
        }

        if (!Object.values(passwordRequirements).every(req => req)) {
            toast.error('A senha não atende a todos os requisitos');
            return;
        }


        try {
            setLoading(true);

            await usuarioCadastrar({
                nome: formData.name,
                email: formData.email,
                senhaHash: formData.password,
                tipoConta: 'Usuário'
            });
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            toast.success('Cadastro realizado com sucesso!')
            navigate('/sign-in');

        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Este email já está cadastrado.');
            } else if (error.response && error.response.data) {
                console.error("Detalhes do erro:", error.response.data);
            } else {
                toast.error('Erro ao se cadastrar. Por favor, tente novamente.')
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
                    </div>
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