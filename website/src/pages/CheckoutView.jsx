import CustomerNavBar from "../components/common/CustomerNavbar";
import Footer from "../components/common/Footer";


/*

Mga need ilagay:
* Import mga constants from products
* Input fields for payment, delivery info., etc.
* Order button na magredirect sa SuccessView.jsx

*/

function CheckoutView()
{
    return (
        <main className="w-full h-full flex flex-col justify-center items-center">       
                <text className="font-bold text-[28px]">Checkout</text>
                <p>Items</p> {/*Will place constants here*/}
                <p>Payment</p> {/*Will place constants here*/}
                <p>Delivery info</p> {/*Will place constants here*/}
            <a href="/success" className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-40 rounded-full"> Order </a>
        </main>
    )
}

export default CheckoutView;

