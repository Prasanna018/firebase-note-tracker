/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiBook, FiHome, FiInfo, FiMail, FiPlus, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { name: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
        { name: 'My Notes', icon: <FiBook />, path: '/dashboard' },
        { name: 'About', icon: <FiInfo />, path: '/about' },
        { name: 'Contact', icon: <FiMail />, path: '/contact' },
    ];

    const authItems = [
        { name: 'Sign In', icon: <FiLogIn />, path: '/signin' },
        { name: 'Login', icon: <FiUser />, path: '/login' },
    ];

    return (
        <motion.header
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-gradient-to-r from-indigo-50/95 via-purple-50/95 to-blue-50/95 shadow-lg'
                : 'bg-gradient-to-r from-indigo-50/90 via-purple-50/90 to-blue-50/90'
                } backdrop-blur-md py-3`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    className="flex items-center"
                    whileHover={{ scale: 1.03 }}
                >
                    <Link to="/" className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            NoteTrack
                        </span>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <nav className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                {navItems.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        whileHover={{ y: -2 }}
                                    >
                                        <Link
                                            to={item.path}
                                            className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link
                                        to="/dashboard/create-note"
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
                                    >
                                        <FiPlus />
                                        <span>New Note</span>
                                    </Link>
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link
                                        to="/about"
                                        className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
                                    >
                                        About
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link
                                        to="/contact"
                                        className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
                                    >
                                        Contact
                                    </Link>
                                </motion.div>
                                {authItems.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        whileHover={{ y: -2 }}
                                    >
                                        <Link
                                            to={item.path}
                                            className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </nav>
                )}

                {/* Mobile menu button */}
                <motion.button
                    className="md:hidden p-2 rounded-lg focus:outline-none"
                    onClick={toggleMenu}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobile && isMenuOpen && (
                    <motion.div
                        className="md:hidden bg-gradient-to-b from-indigo-50 to-blue-50 shadow-lg absolute w-full left-0 border-t border-gray-100"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto px-4 py-2">
                            <nav className="flex flex-col space-y-2 py-4">
                                {user ? (
                                    <>
                                        {navItems.map((item) => (
                                            <motion.div
                                                key={item.name}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    to={item.path}
                                                    className="flex items-center text-gray-700 hover:bg-indigo-100/50 px-4 py-3 rounded-lg transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <span className="mr-3">{item.icon}</span>
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        ))}

                                        <div className="border-t border-gray-200 my-2"></div>

                                        <motion.div whileHover={{ scale: 1.02 }}>
                                            <Link
                                                to="/dashboard/create-note"
                                                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg mt-2"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <FiPlus className="mr-2" />
                                                New Note
                                            </Link>
                                        </motion.div>
                                    </>
                                ) : (
                                    <>
                                        <motion.div whileHover={{ x: 5 }}>
                                            <Link
                                                to="/about"
                                                className="flex items-center text-gray-700 hover:bg-indigo-100/50 px-4 py-3 rounded-lg transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <FiInfo className="mr-3" />
                                                About
                                            </Link>
                                        </motion.div>
                                        <motion.div whileHover={{ x: 5 }}>
                                            <Link
                                                to="/contact"
                                                className="flex items-center text-gray-700 hover:bg-indigo-100/50 px-4 py-3 rounded-lg transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <FiMail className="mr-3" />
                                                Contact
                                            </Link>
                                        </motion.div>
                                        <div className="border-t border-gray-200 my-2"></div>
                                        {authItems.map((item) => (
                                            <motion.div
                                                key={item.name}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    to={item.path}
                                                    className="flex items-center text-gray-700 hover:bg-indigo-100/50 px-4 py-3 rounded-lg transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <span className="mr-3">{item.icon}</span>
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </>
                                )}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;