import axios from "axios";
import { useState, useEffect } from "react";
import {DateTime} from "luxon";
import LoadingScreen from "../components/common/LoadingScreen";

function Reports() {
    // initialize reports
    const [topProducts, setTopProducts] = useState([]);
    const [orderTally, setOrderTally] = useState({
        pending: 0,
        completed: 0,
        cancelled: 0
    });
    const [totalIncome, setTotalIncome] = useState(0);
    const [timeRange, setRange] = useState("week");
    const [isLoading, setIsLoading] = useState(true);

    // get reports
    useEffect(() => {
        axios.get(`http://localhost:3000/api/reports/basic?by=${timeRange}`)
            .then(response => {
                setTopProducts(response.data.productTally);
                console.log(response)
                setOrderTally({
                    pending: response.data.orderTally.pending,
                    completed: response.data.orderTally.completed,
                    cancelled: response.data.orderTally.cancelled
                });
                setTotalIncome(response.data.income);
                setIsLoading(false);
            });
    }, [timeRange]);

    const setTimeRangetoWeek = () => {
        setRange('week');
    }
    
    const setTimeRangetoMonth = () => {
        setRange('month');
    }

    const setTimeRangetoYear = () => {
        setRange('year');
    }

    const defaultTimeRangeButtonStyle = "block outline outline-slate-800 px-2 rounded-md font-semibold text-slate-800"
    const timeRangeButtonStyles = {
        clicked: "block outline outline-slate-800 px-2 rounded-md font-semibold text-slate-50 bg-slate-800",
        unclicked: "block outline outline-slate-800 px-2 rounded-md font-semibold text-slate-800"
    }

    if (isLoading){
        return <LoadingScreen />;
    }

    // display reports
    return (
        <main className="w-full h-full flex flex-col pt-16 items-center gap-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Sales Report</h1>
                <span>as of {DateTime.now().toFormat('MMMM d, y')}</span>
            </div>
            <div className="flex gap-4">
                <div className="">Time Range</div>
                <button className={timeRange == 'week' ? timeRangeButtonStyles.clicked : timeRangeButtonStyles.unclicked} onClick={setTimeRangetoWeek}>Week</button>
                <button className={timeRange == 'month' ? timeRangeButtonStyles.clicked : timeRangeButtonStyles.unclicked} onClick={setTimeRangetoMonth}>Month</button>
                <button className={timeRange == 'year' ? timeRangeButtonStyles.clicked : timeRangeButtonStyles.unclicked} onClick={setTimeRangetoYear}>Year</button>
            </div>
            <div className="text-3xl">
                Total Income: <span className="font-bold">{totalIncome}</span>
            </div>
            <div className="flex gap-4">
                {/* Order Tally view */}
                <div className="text-center">
                    <div className="font-bold text-3xl">{orderTally.pending}</div>
                    <div className="text-md">Pending {orderTally.pending === 1 ? "Order" : "Orders" }</div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-3xl">{orderTally.completed}</div>
                    <div className="text-md">Completed {orderTally.completed === 1 ? "Order" : "Orders" }</div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-3xl">{orderTally.cancelled}</div>
                    <div className="text-md">Cancelled {orderTally.cancelled === 1 ? "Order" : "Orders" }</div>
                </div>
            </div>
            <div className="text-xl w-3/4 md:w-1/2 lg:w-1/3">
                <h2 className="font-bold text-center mb-4">Top Performing Products</h2>
                <div className="flex justify-between text-sm font-semibold">
                    <div>Product name</div>
                    <div>Count</div>
                </div>
                {
                    topProducts.map(product => <div className="flex justify-between" key={product.id}>
                        <div>{product.name}</div>
                        <div>{product.count}</div>
                    </div>)
                }
            </div>
        </main>
    )
}

export default Reports;