import { useState } from 'react'
import RichTextEditor from '../../component/RichTextEditor'
import { useUserAuth } from '../../context/useUserContext'
import { createNote } from '../../services/note-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateNote() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { user } = useUserAuth();
    const navigate = useNavigate();

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
            const note = {
                id: user.uid,
                note: {
                    noteId: uuidv4(),
                    title: title.trim(),
                    content: content,
                    bookMarked: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }

            const result = await createNote(note);
            if (result) {
                toast.success('Note created successfully!');
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error('Failed to create note. Please try again.');
            console.error('Error creating note:', error);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="w-full h-screen p-4 md:p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-6">Create New Note</h1>

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
                <RichTextEditor
                    content={content}
                    onChange={(html) => setContent(html)}
                    onSave={handleSave}
                    isSaving={isSaving}
                />
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => navigate('/dashboard/notes')}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isSaving || !title.trim() || !content.trim()}
                    className={`px-4 py-2 rounded-md text-white ${isSaving || !title.trim() || !content.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isSaving ? 'Saving...' : 'Save Note'}
                </button>
            </div>
        </div>
    )
}

export default CreateNote;