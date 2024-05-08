import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/common/AdminNavbar";
import Footer from "../components/common/Footer";

function AdminRoot(){
    return(
        <>
            <AdminNavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AdminRoot;