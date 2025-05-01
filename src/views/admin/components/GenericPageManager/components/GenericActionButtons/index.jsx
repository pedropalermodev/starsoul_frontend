import React from 'react';
import './styles.scss';

function GenericActionButtons({ item, onEdit, onDelete }) {
    return (
        <div className='actionsContainer'>
            <button className='editButton' onClick={() => onEdit(item)}>
                <i className="bi bi-pencil-square"></i>
            </button>
            <button className='deleteButton' onClick={() => onDelete(item.id)}>
                <i className="bi bi-trash-fill"></i>
            </button>
        </div>
    );
}

export default GenericActionButtons;