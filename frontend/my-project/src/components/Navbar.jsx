import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaCompass, FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navbarClasses = `fixed w-full z-30 transition-all duration-300 ${
    scrolled ? 'bg-blue-900 shadow-lg' : 'bg-transparent'
  }`;

  const linkClasses = `text-lg font-medium ${
    scrolled ? 'text-white hover:text-yellow-400' : 'text-blue-100 hover:text-white'
  } transition-colors duration-300`;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to="/" className="flex items-center">
              <FaCompass className={`h-8 w-8 ${scrolled ? 'text-yellow-400' : 'text-white'}`} />
              <span className={`ml-2 text-xl font-bold ${scrolled ? 'text-white' : 'text-blue-100'}`}>Co-Op Searcher</span>
            </Link>
          </motion.div>
          
          {/* Center the navigation links */}
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className={linkClasses} isActive={location.pathname === "/"}>Home</NavLink>
              <NavLink to="/internships" className={linkClasses} isActive={location.pathname === "/internships"}>Internships</NavLink>
              <NavLink to="/companies" className={linkClasses} isActive={location.pathname === "/companies"}>Companies</NavLink>
              <NavLink to="/resources" className={linkClasses} isActive={location.pathname === "/resources"}>Resources</NavLink>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={false}
              animate={{ width: searchActive ? 200 : 40 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search..."
                className={`bg-blue-800 text-white rounded-full py-2 px-4 focus:outline-none ${
                  searchActive ? 'w-full' : 'w-10'
                } transition-all duration-300`}
                onFocus={() => setSearchActive(true)}
                onBlur={() => setSearchActive(false)}
              />
              <FaSearch className="absolute right-3 top-3 text-white" />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Sign Up
            </motion.button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled ? 'text-white hover:text-yellow-400 hover:bg-blue-800' : 'text-blue-100 hover:text-white hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-900"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)} isActive={location.pathname === "/"}>Home</MobileNavLink>
              <MobileNavLink to="/internships" onClick={() => setIsOpen(false)} isActive={location.pathname === "/internships"}>Internships</MobileNavLink>
              <MobileNavLink to="/companies" onClick={() => setIsOpen(false)} isActive={location.pathname === "/companies"}>Companies</MobileNavLink>
              <MobileNavLink to="/resources" onClick={() => setIsOpen(false)} isActive={location.pathname === "/resources"}>Resources</MobileNavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-blue-800">
              <div className="flex items-center px-5 mb-3">
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-blue-800 text-white rounded-full py-2 px-4 focus:outline-none"
                  />
                </div>
                <FaSearch className="ml-2 text-white" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-900 bg-yellow-400 hover:bg-yellow-300"
              >
                Sign Up
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, children, className, isActive }) => (
  <Link
    to={to}
    className={`${className} ${isActive ? 'text-yellow-400' : ''}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick, isActive }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-blue-800 text-yellow-400' : 'text-white hover:bg-blue-800 hover:text-yellow-400'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
