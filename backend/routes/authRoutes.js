const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('../config/config'); // Import the configuration file
const router = express.Router();

// Registration route with validation
router.post(
    '/register',
    [
        check('username').notEmpty().isLength({ min: 4 }).withMessage('Username should be at least 4 characters long'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            // Create a new user instance and save it to the database
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });

            res.status(201).send({ newUser });
        } catch (error) {
            res.status(500).send(error);
        }
    }
);

// Login route
router.post('/login', async (req, res) => {
    console.log('Request received'); // Add this line

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email: req.body.email } });
        //console.log('User found'); // Add this line

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare submitted password with stored hash
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // User is authenticated at this point. Handle session creation.
        req.session.userId = user.id; // Store user ID in the session

        res.send('Login successful');
    } catch (error) {
        console.log(error); // Add this line to log any errors
        res.status(500).send(error);
    }
});



module.exports = router;
