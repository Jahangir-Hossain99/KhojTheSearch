import { NavLink, redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust path

const Links = [
  { name: "Dashboard", url: "/dashboard", auth: true , role:"admin"},
  { name: "Home", url: "/" },
  { name: "Profile", url: "/profile", auth:true },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
   { name: "Admin Panel", url: "/admin-panel", auth: true, role: "admin" },
];

const NavbarLinks = ({ setIsOpen }) => {
  const { isLoggedIn,userRole } = useAuth();

  const linkClass =
    "block py-2 px-3 rounded-md hover:bg-blue-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 transition dark:text-gray-300 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  const handleLinkClick = () => {
    setIsOpen(false); // Close mobile menu
  };

  return (
    <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
      {Links.map((link) => {
        // Skip link if auth is required and user is not logged in
        if (link.auth && !isLoggedIn) return null ;
        // Hide link if it's role-restricted and user doesn't match the role
        if (link.role && userRole !== link.role) return null;

        return (
          <li key={link.name}>
            <NavLink
              to={link.url}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive
                  ? `${linkClass} bg-blue-500 text-white md:bg-transparent md:text-blue-700 font-semibold`
                  : `${linkClass} text-gray-700`
              }
            >
              {link.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavbarLinks;
