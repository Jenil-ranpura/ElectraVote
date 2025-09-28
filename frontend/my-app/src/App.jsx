import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../assets/components/Navbar";
import About from "../assets/components/About";
import Contact from "../assets/components/Contact";
import Auth from "../assets/components/Auth";
import AdminLogin from "../assets/components/AdminLogin";
import Protected from "../assets/components/jwt/Protected";
import Profile from "../assets/components/Profile";
import Home from "../assets/components/Home";
import Admin_dashboard from "../assets/components/Admin_dashboard";
import New from "../assets/components/Styles/New";

let App = () => {
  let [adminParty, setAdminParty] = useState("");
  let [navbar, setNavbar] = useState(true);
  let nav = useNavigate();

  useEffect(() => {
    if(location.pathname == "/admin-dashboard") {
      setNavbar(false);
    }else {
      setNavbar(true);
    }
  }, [nav]);

  return (
    <>
      {navbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Protected Component={Home} />} />
        <Route path="/about" element={<Protected Component={About} />} />
        <Route path="/contact" element={<Protected Component={Contact} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/adminauth" element={<AdminLogin party={setAdminParty} />} />
        <Route path="/admin-dashboard" element={<Admin_dashboard party={adminParty}/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )

}

export default App;