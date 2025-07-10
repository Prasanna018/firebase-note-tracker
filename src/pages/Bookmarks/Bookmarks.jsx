/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../context/useUserContext';
import { getBookmarkedNotes, toggleBookmark, deleteNote } from '../../services/note-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookmark, FiTrash2, FiEdit2, FiEye, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';

const Bookmarks = () => {
    const { user } = useUserAuth();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.uid) {
            const fetchBookmarkedNotes = async () => {
                try {
                    const result = await getBookmarkedNotes(user.uid);
                    setNotes(result || []);
                } catch (error) {
                    toast.error('Failed to load bookmarked notes');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchBookmarkedNotes();
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
    };

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
                ).filter(note => note.note.bookMarked) // Filter to keep only bookmarked notes
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
            <div className="flex flex-col items-center justify-center h-[70vh] gap-6">
                <div className="relative">
                    <svg
                        className="w-24 h-24 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                </div>
                <p className="text-2xl font-bold text-gray-600">No bookmarked notes yet</p>
                <p className="text-gray-500 mb-6">Bookmark some notes to see them here</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    View All Notes
                </button>
            </div>
        );
    }

    return (
        <div className="w-full p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FiBookmark className="text-yellow-500" />
                Bookmarked Notes
            </h1>
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
                        <div className="p-5 border-l-4 border-yellow-400 bg-yellow-50">
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-xl font-semibold text-gray-800 truncate">
                                    {note.title || 'Untitled Note'}
                                </h2>
                                <button
                                    onClick={() => handleToggleBookmark(note.noteId, note.bookMarked)}
                                    className="p-2 rounded-full text-yellow-500 hover:text-yellow-600 hover:bg-gray-100"
                                    aria-label="Remove bookmark"
                                >
                                    <FiBookmark className="fill-current" />
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
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                    Bookmarked
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;