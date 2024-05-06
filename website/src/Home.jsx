import CustomerNavBar from "./components/common/CustomerNavbar";
import Footer from "./components/common/Footer";


function Homepage(){
    return (
        <>
            <CustomerNavBar />
            <main className="w-full h-full flex justify-center items-center">
                <div>
                    <h1 className="font-bold text-3xl">Mula sa <span className="text-dark-green">taniman</span></h1>
                    <h1 className="font-bold text-3xl">Tungo sa <span className="text-smooth-yellow">hapagkainan</span></h1>
                </div>
                
            </main>
            <Footer />
        </>
        
    )
}

export default Homepage;