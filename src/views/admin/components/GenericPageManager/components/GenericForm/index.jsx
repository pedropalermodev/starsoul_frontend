import React, { useState, useEffect } from 'react';
import Box from '../../../Box';
import './styles.scss';
import { toast } from 'react-toastify';
import StyledMultiSelect from '../../../StyledMultiSelect';

function GenericForm({ fields, onSubmit, initialData, onBack }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [currentSection, setCurrentSection] = useState('required');

    useEffect(() => {
        const initialValues = {};
        // console.log('initialData no GenericForm:', initialData);
        fields.forEach(field => {
            if (field.name === 'codStatus') {
                initialValues[field.name] = initialData ? initialData[field.name] : 'Ativo';
            } else if (field.multiple) {
                initialValues[field.name] = initialData ? initialData[field.name] || field.defaultValue || [] : field.defaultValue || [];
            } else {
                initialValues[field.name] = initialData ? initialData[field.name] || field.defaultValue || '' : field.defaultValue || '';
            }
        });
        setFormData(initialValues);
    }, [fields, initialData]);

    const handleChange = (event) => {
        const { name, value, type, checked, multiple } = event.target;

        let newValue = value;

        if (multiple) {
            newValue = Array.from(event.target.selectedOptions).map(option => option.value);
        } else {
            newValue = value;
        }

        // console.log('handleChange:', name, newValue);

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: newValue,
        }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = {};
        let isValid = true;

        // Converte as categorias e tags para números antes de enviar
        const convertedFormData = { ...formData };

        if (Array.isArray(convertedFormData.categoriaIds)) {
            convertedFormData.categoriaIds = convertedFormData.categoriaIds.map(id => Number(id));
        }
        if (Array.isArray(convertedFormData.tagIds)) {
            convertedFormData.tagIds = convertedFormData.tagIds.map(id => Number(id));
        }

        // console.log('convertedFormData no handleSubmit:', convertedFormData);

        fields.forEach(field => {
            if (!field.required && !convertedFormData[field.name]) {
                convertedFormData[field.name] = null;
            }
        });

        fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                validationErrors[field.name] = `${field.label} é obrigatório.`;
                isValid = false;
            }

            if (field.validation) {
                if (field.validation.pattern && !field.validation.pattern.test(formData[field.name])) {
                    validationErrors[field.name] = field.validation.message || `Valor inválido para ${field.label}.`;
                    isValid = false;
                    toast.error(`${field.label} o valor é inválido.`);
                }
            }
        });

        setErrors(validationErrors);

        if (isValid) {
            onSubmit(convertedFormData);
        } else {
            toast.error("Preencha todos os campos obrigatórios.");
        }
    };



    const renderField = (field) => {
        if (field.name === 'codStatus' && !initialData) return null;

        return (
            <div key={field.name} className="generic-form__field">
                <label htmlFor={field.name} className="generic-form__label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                </label>

                {field.type === 'select' && field.options ? (
                    <div className="generic-form__field">
                        {field.multiple ? (
                            <StyledMultiSelect
                                name={field.name}
                                options={field.options}
                                value={formData[field.name] || []}
                                onChange={handleChange}
                                placeholder={`Selecione ${field.label.toLowerCase()}`}
                            />
                        ) : (
                            <select
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                className="generic-form__input"
                            >
                                <option value="">Selecione uma opção</option>
                                {field.options.map(option => (
                                    <option key={option.value} value={String(option.value)}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors[field.name] && <div className="generic-form__error">{errors[field.name]}</div>}
                    </div>
                ) : field.type === 'radio' && field.options ? (
                    <section className="generic-form__section">
                        {field.options.map(option => (
                            <label key={option.value} className="generic-form__section-label">
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    checked={formData[field.name] === option.value}
                                    onChange={handleChange}
                                    className="generic-form__radio-input"
                                />
                                {option.label}
                            </label>
                        ))}
                    </section>
                ) : (
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="generic-form__input"
                        required={field.required}
                    />
                )}
            </div>
        );
    };

    return (
        <>
            <div className='generic-form__toggle'>
                <button
                    type='button'
                    className={`generic-form__toggle-button ${currentSection === 'required' ? 'active-option' : ''}`}
                    onClick={() => setCurrentSection('required')}
                >
                    Campos obrigatórios
                </button>
                <button
                    type='button'
                    className={`generic-form__toggle-button ${currentSection === 'optional' ? 'active-option' : ''}`}
                    onClick={() => setCurrentSection('optional')}
                >
                    Campos opcionais
                </button>
            </div>

            <Box className="generic-form__container" style={{ borderRadius: '0 15px 15px 15px' }}>


                <form onSubmit={handleSubmit} className="generic-form">
                    {(() => {
                        const filteredFields = fields.filter(field =>
                            currentSection === 'required' ? field.required : !field.required
                        );

                        if (filteredFields.length === 0) {
                            return (
                                <div className="generic-form__empty-info">
                                    {currentSection === 'required'
                                        ? 'Nenhum campo obrigatório disponível.'
                                        : 'Nenhum campo opcional disponível.'}
                                </div>
                            );
                        }

                        return filteredFields.map(renderField);
                    })()}

                </form>
            </Box>

            <div className="generic-form__actions">
                <button
                    className="generic-form__actions-button"
                    onClick={onBack}
                >
                    CANCELAR
                </button>
                <button
                    type="submit"
                    className="generic-form__actions-button"
                    onClick={handleSubmit}
                >
                    <i className="bi bi-floppy2-fill" />SALVAR
                </button>
            </div>
        </>
    );
}

export default GenericForm;