import CustomerNavBar from "./components/common/CustomerNavbar";
import Footer from "./components/common/Footer";

function Template(){
    return (
        <>
            <CustomerNavBar />
            <main className="w-full h-full flex justify-center items-center">
                {/* Enter content here. Refer to Home.jsx for an example */}
            </main>
            <Footer />
        </>
        
    )
}

export default Template;