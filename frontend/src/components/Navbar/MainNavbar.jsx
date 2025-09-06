import React from 'react'
import { useState } from 'react'
import NavbarBrand from './NavbarBrand'
import NavbarLinks from './NavbarLinks'
import NavbarButtons from './NavbarButtons'
import NavbarToggle from './NavbarToggle'

const MainNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="bg-white border-gray-200 px-4 py-2.5 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto w-full">
        {/* Logo / Brand */}
        <NavbarBrand />

        {/* Mobile Toggle Button */}
        <NavbarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        
        {/* Links + Buttons */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:space-x-8`}>
          <NavbarLinks />
          <NavbarButtons />
        </div>

    </div>
    </nav>
  )
}

export default MainNavbar
