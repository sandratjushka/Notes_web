import React from 'react';
import '../../styles/Notes.css';

function NoteList({ notes, onEdit, onDelete }) {
    return (
        <div className="note-list">
            {notes.map((note, index) => (
                <div key={index} className="note-item">
                    {note && (
                        <>
                            {note.title && <h3>{note.title}</h3>}
                            {note.content && <p>{note.content}</p>}
                            <button onClick={() => onEdit(note)}>Edit</button>
                            <button onClick={() => onDelete(note.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default NoteList;
