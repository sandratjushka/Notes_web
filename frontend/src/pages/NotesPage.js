import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteEditor from '../components/notes/NoteEditor';
import NoteList from '../components/notes/NoteList';
import '../styles/Notes.css';

function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const response = await fetch('/notes/all', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setNotes(data.notes || []);
            } else {
                console.error('Failed to fetch notes:', response.statusText);
            }
        } catch (error) {
            console.error('There was an error fetching the notes:', error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleAddOrUpdateNote = async (noteData) => {
        let url = '/notes/create';
        let method = 'POST';
        if (currentNote) {
            url = `/notes/${currentNote.id}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
                credentials: 'include',
            });

            if (response.ok) {
                const updatedNotes = await response.json();
                if (currentNote) {
                    setNotes(notes.map((note) => (note.id === currentNote.id ? updatedNotes.note : note)));
                } else {
                    setNotes([...notes, updatedNotes.note]);
                }
                setCurrentNote(null);

                // Fetch the notes again to ensure you have the latest data
                fetchNotes();
            } else {
                console.error('Failed to add/update note:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding/updating note:', error);
        }
    };

    const onEdit = (note) => {
        setCurrentNote(note);
    };

    const onDelete = async (noteId) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            const response = await fetch(`/notes/${noteId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setNotes(notes.filter((note) => note.id !== noteId));
            } else {
                console.error('Failed to delete note');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };


    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/login'); // Redirect to the login page after successful logout
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="notes-page">
            <NoteEditor onAddOrUpdateNote={handleAddOrUpdateNote} currentNote={currentNote} />
            <NoteList notes={notes} onEdit={onEdit} onDelete={onDelete} />
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default NotesPage;
