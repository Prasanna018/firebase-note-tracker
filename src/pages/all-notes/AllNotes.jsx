/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/useUserContext'
import { deleteNote, getNoteById, toggleBookmark } from '../../services/note-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookmark, FiTrash2, FiEdit2, FiEye, FiClock, FiFileText } from 'react-icons/fi';
import { format } from 'date-fns';

const AllNotes = () => {
    const { user } = useUserAuth();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.uid) {
            const fetchNotes = async () => {
                try {
                    const result = await getNoteById(user.uid);
                    setNotes(result || []);
                } catch (error) {
                    toast.error('Failed to load notes');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchNotes();
        }
    }, [user]);

    const handleDelete = async (id) => {
        try {
            const result = await deleteNote(user.uid, id);
            if (result) {
                toast.success('Note deleted successfully');
                setNotes(prevNotes => prevNotes.filter(noteItem => noteItem.note.noteId !== id));
            }
        } catch (error) {
            toast.error('Failed to delete note');
            console.error(error);
        }
    }

    const handleToggleBookmark = async (noteId, currentStatus) => {
        try {
            const newStatus = await toggleBookmark(user.uid, noteId, currentStatus);

            setNotes(prevNotes =>
                prevNotes.map(noteItem =>
                    noteItem.note.noteId === noteId
                        ? {
                            ...noteItem,
                            note: {
                                ...noteItem.note,
                                bookMarked: newStatus
                            }
                        }
                        : noteItem
                )
            );

            toast.success(`Note ${newStatus ? 'bookmarked' : 'removed from bookmarks'}`);
        } catch (error) {
            toast.error('Failed to update bookmark');
            console.error('Error toggling bookmark:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center h-[70vh] gap-6"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="text-gray-400"
                >
                    <FiFileText size={80} />
                </motion.div>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-gray-700"
                >
                    No Notes Found
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-500 text-center max-w-md"
                >
                    You don't have any notes yet. Create your first note to get started!
                </motion.p>

                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/dashboard/create-note')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    Create Your First Note
                </motion.button>

                <motion.div
                    className="absolute bottom-10"
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}
                >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <div className="w-full p-4 md:p-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {notes.map(({ note }) => (
                    <motion.div
                        key={note.noteId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className={`p-5 border-l-4 ${note.bookMarked ? 'border-yellow-400 bg-yellow-50' : 'border-transparent'}`}>
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-xl font-semibold text-gray-800 truncate">
                                    {note.title || 'Untitled Note'}
                                </h2>
                                <button
                                    onClick={() => handleToggleBookmark(note.noteId, note.bookMarked)}
                                    className={`p-2 rounded-full transition-colors ${note.bookMarked ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-gray-600'} hover:bg-gray-100`}
                                    aria-label={note.bookMarked ? 'Remove bookmark' : 'Add bookmark'}
                                >
                                    <FiBookmark className={note.bookMarked ? 'fill-current' : ''} />
                                </button>
                            </div>

                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <FiClock className="mr-1" />
                                <span>
                                    {format(new Date(note.createdAt), 'MMM dd, yyyy')}
                                    {note.updatedAt && ` • Updated: ${format(new Date(note.updatedAt), 'MMM dd')}`}
                                </span>
                            </div>

                            <div
                                className="prose prose-sm max-w-none text-gray-600 mb-4 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: note.content.substring(0, 200) + (note.content.length > 200 ? '...' : '') }}
                            />

                            <div className="flex justify-between items-center border-t pt-4">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => navigate(`/dashboard/notes/${note.noteId}`)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        title="View note"
                                    >
                                        <FiEye />
                                    </button>
                                    <button
                                        onClick={() => navigate(`/dashboard/edit-note/${note.noteId}`)}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                        title="Edit note"
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.noteId)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="Delete note"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                                {note.bookMarked && (
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                        Bookmarked
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AllNotes;