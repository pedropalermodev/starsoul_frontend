import Header from "../components/Header";
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer";
import './styles.scss'

function UserLayout() {
    return(
        <div className="userlayout__container">
            <Header/>
            <main className="userlayout__content">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default UserLayout;