import React from 'react'
import { useEffect,useState,useContext } from 'react'
import { useAuth } from "../../context/AuthContext";
import NavbarBrand from './NavbarBrand'
import NavbarLinks from './NavbarLinks'
import NavbarButtons from './NavbarButtons'
import NavbarToggle from './NavbarToggle'

const MainNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {isLoggedIn} = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav className={`fixed top-0 left-0 w-full px-2 sm:px-4 py-2.5 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-transparent dark:bg-gray-900"}`}>
      <div className="flex flex-wrap justify-between items-center mx-auto w-full">     
        {/* Logo / Brand */}
        <NavbarBrand />
        {/* Mobile Toggle Button */}
        <NavbarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Links + Buttons */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:space-x-8`}>
          <NavbarLinks setIsOpen={setIsOpen} />
          {/* 🔹 Pass down auth state to buttons */}
          <NavbarButtons isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  )
}

export default MainNavbar
