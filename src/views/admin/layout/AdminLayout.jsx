import React, { useState, useEffect, useRef } from 'react'; // <--- Garanta que estes estão importados!
import { Outlet } from "react-router-dom";

import Header from '../components/Header';
import Aside from '../components/Aside';
import { ToastContainer } from 'react-toastify';

import './styles.scss';

function AdminLayout() {
    const [isAsideOpen, setIsAsideOpen] = useState(true);

    const toggleAside = () => {
        setIsAsideOpen(prev => !prev);
    };

    const mainContentRef = useRef(null);

    useEffect(() => {
        const asideElement = document.getElementById('myAside'); 

        if (asideElement && mainContentRef.current) {
            const updateMargin = () => {
                const asideWidth = asideElement.offsetWidth;
                if (mainContentRef.current) { 
                    mainContentRef.current.style.marginLeft = `${asideWidth}px`;
                }
            };

            const timer = setTimeout(updateMargin, 300);

            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (entry.target.id === 'myAside') {
                        updateMargin();
                    }
                }
            });

            resizeObserver.observe(asideElement);

            return () => {
                clearTimeout(timer);
                resizeObserver.disconnect();
            };
        }
    }, [isAsideOpen]);

    return (
        <div className="adminlayout__container">
            <Aside isAsideOpen={isAsideOpen} toggleAside={toggleAside} />
            <main className="adminlayout__content" ref={mainContentRef}>
                <Header />
                <Outlet />
            </main>
            <ToastContainer className="toast-container-custom" position="top-center" />
        </div>
    );
}

export default AdminLayout;