
import { useAuth } from './AuthProvider';

function CustomerNavBar(){
    // add sign in state here later
    const {role, signOut} = useAuth();

    const signOut_ = () => {
        signOut();
        window.location.reload();
    }

    const pages = [
        {name: "Home", route: "/"},
        {name: "Products", route: "/products"},
        {name: "Orders", route: "/orders"}
    ];

    return (
        <nav className="flex justify-around py-2 shadow-lg text-off-white md:gap-x-60 absolute top-0 w-screen bg-smooth-yellow">
            <h1 className="block text-2xl font-bold"><a href="/">Hapag-Taniman</a></h1>
            <div className="flex gap-4">
                {
                    pages.map((page) => {
                        return <a className="text-lg font-semibold hover:opacity-75" href={page.route} key={pages.indexOf(page)}>{page.name}</a>;
                    })
                }
                {!role ? <></> : <a className="text-lg font-semibold hover:opacity-75" href="/shopping-cart" key={4}>Cart</a>}
                {!role ? <a className="text-lg font-semibold hover:opacity-75" href="/sign-in">Sign in</a> : <span className="text-lg font-semibold hover:opacity-75 hover:cursor-pointer" onClick={signOut_}>Sign Out</span>}
            </div>
        </nav>
    )
}

export default CustomerNavBar;