/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#e4f1fe] overflow-hidden p-8">
            {/* Background effects */}
            <div className="absolute w-full h-full top-0 left-0">
                <NoteIcon x="10%" y="20%" delay={0} />
                <NoteIcon x="80%" y="30%" delay={0.3} />
                <NoteIcon x="30%" y="70%" delay={0.6} />
                <NoteIcon x="70%" y="80%" delay={0.9} />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl w-full text-center py-16 px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[#4a6bdf] text-lg font-semibold tracking-wider mb-4 uppercase">
                        YOUR THOUGHTS, ORGANIZED
                    </p>
                    <h1 className="text-5xl font-extrabold leading-tight mb-6 text-[#2c3e50] md:text-4xl">
                        Capture, Organize & <span className="text-[#4a6bdf] relative inline-block">
                            Find
                            <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[rgba(74,107,223,0.2)] rounded -z-10"></span>
                        </span> <br />
                        Your Notes Instantly
                    </h1>
                    <p className="text-xl text-[#7f8c8d] max-w-3xl mx-auto mb-12 leading-relaxed md:text-lg">
                        The smart note-taking app that helps you remember everything and find anything
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex gap-4 justify-center mb-16 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <motion.button
                        className="px-7 py-3 rounded-full text-white font-semibold bg-[#4a6bdf] shadow-lg shadow-[rgba(74,107,223,0.3)] hover:bg-[#3a5bd9] hover:shadow-xl hover:shadow-[rgba(74,107,223,0.4)] transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Your Free Trial
                    </motion.button>
                    <motion.button
                        className="px-7 py-3 rounded-full font-semibold bg-white text-[#4a6bdf] border border-[#4a6bdf] hover:bg-gray-50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        See How It Works
                    </motion.button>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="text-4xl mb-4">📝</div>
                        <p className="font-semibold text-[#2c3e50]">Rich Text Notes</p>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="font-semibold text-[#2c3e50]">Powerful Search</p>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <div className="text-4xl mb-4">📱</div>
                        <p className="font-semibold text-[#2c3e50]">Cross-Platform Sync</p>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <div className="text-4xl mb-4">🔒</div>
                        <p className="font-semibold text-[#2c3e50]">End-to-End Encryption</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Floating note icon component
const NoteIcon = ({ x, y, delay }) => {
    return (
        <motion.div
            className="absolute text-3xl opacity-20 z-0"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                delay: delay,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 2
            }}
        >
            📄
        </motion.div>
    );
};

export default HeroSection;