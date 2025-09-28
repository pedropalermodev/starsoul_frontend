import Header from "../components/Header";
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer";
import './styles.scss'


function GuestLayout() {
    return(
        <>
            <Header/>
            <main className="content-outlet">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default GuestLayout;