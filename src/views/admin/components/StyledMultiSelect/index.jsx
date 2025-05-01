import React, { useState, useEffect, useRef } from 'react';
import './styles.scss'; // Crie este arquivo CSS

const StyledMultiSelect = ({ name, options, value, onChange, placeholder = "Selecione as opções" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const selectedValues = Array.isArray(value) ? value : [];

    const handleOptionClick = (optionValue) => {
        const newValue = selectedValues.includes(optionValue)
            ? selectedValues.filter(v => v !== optionValue)
            : [...selectedValues, optionValue];
        onChange({ target: { name, value: newValue } });
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClearAll = () => {
        onChange({ target: { name, value: [] } });
    };

    const handleSelectAll = () => {
        const allValues = options.map(option => String(option.value));
        onChange({ target: { name, value: allValues } });
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            setSearchTerm('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="styled-multi-select" ref={dropdownRef}>
            <div className="styled-multi-select__input" onClick={() => setIsOpen(!isOpen)}>
                {selectedValues.length > 0
                    ? selectedValues.map(val => options.find(opt => String(opt.value) === val)?.label).filter(label => label).join(', ')
                    : placeholder}
                <div className="styled-multi-select__arrow">{isOpen ? '▲' : '▼'}</div>
            </div>
            {isOpen && (
                <div className="styled-multi-select__dropdown">
                    <div className="styled-multi-select__actions">
                        <button type="button" onClick={handleSelectAll}>Selecionar Todos</button>
                        <button type="button" onClick={handleClearAll}>Limpar Todos</button>
                    </div>
                    <input
                        type="text"
                        className="styled-multi-select__search"
                        placeholder="Filtrar opções"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className="styled-multi-select__options">
                        {filteredOptions.map(option => (
                            <li key={option.value} className="styled-multi-select__option">
                                <label>
                                    <input
                                        type="checkbox"
                                        value={String(option.value)}
                                        checked={selectedValues.includes(String(option.value))}
                                        onChange={() => handleOptionClick(String(option.value))}
                                    />
                                    {option.label}
                                </label>
                            </li>
                        ))}
                        {filteredOptions.length === 0 && searchTerm && (
                            <li className="styled-multi-select__option--empty">Nenhuma opção encontrada</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StyledMultiSelect;