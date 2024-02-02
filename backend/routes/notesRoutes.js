const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Note = require('../models/Note'); // Import the Note model

// Middleware for validating note data
const validateNoteData = [
    check('title').notEmpty().withMessage('Title is required'),
    check('content').notEmpty().withMessage('Content is required')
];

// Create a new note
router.post('/create', validateNoteData, async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Create a new note using the Note model and set the user_id
        const newNote = await Note.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId, // Use the logged-in user's ID
        });

        if (newNote) {
            console.log('New note created:', newNote.toJSON());
            res.status(201).json({ newNote });
        } else {
            console.error('Failed to create a new note.');
            res.status(500).json({ error: 'Failed to create a new note' });
        }
    } catch (error) {
        console.error('Error creating a new note:', error);
        res.status(500).json({ error: 'Failed to create a new note' });
    }
});

// Retrieve all notes for a user
router.get('/all', async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.session.userId; // Get the logged-in user's ID
        const notes = await Note.findAll({ where: { user_id: userId } });

        res.json({ notes });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve notes' });
    }
});

// Update a note by ID
router.put('/:id', validateNoteData, async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Find the note by ID
        const note = await Note.findByPk(req.params.id);

        // Check if the note exists
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Check if the user is the owner of the note
        if (note.user_id !== req.session.userId) {
            return res.status(403).json({ error: 'Permission denied' });
        }

        // Update the note with new data
        note.title = req.body.title;
        note.content = req.body.content;

        // Save the updated note
        await note.save();

        res.status(200).json({ message: 'Note updated successfully', note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.session.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Find the note by ID
        const note = await Note.findByPk(req.params.id);

        // Check if the note exists
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Check if the user is the owner of the note
        if (note.user_id !== req.session.userId) {
            return res.status(403).json({ error: 'Permission denied' });
        }

        // Delete the note
        await note.destroy();

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
