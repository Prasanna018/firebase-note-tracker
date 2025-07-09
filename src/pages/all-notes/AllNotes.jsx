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
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-xl">No notes found</p>
                <button
                    onClick={() => navigate('/dashboard/create-note')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Create Your First Note
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