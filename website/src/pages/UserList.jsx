import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import AdminNavBar from '../components/common/AdminNavbar';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:3000/api/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <>
            <main className="w-full h-full flex flex-col justify-center items-center">
                <h2 className="block text-3xl font-bold mb-4 mt-16 text-black">User List</h2>
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
                            <td>{user._id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>)}
                    </tbody>
                </table>
                <p className='block'>Total users: <span className='font-bold'>{users.length}</span></p>
            </main>
        </>
    );
}

export default UserList