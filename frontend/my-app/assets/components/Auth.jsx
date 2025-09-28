import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addToken } from "./jwt/jwtauth";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    let nav = useNavigate();
    const [form, setForm] = useState({
        name: "",
        age: "",
        adharno: "",
        password: "",
        phoneno: "",
        state: ""
    });

    const changeData = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // Login request
                const res = await axios.post("http://localhost:3000/login", {
                    adharno: form.adharno,
                    password: form.password,
                });
                alert(res.data.msg || "Login successful");

                if (res.data.success) {
                    addToken(res.data.token);
                    nav("/");
                }
            } else {
                // Signup request
                const res = await axios.post("http://localhost:3000/signup", form);
                alert(res.data.msg || "Account created successfully");
                setForm({
                    name: "",
                    age: "",
                    adharno: "",
                    password: "",
                    phoneno: "",
                    state: ""
                });

                if (res.data.success) {
                    addToken(res.data.token);
                    nav("/");
                }
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    // ✅ Unique states from your data
    const states = [
        "Gujarat",
        "Punjab",
        "Delhi",
        "Maharashtra",
        "Karnataka",
        "Rajasthan",
        "Chhattisgarh",
        "Uttarakhand",
        "HimachalPradesh"
    ];

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl bg-white">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
                {isLogin ? "Login" : "Create Account"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Signup fields only */}
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={changeData}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={form.age}
                            onChange={changeData}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="text"
                            name="phoneno"
                            placeholder="Phone Number"
                            value={form.phoneno}
                            onChange={changeData}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        {/* ✅ Dropdown for states */}
                        <select
                            name="state"
                            value={form.state}
                            onChange={changeData}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">-- Select State --</option>
                            {states.map((st, idx) => (
                                <option key={idx} value={st}>
                                    {st}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {/* Common fields (both login + signup) */}
                <input
                    type="text"
                    name="adharno"
                    placeholder="Aadhar Number"
                    value={form.adharno}
                    onChange={changeData}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={changeData}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>

            <p className="text-center mt-4 text-gray-600">
                {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        
                    }}
                    className="text-blue-600 hover:underline"
                >
                    {isLogin ? "Create one" : "Login here"}
                </button>
            </p>
        </div>
    );
}
