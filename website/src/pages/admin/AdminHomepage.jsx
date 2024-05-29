import { useNavigate } from "react-router-dom";
import {DateTime} from "luxon";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../../components/common/LoadingScreen";

function AdminHomePage(){
    const navigate = useNavigate();
    const [isLoading, setAsLoading] = useState(true);
    const currentDate = DateTime.now();
    const [topProducts, setTopProducts] = useState({});
    const [pendingCount, setPendingCount] = useState(0);
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/reports/admin-home")
            .then((res) => {
                setPendingCount(res.data['pendingCount']);
                setTopProducts(res.data['topProducts']);
                setAsLoading(false);
            });
    }, []);

    if (isLoading){
        return <LoadingScreen />
    }

    if (pendingCount === 0){
        return (
            <main className="w-full h-full flex flex-col pt-16 items-center gap-12 justify-center">
                <div className="text-lg sm:text-2xl flex flex-col gap-6 text-center">
                    <h2 className="text-5xl sm:text-6xl font-bold text-center">Welcome back!</h2>
                    <span>As of {currentDate.monthLong} {currentDate.day}, {currentDate.year}, you have no new orders.</span>
                </div>
            </main>
        )
    }

    return(
        <main className="w-full h-full flex flex-col pt-16 items-center gap-12 justify-center">
            <div className="text-lg flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-center">Welcome back!</h2>
                <span>As of {currentDate.monthLong} {currentDate.day}, {currentDate.year}, you have {pendingCount} pending {pendingCount === 1 ? "order" : "orders"}.</span>
                <h3 className="text-center">Recently ordered products</h3>
                <div className="flex flex-col  justify-center">
                    {
                        topProducts.map((product) => {
                            return(<div className="flex justify-between w-full py-2 px-2 shadow-md" key={product.id}>
                                <h4 className="block font-bold">{product.name}</h4>
                                <span>{product.count}</span>
                            </div>)
                        })
                    }
                </div>
            </div>
        </main>
    )
}

export default AdminHomePage;