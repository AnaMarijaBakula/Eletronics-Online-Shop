const MongoStore = require('connect-mongo');


const sessionStore = new MongoStore({
    mongoUrl: process.env.CONNECTION_STRING,
    collectionName: 'sessions',
});


const sessionConfig = {
    secret: 'someSecret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
};




module.exports = sessionConfig;