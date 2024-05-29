import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import LoadingScreen from "../../components/common/LoadingScreen";
import Footer from '../../components/common/Footer';
import AdminNavBar from '../../components/common/AdminNavbar';

function UserList() {
    const [users, setUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setAsLoading] = useState(true);

    const fetchUsers = async () => {
        const params = new URLSearchParams({
            p: searchParams.get('p') ?? 1,
            c: searchParams.get('c') ?? 10
        });

        const response = await axios.get(`http://localhost:3000/api/users?${params.toString()}`);
        setUsers(response.data.users);
        setPageCount(response.data.pageCount);

    };

    useEffect(() => {
        fetchUsers();
        setAsLoading(false);
    }, [searchParams]);

    if (isLoading){
        return <LoadingScreen />
    }

    return (
        <>
            <main className="relative flex flex-col items-center w-full h-full overflow-x-hidden gap-6 pt-10">
                <h2 className="block text-3xl font-bold mb-4 text-black">User List</h2>
                <table className="w-3/4 text-md text-left rtl:text-right text-slate-800">
                    <thead className='font-bold text-md text-slate-800 uppercase '>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <tr key={user._id} className="border-b dark:border-gray-700">
                            <td className="py-6 uppercase">{user._id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>)}
                    </tbody>
                </table>
                <p className='block'>Total users: <span className='font-bold'>{users.length}</span></p>
                <ul className="flex gap-6 justify-center w-screen text-center bottom-16 text-x3 py-6">
                {Array.from({length: pageCount}, (v, k) => k+1).map((n) => (<li key={n}>
                    <Link to={`/admin/users?p=${n}&c=${10}`}>{n}</Link>
                </li>))}
                </ul>
            </main>
        </>
    );
}

export default UserList