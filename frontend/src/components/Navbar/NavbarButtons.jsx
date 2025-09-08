import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavbarButtons = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
                    onClick={() => {   setDropdownOpen(false); setShowLogoutModal(true);}}
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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
        Confirm Logout
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Are you sure you want to logout?
      </p>
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={() => setShowLogoutModal(false)} // Cancel
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          onClick={() => {
            logout(navigate); // Confirm logout
            setShowLogoutModal(false);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default NavbarButtons;
