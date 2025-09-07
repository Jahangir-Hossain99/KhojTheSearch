import { NavLink } from 'react-router-dom';

const NavbarLinks = () => {
  const linkClass =
    "block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  return (
    <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${linkClass} text-blue-700 font-bold`
              : `${linkClass} text-gray-700`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? `${linkClass} text-blue-700 font-bold`
              : `${linkClass} text-gray-700`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? `${linkClass} text-blue-700 font-bold`
              : `${linkClass} text-gray-700`
          }
        >
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default NavbarLinks;