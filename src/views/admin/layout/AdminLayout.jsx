import './styles.scss'
import { Outlet } from "react-router-dom"

import Header from '../components/Header'
import Aside from '../components/Aside'
import { ToastContainer } from 'react-toastify'


function AdminLayout() {
    return (
        <div className="adminlayout__container">
            <Aside />
            <main className="adminlayout__content">
                <Header />
                <Outlet />
            </main>
            <ToastContainer className="toast-container-custom" position="top-center" />
        </div>
    )
}

export default AdminLayout;