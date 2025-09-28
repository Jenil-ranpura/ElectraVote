import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ party }) {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    party: "",
  });

  const changeData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/admin/login", form);

      alert(res.data.msg || "Admin login successful");
      if (res.data.success) {
        party(form.username);
        nav("/admin-dashboard"); // redirect to admin dashboard
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials or server error");
    }
  };

  const parties = ["BJP", "Congress", "AAP"];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl bg-white">
      <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
        Admin Login
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={changeData}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={changeData}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          required
        />

        <select
          name="party"
          value={form.party}
          onChange={changeData}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          required
        >
          <option value="">-- Select Party --</option>
          {parties.map((p, idx) => (
            <option key={idx} value={p}>
              {p}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
