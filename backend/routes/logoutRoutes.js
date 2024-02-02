const express = require('express');
const router = express.Router();

// Logout route
router.post('/logout', (req, res) => {
    // Implement the logout logic here
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

module.exports = router;
