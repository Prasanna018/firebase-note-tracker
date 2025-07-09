/* eslint-disable no-unused-vars */
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { FiStar } from "react-icons/fi";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Product Manager",
        content: "This notes app has completely transformed how I organize my work. The tagging system is brilliant!",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Software Engineer",
        content: "I love how fast the search works. Found a note from 6 months ago in seconds!",
        rating: 4,
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
        id: 3,
        name: "Emma Williams",
        role: "UX Designer",
        content: "The clean interface helps me focus on writing without distractions. Perfect for creative work.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 4,
        name: "David Kim",
        role: "Student",
        content: "Syncs perfectly across all my devices. Lifesaver for lecture notes and study materials.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
        id: 5,
        name: "Olivia Martinez",
        role: "Content Creator",
        content: "The templates save me so much time. I've standardized all my client work with them.",
        rating: 4,
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Researcher",
        content: "Best note-taking app for academic work. The PDF annotation features are superb.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
];

const TestimonialCard = ({ name, role, content, rating, avatar }) => {
    return (
        <motion.div
            className="flex-shrink-0 w-80 md:w-96 bg-white rounded-xl p-6 mx-4"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center mb-4">
                <img
                    src={avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-100"
                />
                <div>
                    <h4 className="font-semibold text-gray-900">{name}</h4>
                    <p className="text-sm text-gray-500">{role}</p>
                </div>
            </div>
            <p className="text-gray-700 mb-4">{content}</p>
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <FiStar
                        key={i}
                        className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const InfiniteScrollTestimonials = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Duplicate testimonials for infinite effect
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    useEffect(() => {
        if (isInView) {
            controls.start({
                x: ["0%", "-50%"],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear"
                    }
                }
            });
        }
    }, [isInView, controls]);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Loved by <span className="text-blue-600">Thousands</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Join millions of users who trust our notes app for their ideas and productivity.
                    </p>
                </motion.div>

                <div ref={ref} className="relative">
                    <motion.div
                        className="flex"
                        animate={controls}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={`${testimonial.id}-${index}`}
                                {...testimonial}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Dots indicator */}
                <motion.div
                    className="flex justify-center mt-8 space-x-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {[1, 2, 3].map((dot) => (
                        <motion.div
                            key={dot}
                            className="w-2 h-2 rounded-full bg-gray-300"
                            animate={{
                                scale: dot === 2 ? [1, 1.2, 1] : 1,
                                backgroundColor: dot === 2 ? "#3B82F6" : "#E5E7EB"
                            }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 2
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default InfiniteScrollTestimonials;