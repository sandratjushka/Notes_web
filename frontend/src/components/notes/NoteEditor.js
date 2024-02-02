import React, { useState, useEffect } from 'react';
import '../../styles/Notes.css';

function NoteEditor({ onAddOrUpdateNote, currentNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // If there is a currentNote, set the form fields to its values for editing
        if (currentNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
        }
    }, [currentNote]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (submitting) return;
        setSubmitting(true);

        try {
            await onAddOrUpdateNote({ title, content });
            setTitle(''); // Reset the title
            setContent(''); // Reset the content
        } catch (error) {
            console.error('There was an error submitting the note:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="note-editor">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Heading"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Text"
                    required
                />
                <button type="submit" disabled={submitting}>
                    {currentNote ? 'Save Changes' : 'Add Note'}
                </button>
            </form>
        </div>
    );
}

export default NoteEditor;
