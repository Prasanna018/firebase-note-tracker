/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserAuth } from '../../context/useUserContext';
import { getSingleNoteById } from '../../services/note-service';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiBookmark, FiClock, FiAlertCircle } from 'react-icons/fi';

const SingleNote = () => {
    const { id } = useParams();
    const { user } = useUserAuth();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNote = async () => {
            try {
                setLoading(true);
                const result = await getSingleNoteById(user?.uid, id);
                if (result?.note) {
                    setNote(result.note);
                } else {
                    setError('Note not found');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch note');
            } finally {
                setLoading(false);
            }
        }

        if (user?.uid && id) {
            getNote();
        }
    }, [id, user])

    if (loading) {
        return (
            <motion.div
                className="flex justify-center items-center h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center h-64 text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <FiAlertCircle className="text-4xl mb-4" />
                <p className="text-xl">{error}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </motion.div>
        );
    }

    if (!note) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>No note data available</p>
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-4xl mx-auto p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                    <motion.h1
                        className="text-3xl font-bold text-gray-800"
                        initial={{ x: -10 }}
                        animate={{ x: 0 }}
                    >
                        {note.title}
                    </motion.h1>

                    {note.bookmarked && (
                        <span className="flex items-center text-yellow-500">
                            <FiBookmark className="mr-1" />
                            Bookmarked
                        </span>
                    )}
                </div>

                <div className="flex items-center text-gray-500 mb-6">
                    <FiClock className="mr-2" />
                    <span>
                        {format(new Date(note.createdAt), 'MMMM dd, yyyy - h:mm a')}
                    </span>
                </div>

                <motion.div
                    className="prose max-w-none text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                />
            </div>
        </motion.div>
    )
}

export default SingleNote