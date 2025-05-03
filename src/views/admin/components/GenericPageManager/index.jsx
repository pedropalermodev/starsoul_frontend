import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';

function GenericPageManager({ pathMap, views, currentViewKey }) {
    const currentView = views[currentViewKey] || null;
    const pathSegments = pathMap[currentViewKey] || [];

    return (
        <div className='generic-page__container'>
            <div>
                <div className='path-map'>
                    <i className="bi bi-house-fill" />
                    {pathSegments.map((segment, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span>/</span>}
                            <span>{segment}</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div>
                {currentView}
            </div>
        </div>
    );
}

export default GenericPageManager;