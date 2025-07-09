/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/useUserContext'
import { deleteNote, getNoteById } from '../../services/note-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookmark, FiTrash2, FiEdit2, FiEye, FiClock } from 'react-icons/fi';
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
                // filtering and updating the setNotes to get updated notes
                setNotes(prevNotes => prevNotes.filter(noteItem => noteItem.note.noteId !== id));
            }
        } catch (error) {
            toast.error('Failed to delete note');
            console.error(error);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-6 animate-bounce-in">
                <div className="relative">
                    <svg
                        className="w-24 h-24 text-gray-400 animate-float"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                        <path
                            className="opacity-0 animate-draw"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6"
                            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
                        />
                    </svg>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full animate-ping opacity-75"></div>
                </div>

                <p className="text-2xl font-bold text-gray-600 animate-text-rise">
                    Your notebook is empty!
                </p>
                <p className="text-gray-500 mb-6 animate-text-rise" style={{ animationDelay: '0.2s' }}>
                    Let's create something amazing
                </p>

                <button
                    onClick={() => navigate('/dashboard/create-note')}
                    className="px-6 py-3 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-button-pop"
                    style={{ animationDelay: '0.4s' }}
                >
                    <span className="flex items-center gap-2">
                        ✨ Create Your First Note
                    </span>
                </button>
            </div>
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
                        <div className={`p-5 border-l-4 ${note.bookMarked ? 'border-yellow-400' : 'border-transparent'}`}>
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-xl font-semibold text-gray-800 truncate">
                                    {note.title || 'Untitled Note'}
                                </h2>
                                <button
                                    className={`p-2 rounded-full ${note.bookMarked ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                                >
                                    <FiBookmark className={note.bookMarked ? 'fill-current' : ''} />
                                </button>
                            </div>

                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <FiClock className="mr-1" />
                                <span>
                                    {format(new Date(note.createdAt), 'MMM dd, yyyy')}
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
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AllNotes;