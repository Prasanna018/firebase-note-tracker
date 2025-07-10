import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateNoteById, getSingleNoteById } from '../../services/note-service';
import { useUserAuth } from '../../context/useUserContext';

import EditorRichTextEditor from '../../component/EditorRichTextEdit';

const EditNote = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const note = await getSingleNoteById(user.uid, id);
                if (note) {
                    setTitle(note.note.title);
                    setContent(note.note.content);
                } else {
                    toast.error('Note not found');
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Error fetching note:', error);
                toast.error('Failed to load note');
                navigate('/dashboard');
            } finally {
                setIsLoading(false);
            }
        };

        if (user && id) {
            fetchNote();
        }
    }, [user, id, navigate]);

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error('Please enter a note title');
            return;
        }

        if (!content.trim()) {
            toast.error('Please add some content to your note');
            return;
        }

        setIsSaving(true);

        try {
            const noteUpdates = {
                'note.title': title.trim(),
                'note.content': content,
                'note.updatedAt': new Date().toISOString()
            };

            const result = await updateNoteById(user.uid, id, noteUpdates);
            if (result) {
                toast.success('Note Updated Successfully!');
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error('Failed to update note. Please try again.');
            console.error('Error updating note:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen p-4 md:p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-6">Edit Note</h1>

            <div className="mb-4">
                <label htmlFor="note-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Note Title
                </label>
                <input
                    id="note-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your note"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={100}
                    required
                />
                <p className="text-xs text-gray-500 mt-1">
                    {title.length}/100 characters
                </p>
            </div>

            <div className="flex-grow">
                <EditorRichTextEditor
                    content={content}
                    onChange={(html) => setContent(html)}
                    onSave={handleSave}
                    isSaving={isSaving}
                />
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isSaving || !title.trim() || !content.trim()}
                    className={`px-4 py-2 rounded-md text-white ${isSaving || !title.trim() || !content.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default EditNote;