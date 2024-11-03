const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionStore = MongoStore.create({  // Create a new store
    mongoUrl: process.env.CONNECTION_STRING,
    collectionName: 'sessions',
});

const sessionConfig = {
    secret: 'someSecret',  // key for signing the cookie
    resave: false,
    saveUninitialized: true,  // Save new sessions
    store: sessionStore,  // Store sessions in the database
    cookie: { secure: false , maxAge: 1000 * 60 * 60 * 24 },  // 24 hours
};

module.exports = sessionConfig;