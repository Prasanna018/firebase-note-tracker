/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiEdit, FiLayers, FiSearch, FiShare2, FiLock, FiBell } from "react-icons/fi";

const NotesTrackerFeatures = () => {
    const features = [
        {
            icon: <FiEdit className="w-6 h-6" />,
            title: "Smart Editing",
            description: "Rich text editor with markdown support and AI-powered suggestions to enhance your notes.",
            animation: {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6 }
            }
        },
        {
            icon: <FiLayers className="w-6 h-6" />,
            title: "Organize Effortlessly",
            description: "Nested folders, tags, and color-coding to keep your notes perfectly organized.",
            animation: {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 }
            }
        },
        {
            icon: <FiSearch className="w-6 h-6" />,
            title: "Instant Search",
            description: "Find any note instantly with our powerful search that even recognizes text in images.",
            animation: {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4 }
            }
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Powerful Features for <span className="text-blue-600">Your Notes</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Everything you need to capture, organize, and find your ideas quickly and beautifully.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={feature.animation}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mb-6 mx-auto">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-center">{feature.description}</p>
                            </div>
                            <div className="px-8 pb-8">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg text-center cursor-pointer hover:shadow-md transition-all"
                                >
                                    Learn more
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional features as smaller cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <FiShare2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">Easy Sharing</h4>
                            <p className="text-sm text-gray-500">Share with teams or clients</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <FiLock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">End-to-End Encryption</h4>
                            <p className="text-sm text-gray-500">Your notes stay private</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                            <FiBell className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">Reminders</h4>
                            <p className="text-sm text-gray-500">Never miss important notes</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NotesTrackerFeatures;