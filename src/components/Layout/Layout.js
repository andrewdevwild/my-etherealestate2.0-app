import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import './Layout.scss'


const Layout = () => {

    return (
        <>
            <header>
                <Sidebar />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
