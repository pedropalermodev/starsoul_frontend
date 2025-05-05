import React, { useState } from 'react';
import { enviarFeedback } from '../../../../api/feedback.api';
import { toast } from 'react-toastify';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'Name':
                setName(value);
                break;
            case 'Email':
                setEmail(value);
                break;
            case 'Subject':
                setSubject(value);
                break;
            case 'Message':
                setMessage(value);
                break;
            default:
                break;
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (message.length < 10) {
            toast.error('A mensagem deve ter pelo menos 10 caracteres.');
            return;
        }
        const newFeedback = {
            nome: name,
            email: email,
            assunto: subject,
            mensagem: message,
        };

        try {
            await enviarFeedback(newFeedback);
            toast.success('Mensagem enviada com sucesso!')
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Erro no envio:', error);
            setSubmissionStatus('Erro ao enviar a mensagem. Tente novamente.');
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className='contact__container-hero-box-form'>
            <input
                type="text"
                name='Name'
                className="contact__container-hero-box-form--input"
                placeholder='Digite seu nome*'
                value={name}
                onChange={handleInputChange}
                required // Adicione validação no frontend também
            />
            <input
                type="email" // Use type="email" para validação básica no navegador
                name='Email'
                className="contact__container-hero-box-form--input"
                placeholder='Informe seu email*'
                value={email}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name='Subject'
                className="contact__container-hero-box-form--input"
                placeholder='De qual assunto sua mensagem trata?*'
                value={subject}
                onChange={handleInputChange}
                required
            />
            <p style={{ fontWeight: 600 }}>Diga-nos mais sobre o seu problema*</p>
            <textarea
                className='contact__container-hero-box-form--input'
                name="Message"
                rows={8}
                style={{ resize: 'none' }}
                value={message}
                onChange={handleInputChange}
                required
            />
            <button className='btn' type='submit' disabled={submissionStatus === 'Enviando...'}>
                {submissionStatus || 'Enviar Mensagem'}
            </button>
            {submissionStatus === 'Erro ao enviar a mensagem. Tente novamente.' && (
                <p className="error-message">{submissionStatus}</p>
            )}
        </form>
    );
};

export default FeedbackForm;