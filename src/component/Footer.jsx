/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
            >
                {/* Logo and description */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <motion.h3
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        NoteTrack
                    </motion.h3>
                    <p className="text-gray-400">
                        Your intelligent note-taking companion. Organize, remember, and create effortlessly.
                    </p>
                    <div className="flex space-x-4">
                        {[FiGithub, FiTwitter, FiLinkedin].map((Icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                whileHover={{ y: -3, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h4 className="text-lg font-semibold">Quick Links</h4>
                    <ul className="space-y-2">
                        {['Features', 'Pricing', 'Testimonials', 'Blog'].map((link, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    {link}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Resources */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h4 className="text-lg font-semibold">Resources</h4>
                    <ul className="space-y-2">
                        {['Help Center', 'Documentation', 'Community', 'Tutorials'].map((link, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    {link}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h4 className="text-lg font-semibold">Stay Updated</h4>
                    <p className="text-gray-400">Subscribe to our newsletter for the latest updates.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-r-md font-medium"
                        >
                            Subscribe
                        </motion.button>
                    </div>

                    {/* App Download Badges */}
                    <div className="pt-4 flex space-x-3">
                        <motion.a
                            href="#"
                            whileHover={{ y: -3 }}
                            className="bg-black text-white p-2 rounded-lg flex items-center"
                        >
                            <FaAppStore className="w-5 h-5 mr-2" />
                            <div className="text-xs">
                                <div>Download on the</div>
                                <div className="font-bold">App Store</div>
                            </div>
                        </motion.a>
                        <motion.a
                            href="#"
                            whileHover={{ y: -3 }}
                            className="bg-black text-white p-2 rounded-lg flex items-center"
                        >
                            <FaGooglePlay className="w-5 h-5 mr-2" />
                            <div className="text-xs">
                                <div>Get it on</div>
                                <div className="font-bold">Google Play</div>
                            </div>
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
            >
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} NoteTrack. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item, index) => (
                        <motion.a
                            key={index}
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            className="text-gray-500 hover:text-white text-sm transition-colors"
                        >
                            {item}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;