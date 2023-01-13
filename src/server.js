const express = require('express');
const handlebars = require('express-handlebars');
var path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const route = require('./routes/index.js');
const sessionConfig = require('./config/session.js');
const passport = require('passport');

//=====================================================================

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'db')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
sessionConfig(app);


//=====================================================================

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//=====================================================================

// Khai báo passport
app.use(passport.initialize());
app.use(passport.session());

// Router
route(app);

//=====================================================================

app.listen(port, () => {
    console.log(`Listening to port: http://localhost:${port}`);
});