import Header from "../components/Header";
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import './styles.scss'


function GuestLayout() {
    return(
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default GuestLayout;