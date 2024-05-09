import { Outlet, Navigate } from "react-router-dom";
import AdminNavBar from "../components/common/AdminNavbar";
import Footer from "../components/common/Footer";
import { useAuth } from "../components/common/AuthProvider";

function AdminRoot(){
    const {role} = useAuth;

    

    return(
        <>
            <AdminNavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AdminRoot;