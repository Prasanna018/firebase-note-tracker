/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserAuth } from '../context/useUserContext';

const DashboardHeader = () => {
    const { user, LogOut } = useUserAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogOut = async () => {
        try {
            await LogOut();
            toast.success('Logged out successfully');
            navigate('/signin'); // Redirect to home page after logout
        } catch (error) {
            toast.error('Failed to logout');
            console.error('Logout error:', error);
        } finally {
            setIsProfileOpen(false); // Close the dropdown regardless of success/failure
        }
    };

    return (
        <motion.header
            className="w-full bg-white shadow-sm py-3 px-6 flex justify-between items-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Logo on the left */}
            <motion.div className='lg:ml-0 ml-18' whileHover={{ scale: 1.03 }}>
                <Link to="/dashboard" className="flex items-center">
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

            {/* Profile dropdown on the right */}
            <div className="relative">
                <motion.button
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition-colors"
                    onClick={toggleProfile}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
                        {user?.name?.charAt(0) || <FiUser />}
                    </div>
                    <span className="font-medium text-gray-700">{user?.name || 'Profile'}</span>
                    <motion.div
                        animate={{ rotate: isProfileOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FiChevronDown />
                    </motion.div>
                </motion.button>

                {/* Dropdown menu */}
                <AnimatePresence>
                    {isProfileOpen && (
                        <motion.div
                            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
                                        {user?.name?.charAt(0) || <FiUser />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{user?.displayName || user?.name || 'User'}</p>
                                        <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={handleLogOut}
                                    className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <FiLogOut className="text-gray-500" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default DashboardHeader;