import { useAuth } from "./AuthProvider";
import {useNavigate} from 'react-router-dom';

function AdminNavBar(){

    const navigate = useNavigate();

    const {signOut} = useAuth();

    const signOut_ = () => {
        signOut();
        window.location.href = '/';
    }

    const pages = [
        {name: "Home", route: "/admin"},
        {name: "Users", route: "/admin/users"},
        {name: "Products", route: "/admin/products"},
        {name: "Orders", route: "/admin/orders"},
        {name: "Reports", route: "/admin/reports"}
    ];

    return (
        <nav className="flex justify-around py-2 bg-smooth-yellow text-off-white md:gap-x-60 absolute top-0 w-screen">
            <h1 className="block text-2xl font-bold"><a href="/admin">Hapag-Taniman</a></h1>
            <div className="flex gap-4">
                {
                    pages.map((page) => {
                        return <a className="text-lg font-semibold hover:opacity-75" href={page.route} key={pages.indexOf(page)}>{page.name}</a>;
                    })
                }
                {/* <a className="text-lg font-semibold hover:opacity-75" href="/sign-in">Sign in</a> */}
                <span className="text-lg font-semibold hover:opacity-75 hover:cursor-pointer" onClick={signOut_}>Sign Out</span>
            </div>
        </nav>
    )
}

export default AdminNavBar;