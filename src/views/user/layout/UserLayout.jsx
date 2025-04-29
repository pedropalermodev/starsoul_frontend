import Header from "../components/Header";
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer";
import './styles.scss'

function UserLayout() {
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

export default UserLayout;