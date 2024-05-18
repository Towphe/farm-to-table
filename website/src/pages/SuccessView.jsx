import CustomerNavBar from "../components/common/CustomerNavbar";
import Footer from "../components/common/Footer";


/*

Mga need ilagay:
* Hardcoded muna na order id number and date & time
* Order Success! header
* Go back button.... goes back to homepage

*/

function OrderSuccess()
{
    return (
        <main className="w-full h-full flex flex-col justify-center items-center space-y-5">
            <text className="font-bold text-[28px]">Order success!</text>
            <p>Thank you for shopping with us!</p>
            <p className="text-[14px]">Order #123456789 05/06/2024</p> {/* Will place dynamic constants here */}
            <a href="/" className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-20 rounded-full"> Go back </a>
        </main>
    )
}

export default OrderSuccess;