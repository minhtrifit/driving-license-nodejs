const db = require('../models/db.model.js');
const bodyParser = require("body-parser");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const e = require('express');
require('dotenv').config();

class DetailController {
    showDetailPage(req, res, next) {
        try {
            res.send('Detail page!');

        } catch (error) {
            next(error);
        }
    }

    showDetailUser(req, res, next) {
        try {
            if(!req.isAuthenticated()) {
                res.send('Please login to view this page!');
            }
            else {
                res.send('User1 detail page!');
            }
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DetailController();