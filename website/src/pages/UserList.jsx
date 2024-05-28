import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';
import AdminNavBar from '../components/common/AdminNavbar';

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 7;

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5173/api/admin/viewUser');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <AdminNavBar />
            <main className="w-full h-full flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">User List</h2>
                <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                    {currentUsers.map((user, index) => (
                        <li key={index} className="bg-green-100 p-4 rounded-lg flex justify-between items-center">
                            <span>Email: {user.email}</span>
                            <Link to={`/admin/user/${user.id}`} className="text-blue-500">
                                Show More
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-4 space-x-2">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => handlePageClick(number)}
                            className={`px-3 py-1 rounded ${currentPage === number ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default UserList;