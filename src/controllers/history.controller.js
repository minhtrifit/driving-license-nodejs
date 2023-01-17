const db = require('../models/db.model.js');
const bodyParser = require("body-parser");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const e = require('express');
require('dotenv').config();

class HistoryController {
    showHistoryPage(req, res, next) {
        try {
            res.send('History page!');

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HistoryController();