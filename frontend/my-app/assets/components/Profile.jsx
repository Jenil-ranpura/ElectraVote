import React, { useEffect, useState } from "react";
import { getToken, removeToken, isTokenExpired } from "./jwt/jwtauth.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
    const [user, setUser] = useState(null);
    const nav = useNavigate();

    let logout = () => {
        removeToken();
        nav("/auth");
    }

    let fetchData = async () => {
        let token = getToken();

        if (!token || isTokenExpired()) {
            alert("Session Has Ended");
            logout();
            return;
        }

        try {
            let res = await axios.get("http://localhost:3000/user/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(res.data.user);
        } catch (err) {
            console.log(err);
            alert("Some Error Occurs");
        }   
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (!user) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl bg-white">
            <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
                My Profile
            </h1>

            <div className="space-y-3 text-gray-700">
                <p><span className="font-semibold">Name:</span> {user.name}</p>
                <p><span className="font-semibold">Aadhar No:</span> {user.adharno}</p>
                <p><span className="font-semibold">State:</span> {user.state}</p>
                <p><span className="font-semibold">Age:</span> {user.age}</p>
                <p><span className="font-semibold">Phone:</span> {user.phoneno}</p>
            </div>

            <button
                onClick={logout}
                className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
}
