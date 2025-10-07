import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../assets/components/Navbar";
import Auth from "../assets/components/Auth";
import Protected from "../assets/components/jwt/Protected";
import Loader from "../assets/components/Loader/Loader";

let About = React.lazy(() => import("../assets/components/About"));
let Contact = React.lazy(() => import("../assets/components/Contact"));
let AdminLogin = React.lazy(() => import("../assets/components/AdminLogin"));
let Profile = React.lazy(() => import("../assets/components/Profile"));
let Home = React.lazy(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(import("../assets/components/Home"));
    }, 1000)
  })
});
let Admin_dashboard = React.lazy(() => import("../assets/components/Admin_dashboard"));

let App = () => {
  let [adminParty, setAdminParty] = useState("");
  let [navbar, setNavbar] = useState(true);
  let nav = useNavigate();

  useEffect(() => {
    if (location.pathname == "/admin-dashboard") {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  }, [nav]);

  return (
    <>
      {navbar && <Navbar />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Protected Component={Home} />} />
          <Route path="/about" element={<Protected Component={About} />} />
          <Route path="/contact" element={<Protected Component={Contact} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/adminauth" element={<AdminLogin party={setAdminParty} />} />
          <Route path="/admin-dashboard" element={<Admin_dashboard party={adminParty} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </>
  )

}

export default App;