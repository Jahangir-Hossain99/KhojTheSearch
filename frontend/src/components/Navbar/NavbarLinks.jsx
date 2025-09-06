import React from "react";

const NavbarLinks = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {links.map((link) => (
        <li key={link.name} className="" >
          <a
            href={link.path}
            className="block py-2 px-3 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
