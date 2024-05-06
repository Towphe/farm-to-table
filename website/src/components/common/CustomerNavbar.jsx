
function CustomerNavBar(){
    // add sign in state here later

    const pages = [
        {name: "Home", route: "/"},
        {name: "Products", route: "/products"},
        {name: "Orders", route: "/orders"}
    ];

    return (
        <nav className="flex justify-around py-2 bg-smooth-yellow text-off-white md:gap-x-60 absolute top-0 w-screen">
            <h1 className="block text-2xl font-bold"><a href="/">Farm-To-Table</a></h1>
            <div className="flex gap-4">
                {
                    pages.map((page) => {
                        return <a className="text-lg font-semibold hover:opacity-75" href={page.route} key={pages.indexOf(page)}>{page.name}</a>;
                    })
                }
                <a className="text-lg font-semibold hover:opacity-75" href="/sign-in">Sign in</a>
            </div>
        </nav>
    )
}

export default CustomerNavBar;