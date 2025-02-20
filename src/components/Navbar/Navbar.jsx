


import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";

import logo from "../../assets/images/logo.svg";
import { FaBars, FaTimes, FaHeart, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setIsOpen(false);
    navigate("/login");
  }
  useEffect(() => {
    setIsOpen(false);
  }, [token]);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 right-0 z-50">
      <div className="container mx-auto py-3 flex justify-between items-center px-5">
        {/* Logo */}
        <NavLink to={'/'} ><div className="flex items-center space-x-4 cursor-pointer">
          <img src={logo} width={120} alt="Fresh Cart Logo" />
        </div></NavLink>

        <button
          className="lg:hidden text-gray-800 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {token && (
          <ul className={`lg:flex lg:items-center fixed lg:static bg-white top-16 left-0 w-full lg:w-auto shadow-lg lg:shadow-none p-5 lg:p-0 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            } lg:translate-x-0`}>
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Categories", path: "/categories" },
              { name: "Brands", path: "/brands" },

            ].map((link, index) => (
              <li key={index} className="py-2 lg:py-0">
                <NavLink onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-md font-medium block px-4 py-2 rounded-lg lg:inline-block transition-colors duration-300 ${isActive ? "text-green-500" : "text-gray-800 hover:text-green-600"}`
                  }
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <li className="relative py-2 lg:py-0">
              <NavLink
                to="/wishlist"
                className="text-md font-medium flex items-center px-4 py-2 rounded-lg lg:inline-block transition-colors duration-300 text-gray-800 hover:text-red-500"
              >
                <FaHeart className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {wishlist?.length || 0}
                </span>
              </NavLink>
            </li>

            <li className="relative py-2 lg:py-0">
              <NavLink
                to="/cart"
                className="text-md font-medium flex items-center px-4 py-2 rounded-lg lg:inline-block transition-colors duration-300 text-gray-800 hover:text-green-500"

              >
                <FaShoppingCart className="text-xl relative" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {cart?.numOfCartItems || 0}
                </span>
              </NavLink>
            </li>
            <button
              onClick={logout}
              className="flex items-center bg-black hover:bg-gray-800 px-4 py-2 rounded-md text-white font-medium md:hidden"
            >
              <FaSignOutAlt className="mr-2" />
              Log Out
            </button>
          </ul>
        )}

        <div className="lg:flex items-center hidden">
          {token ? (
            <button
              onClick={logout}
              className="flex items-center bg-black hover:bg-gray-800 px-4 py-2 rounded-md text-white font-medium"
            >
              <FaSignOutAlt className="mr-2" />
              Log Out
            </button>
          ) : (
            <>
              <NavLink to="/login" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-medium mx-2">
                Login
              </NavLink>
              <NavLink to="/register" className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-medium">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
