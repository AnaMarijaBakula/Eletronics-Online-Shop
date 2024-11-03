const session = require('express-session');

const sessionConfig = {
    secret: 'someSecret',  // key for signing the cookie
    resave: false,
    saveUninitialized: true,  // Save new sessions
    cookie: { secure: false }
};

module.exports = sessionConfig;