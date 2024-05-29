import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import AdminNavBar from '../../components/common/AdminNavbar';

function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:3000/api/admin/${id}`);
            setUser(response.data);
        };
        fetchUser();
    }, [id]);

    return (
        <>
            <AdminNavBar />
            <main className="w-full h-full flex justify-center items-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <Link to="/" className="text-blue-500">Go back</Link>
                    <h2 className="text-xl font-bold mb-4">User Details</h2>
                    <div className="p-4 rounded-lg border border-gray-500">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>First Name:</strong> {user.firstname}</p>
                        <p><strong>Middle Name:</strong> {user.middlename}</p>
                        <p><strong>Last Name:</strong> {user.lastname}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default UserDetails;