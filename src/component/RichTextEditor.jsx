import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useState, useRef } from 'react'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Link as LinkIcon,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    AlignJustify,
    Quote,
    Code,
    Minus,
    Save,
    Heading1,
    Heading2,
    Heading3
} from 'lucide-react'

const RichTextEditor = ({ content, onChange, onSave }) => {
    const [linkUrl, setLinkUrl] = useState('')
    const [showLinkInput, setShowLinkInput] = useState(false)
    const editorRef = useRef(null)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg border shadow-sm mx-auto my-4 max-w-full h-auto',
                    alt: 'Uploaded image'
                }
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 hover:underline',
                    rel: 'noopener noreferrer',
                    target: '_blank'
                }
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return `Heading ${node.attrs.level} - Type / for commands...`
                    }
                    return 'Start writing here or type / for commands...'
                },
            }),
        ],
        content: content || `
       
            <p>Start from here...</p>
         
        `,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    const setLink = () => {
        if (showLinkInput) {
            // Apply link
            if (linkUrl) {
                editor
                    .chain()
                    .focus()
                    .extendMarkRange('link')
                    .setLink({ href: linkUrl })
                    .run()
            }
            setShowLinkInput(false)
            setLinkUrl('')
        } else {
            // Show input
            const previousUrl = editor.getAttributes('link').href
            setLinkUrl(previousUrl || '')
            setShowLinkInput(true)
        }
    }

    const addImage = () => {
        const url = window.prompt('Enter the URL of the image:')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    if (!editor) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center p-6 max-w-md">
                    <h2 className="text-xl font-semibold mb-2">Loading Editor...</h2>
                    <p className="text-gray-600">Please wait while we prepare your writing environment.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col bg-gray-50" ref={editorRef}>
            <div className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                {/* Top Toolbar with improved tooltips */}
                <div className="bg-white border-b border-gray-200 p-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Bold"
                            data-tooltip="Bold (Ctrl+B)"
                        >
                            <Bold size={18} />
                            <span className="sr-only">Bold</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Italic"
                            data-tooltip="Italic (Ctrl+I)"
                        >
                            <Italic size={18} />
                            <span className="sr-only">Italic</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Underline"
                            data-tooltip="Underline (Ctrl+U)"
                        >
                            <UnderlineIcon size={18} />
                            <span className="sr-only">Underline</span>
                        </button>

                        <div className="h-6 border-l border-gray-300 mx-1"></div>

                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Heading 1"
                            data-tooltip="Heading 1"
                        >
                            <Heading1 size={18} />
                            <span className="sr-only">Heading 1</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Heading 2"
                            data-tooltip="Heading 2"
                        >
                            <Heading2 size={18} />
                            <span className="sr-only">Heading 2</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Heading 3"
                            data-tooltip="Heading 3"
                        >
                            <Heading3 size={18} />
                            <span className="sr-only">Heading 3</span>
                        </button>

                        <div className="h-6 border-l border-gray-300 mx-1"></div>

                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Bullet List"
                            data-tooltip="Bullet List"
                        >
                            <List size={18} />
                            <span className="sr-only">Bullet List</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Numbered List"
                            data-tooltip="Numbered List"
                        >
                            <List size={18} className="font-bold" />
                            <span className="sr-only">Numbered List</span>
                        </button>

                        <div className="h-6 border-l border-gray-300 mx-1"></div>

                        <button
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Align Left"
                            data-tooltip="Align Left"
                        >
                            <AlignLeft size={18} />
                            <span className="sr-only">Align Left</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Align Center"
                            data-tooltip="Align Center"
                        >
                            <AlignCenter size={18} />
                            <span className="sr-only">Align Center</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Align Right"
                            data-tooltip="Align Right"
                        >
                            <AlignRight size={18} />
                            <span className="sr-only">Align Right</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Justify"
                            data-tooltip="Justify"
                        >
                            <AlignJustify size={18} />
                            <span className="sr-only">Justify</span>
                        </button>

                        <div className="h-6 border-l border-gray-300 mx-1"></div>

                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Blockquote"
                            data-tooltip="Blockquote"
                        >
                            <Quote size={18} />
                            <span className="sr-only">Blockquote</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('codeBlock') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Code Block"
                            data-tooltip="Code Block"
                        >
                            <Code size={18} />
                            <span className="sr-only">Code Block</span>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            className="p-2 rounded hover:bg-gray-100 text-gray-700"
                            aria-label="Horizontal Rule"
                            data-tooltip="Horizontal Rule"
                        >
                            <Minus size={18} />
                            <span className="sr-only">Horizontal Rule</span>
                        </button>
                        <button
                            onClick={setLink}
                            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                            aria-label="Link"
                            data-tooltip="Add Link"
                        >
                            <LinkIcon size={18} />
                            <span className="sr-only">Link</span>
                        </button>
                        <button
                            onClick={addImage}
                            className="p-2 rounded hover:bg-gray-100 text-gray-700"
                            aria-label="Image"
                            data-tooltip="Add Image"
                        >
                            <ImageIcon size={18} />
                            <span className="sr-only">Image</span>
                        </button>
                    </div>
                    {onSave && (
                        <button
                            onClick={onSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2 transition-colors"
                            aria-label="Save"
                        >
                            <Save size={16} />
                            <span>Save</span>
                        </button>
                    )}
                </div>

                {/* Link Input with better placeholder */}
                {showLinkInput && (
                    <div className="bg-white border-b border-gray-200 p-2 flex items-center">
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                            aria-label="Link URL"
                        />
                        <button
                            onClick={setLink}
                            className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors"
                            aria-label="Apply Link"
                        >
                            Apply
                        </button>
                    </div>
                )}

                {/* Editor Content with better empty state */}
                <div className="flex-1 overflow-auto p-4 md:p-6">
                    {editor.isEmpty && !editor.isFocused && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center text-gray-400 max-w-md px-4">
                                <p className="text-lg">Start typing or use the toolbar above</p>
                                <p className="mt-2 text-sm">Try typing '/' for formatting options</p>
                            </div>
                        </div>
                    )}
                    <EditorContent
                        editor={editor}
                        className="min-h-full outline-none max-w-full prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none"
                    />
                </div>

                {/* Floating Menu with better tooltips */}
                {editor && (
                    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                className="px-3 py-2 hover:bg-gray-100"
                                aria-label="Heading 1"
                                data-tooltip="Heading 1"
                            >
                                <Heading1 size={16} />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                className="px-3 py-2 hover:bg-gray-100"
                                aria-label="Heading 2"
                                data-tooltip="Heading 2"
                            >
                                <Heading2 size={16} />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className="px-3 py-2 hover:bg-gray-100"
                                aria-label="Bullet List"
                                data-tooltip="Bullet List"
                            >
                                <List size={16} />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                className="px-3 py-2 hover:bg-gray-100"
                                aria-label="Blockquote"
                                data-tooltip="Blockquote"
                            >
                                <Quote size={16} />
                            </button>
                        </div>
                    </FloatingMenu>
                )}

                {/* Bubble Menu with better tooltips */}
                {editor && (
                    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                            <button
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`px-3 py-2 hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100 text-blue-600' : ''}`}
                                aria-label="Bold"
                                data-tooltip="Bold"
                            >
                                <Bold size={16} />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`px-3 py-2 hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100 text-blue-600' : ''}`}
                                aria-label="Italic"
                                data-tooltip="Italic"
                            >
                                <Italic size={16} />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`px-3 py-2 hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-100 text-blue-600' : ''}`}
                                aria-label="Underline"
                                data-tooltip="Underline"
                            >
                                <UnderlineIcon size={16} />
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleLink().run()}
                                className={`px-3 py-2 hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100 text-blue-600' : ''}`}
                                aria-label="Link"
                                data-tooltip="Link"
                            >
                                <LinkIcon size={16} />
                            </button>
                        </div>
                    </BubbleMenu>
                )}
            </div>
        </div>
    )
}

export default RichTextEditor