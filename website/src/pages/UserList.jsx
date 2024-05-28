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
            const response = await axios.get('http://localhost:3000/api/admin/viewUser');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <AdminNavBar />
            <main className="w-full h-full flex justify-center items-center">
                <div className="max-w-md">
                    <ul className="space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                        {currentUsers.map((user, index) => (
                            <li key={index} className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
                                <span>Email: {user.email}</span>
                                <Link to={`/user/${user.id}`} className="text-blue-500">
                                    Show More
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="bg-gray-300 p-2 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 p-2 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default UserList;