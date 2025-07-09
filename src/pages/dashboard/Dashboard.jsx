/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHeader from '../../component/DashboardHeader';
import {
    FiMenu,
    FiX,
    FiFileText,
    FiPieChart,
    FiPlus,
    FiBookmark,
    FiStar,
    FiBook
} from 'react-icons/fi';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('analytics');
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();


    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };


        handleResize();


        window.addEventListener('resize', handleResize);


        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [location]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebarItems = [
        {
            section: 'Overview',
            items: [
                { id: 'analytics', icon: <FiPieChart />, label: 'Analytics', path: '/dashboard' },
            ]
        },
        {
            section: 'Notes',
            items: [
                { id: 'notes', icon: <FiFileText />, label: 'All Notes', path: '/dashboard/notes' },
                { id: 'create', icon: <FiPlus />, label: 'Create Note', path: '/dashboard/create-note' },

                { id: 'bookmarks', icon: <FiBookmark />, label: 'Bookmarks', path: '/dashboard/bookmarks' },

            ]
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header - Fixed at top */}
            <div className='fixed w-full top-0 left-0 z-40 bg-white shadow-sm'>
                <div className="relative">
                    <DashboardHeader />
                    {/* Sidebar Toggle Button - visible only on mobile */}
                    {isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-50 p-2 rounded-md bg-white shadow-md hover:bg-gray-100 transition-colors"
                            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                        >
                            {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Overlay for mobile */}
                        {isMobile && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black z-40"
                                onClick={toggleSidebar}
                            />
                        )}

                        {/* Sidebar content */}
                        <motion.div
                            initial={{ x: isMobile ? -300 : 0, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: isMobile ? -300 : 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 fixed top-0 left-0 h-screen z-50 mt-19`}
                        >
                            <div className="p-4 h-full flex flex-col overflow-y-auto">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 px-2">Dashboard</h2>
                                    <p className="text-xs text-gray-500 px-2">Welcome back!</p>
                                </div>

                                <nav className="flex-1 space-y-6">
                                    {sidebarItems.map((group) => (
                                        <div key={group.section} className="space-y-1">
                                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
                                                {group.section}
                                            </h3>
                                            <ul className="space-y-1">
                                                {group.items.map((item) => (
                                                    <li key={item.id}>
                                                        <Link
                                                            to={item.path}
                                                            onClick={() => {
                                                                setActiveTab(item.id);
                                                                if (isMobile) {
                                                                    setIsSidebarOpen(false);
                                                                }
                                                            }}
                                                            className={`flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                                                ? 'bg-blue-50 text-blue-600 font-medium'
                                                                : 'text-gray-600 hover:bg-gray-100'
                                                                }`}
                                                        >
                                                            <span className="mr-3 text-lg">{item.icon}</span>
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className={`flex-1 pt-16 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 md:p-6 h-full"
                >
                    <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-120px)] overflow-y-auto">
                        <Outlet />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;