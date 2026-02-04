import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ConfirmationModal from "../UI/ConfirmationModal";

const NavbarButtons = () => {
  const { isLoggedIn, logout,userData } = useAuth();
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
          {/* Users Button */}
          <NavLink
            to="/login"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Login
          </NavLink>
          <NavLink to="/register" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            User Registration
          </NavLink>

          {/* Employeer Button */}
          <NavLink
            to="/company-login"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Company Login
          </NavLink>
          <NavLink to="/company-register" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            Company Registration
          </NavLink>
        </>
      ) : (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            className="flex items-center space-x-2 text-gray-100 hover:text-blue-700 dark:text-gray-100 dark:hover:text-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              className="w-8 h-8 rounded-full"
              src={`http://localhost:5000${userData.role === 'employer' ? userData?.logoUrl?.URL : userData?.avatarUrl?.URL }`}
              alt="user avatar"
            />
            <span  >{userData.role === 'employer' ? userData?.name : userData?.fullName}</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute left-auto mt-2 w-40 bg-white rounded-lg shadow-lg border dark:bg-gray-700 z-20">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <NavLink
                    to={`${userData.role === 'employer' ? '/company-profile' : '/profile'}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/appliedJobs"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Applied Jobs
                  </NavLink>
                </li>

                {userData.role === 'admin' && (
                  <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin-panel"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Panel
                    </NavLink>
                  </li>
                  </>
                )}

                <li>
                  <button
                    onClick={() =>{
                      setShowLogoutModal(true);
                      setDropdownOpen(false);
                    }}
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
      {showLogoutModal && <ConfirmationModal
      isOpen={showLogoutModal}
      message="logout"
      confirm={() => {
        logout(); // Confirm logout
        setShowLogoutModal(false);
        toast.success("Log Out successful!");
      }}
      cancel={() => setShowLogoutModal(false)}
      /> }
    </div>
  );
};

export default NavbarButtons;
