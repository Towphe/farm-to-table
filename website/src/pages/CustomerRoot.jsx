import { Outlet } from "react-router-dom";
import CustomerNavBar from "../components/common/CustomerNavbar";
import Footer from "../components/common/Footer";

function CustomerRoot(){
    return(
        <>
            <CustomerNavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default CustomerRoot;