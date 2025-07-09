/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiCheck, FiFileText, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useUserAuth } from '../../context/useUserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: '',
        confirmPassword: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const navigate = useNavigate();

    const { SignIn, GoogleLogin } = useUserAuth();

    const handleForm = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (userInfo.password !== userInfo.confirmPassword) {
            setPasswordMatch(false);
            toast.error("Passwords don't match");
            return;
        }

        try {
            const result = await SignIn(userInfo.email, userInfo.password);
            if (result) {
                toast.success('Account created successfully!');
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleGoogleForm = async (e) => {
        e.preventDefault();
        try {
            await GoogleLogin();
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    const noteLineVariants = {
        hidden: { width: 0 },
        visible: {
            width: "100%",
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                {/* Left Side - Modern Notes Animation */}
                <motion.div
                    className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 relative overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                        {/* Header */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-4xl font-bold text-white mb-4">Start Your Journey</h1>
                            <p className="text-xl text-white opacity-90 mb-8 max-w-md">
                                Join thousands of users organizing their thoughts with our note-taking platform.
                            </p>
                        </motion.div>

                        {/* Animated Note Lines */}
                        <div className="space-y-6">
                            <motion.div
                                className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center mb-3">
                                    <FiFileText className="text-white w-5 h-5 mr-3" />
                                    <span className="text-white font-medium">Daily Notes</span>
                                </div>
                                <div className="h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white rounded-full"
                                        variants={noteLineVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.4 }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-white opacity-80">
                                    <span>0</span>
                                    <span>5</span>
                                    <span>10</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex items-center mb-3">
                                    <FiTrendingUp className="text-white w-5 h-5 mr-3" />
                                    <span className="text-white font-medium">Productivity</span>
                                </div>
                                <div className="h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white rounded-full"
                                        variants={noteLineVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.6 }}
                                        style={{ originX: 0 }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-white opacity-80">
                                    <span>0%</span>
                                    <span>50%</span>
                                    <span>100%</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center mb-3">
                                    <FiUsers className="text-white w-5 h-5 mr-3" />
                                    <span className="text-white font-medium">Shared Notes</span>
                                </div>
                                <div className="h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white rounded-full"
                                        variants={noteLineVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.8 }}
                                        style={{ originX: 0 }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-white opacity-80">
                                    <span>0</span>
                                    <span>3</span>
                                    <span>6</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Floating Note Icons */}
                        <motion.div
                            className="absolute bottom-8 right-8 flex space-x-4"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                y: [20, 0, 0, -20],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatDelay: 2,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.8, 1]
                            }}
                        >
                            <FiFileText className="text-white opacity-60 w-6 h-6" />
                            <FiFileText className="text-white opacity-60 w-6 h-6" />
                            <FiFileText className="text-white opacity-60 w-6 h-6" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side - Sign Up Form */}
                <motion.div
                    className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                        <p className="text-gray-600 mb-8">Start organizing your notes and boost your productivity</p>
                    </motion.div>

                    <motion.form onSubmit={handleForm} variants={itemVariants}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    required
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => {
                                        setUserInfo({
                                            ...userInfo,
                                            email: e.target.value
                                        })
                                    }}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    required
                                    value={userInfo.password}
                                    onChange={(e) => {
                                        setUserInfo({
                                            ...userInfo,
                                            password: e.target.value
                                        });
                                        setPasswordMatch(true);
                                    }}
                                    type="password"
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    required
                                    value={userInfo.confirmPassword}
                                    onChange={(e) => {
                                        setUserInfo({
                                            ...userInfo,
                                            confirmPassword: e.target.value
                                        });
                                        setPasswordMatch(true);
                                    }}
                                    type="password"
                                    className={`w-full pl-10 pr-3 py-3 border ${!passwordMatch ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {!passwordMatch && (
                                <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
                        >
                            Create Account
                        </motion.button>
                    </motion.form>

                    <motion.div
                        className="flex items-center my-6"
                        variants={itemVariants}
                    >
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            onClick={handleGoogleForm}
                            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            <span>Continue with Google</span>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="mt-6 text-center"
                        variants={itemVariants}
                    >
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to={'/login'} className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignIn;