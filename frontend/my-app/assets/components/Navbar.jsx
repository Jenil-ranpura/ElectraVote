import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { getToken } from "./jwt/jwtauth";
import { isTokenExpired } from "./jwt/jwtauth";
import New from "./Styles/New";
import New2 from "./Styles/New2";

export default function Navbar() {
  let nav = useNavigate();

  useEffect(() => {
    if(isTokenExpired()) {
      nav("/auth");
    }
  }, [])

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center text-2xl font-bold text-blue-600">
            <New />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <p className="text-gray-700 hover:text-blue- cursor-pointer" onClick={() => nav("/")}>
              <New2 text="Home" />
            </p>
            <p className="text-gray-700 hover:text-blue- cursor-pointer" onClick={() => nav("/about")}>
              <New2 text="About" />
            </p>
            <p className="text-gray-700 hover:text-blue- cursor-pointer" onClick={() => nav("/contact")}>
              <New2 text="Contact" />
            </p>
            {isTokenExpired() ? (
              <>
                <p
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
                  onClick={() => nav("/auth")}
                >
                  Login
                </p>
                <p
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition cursor-pointer"
                  onClick={() => nav("/adminauth")}
                >
                  Admin Login
                </p>
              </>
            ) : (
              // Profile Icon
              <button onClick={() => nav("/profile")} className="text-gray-700 hover:text-blue-600 text-2xl cursor-pointer">
                <FaUserCircle size={35}/>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none text-2xl"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          <p className="block text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => nav("/")}>
            Home
          </p>
          <p className="block text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => nav("/about")}>
            About
          </p>
          <p className="block text-gray-700 hover:text-blue-600 cursor-pointer" onClick={() => nav("/contact")}>
            Contact
          </p>
          {isTokenExpired() ? (
            <>
              <p
                className="block px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
                onClick={() => nav("/auth")}
              >
                Login
              </p>
              <p
                className="block px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition cursor-pointer"
                onClick={() => nav("/adminauth")}
              >
                Admin Login
              </p>
            </>
          ) : (
            <button onClick={() => nav("/profile")} className="block text-2xl text-gray-700 hover:text-blue-600 cursor-pointer">
              <FaUserCircle />
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
