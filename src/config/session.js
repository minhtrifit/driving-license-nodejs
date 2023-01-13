const session = require('express-session');

function sessionConfig(app) {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
}

module.exports = sessionConfig;