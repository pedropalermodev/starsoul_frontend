import './styles.scss'
import { Outlet } from "react-router-dom"

import Header from '../components/Header'
import Aside from '../components/Aside'


function AdminLayout() {
    return(
        <div className="adminlayout__container">
            <Aside />
            <main className="adminlayout__content">
                <Header />
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout;