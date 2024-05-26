import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import AdminNavBar from '../components/common/AdminNavbar';

function UserList() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('');
            setUsers(response.data);
        };
        fetchUsers();
    });

    return (
        <>
            <AdminNavBar />
            <main className="w-full h-full flex justify-center items-center">
                <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                    {users.map((user, index) => (
                        <li key={index} className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
                            <span>Email: {user.email}</span>
                            <Link to={`/user/${user.id}`} className="text-blue-500">
                                Show More
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
            <Footer />
        </>
    );
}

export default UserList;