const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/db');
const config = require('./config/config');

const app = express();
const port = process.env.PORT || 6000;

// Session configuration
const sessionConfig = {
    secret: config.sessionSecret,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
};

// Apply body-parser middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply session middleware with Sequelize store
app.use(session(sessionConfig));

// Static Middleware for serving static files
app.use(express.static('public'));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const notesRoutes = require('./routes/notesRoutes');
app.use('/notes', notesRoutes);

const logoutRoutes = require('./routes/logoutRoutes');
app.use(logoutRoutes);


// Sync Sequelize models with the database
sequelize.sync().then(() => {
    console.log('Database connected.');
}).catch((err) => {
    console.error('Database connection failed. Error:', err);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
