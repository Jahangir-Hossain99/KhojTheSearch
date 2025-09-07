import React, { useEffect, useState, useRef,useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavbarButtons = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
    // If the click is outside the dropdown area, close the menu
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }

  // Attach listener
  document.addEventListener("mousedown", handleClickOutside);

  // Cleanup when the component unmounts
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="flex items-center space-x-4 mt-4 md:mt-0 relative">
      {!isLoggedIn ? (
        <>
          {/* Login Button */}
          <NavLink
            to="/login"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={login}
          >
            Login
          </NavLink>

          {/* Register Button */}
          <NavLink to="/register" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            Register
          </NavLink>
        </>
      ) : (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://via.placeholder.com/40"
              alt="user avatar"
            />
            <span>John Doe</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border dark:bg-gray-800">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {logout(); setDropdownOpen(false);}}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarButtons;
