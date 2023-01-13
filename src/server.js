const express = require('express');
const handlebars = require('express-handlebars');
var path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const route = require('./routes/index.js');
const sessionConfig = require('./config/session.js');
const viewEngineConfig = require('./config/viewEngineConfig.js');
const passport = require('passport');

//=====================================================================

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'db')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
sessionConfig(app);

//=====================================================================

// Setup view engine
viewEngineConfig(app);

// Khai báo passport
app.use(passport.initialize());
app.use(passport.session());

// Router
route(app);

//=====================================================================

app.listen(port, () => {
    console.log(`Listening to port: http://localhost:${port}`);
});