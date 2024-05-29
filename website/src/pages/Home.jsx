import CustomerNavBar from "../components/common/CustomerNavbar";
import Footer from "../components/common/Footer";


function Homepage(){
    return (
        <main className="w-full h-full flex justify-center items-center bg-[url('assets/landing-background.jpeg')] bg-cover bg-no-repeat">
            <div className="text-off-white">
                <h1 className="font-bold text-3xl md:text-6xl">Mula sa <span className="text-dark-green">taniman</span></h1>
                <h1 className="font-bold text-3xl md:text-6xl">Tungo sa <span className="text-smooth-yellow">hapagkainan</span></h1>
            </div>
        </main>
    )
}

export default Homepage;