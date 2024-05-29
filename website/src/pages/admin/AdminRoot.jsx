import { Outlet, useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/common/AdminNavbar";
import Footer from "../../components/common/Footer";
import { useAuth } from "../../components/common/AuthProvider";
import { useEffect } from "react";

function AdminRoot(){
    const {role} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (role !== 'ADMIN'){
            navigate("/", {replace: true});
            return;
        }
    }, [])

    return(
        <>
            <AdminNavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AdminRoot;