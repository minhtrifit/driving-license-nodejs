const db = require('../models/db.model.js');
const bodyParser = require("body-parser");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const e = require('express');
require('dotenv').config();

class HistoryController {
    async showHistoryPage(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userRecord = req.session.passport.user;
                const historyList = await db.getAllResult();
                var targetHistoryList = [];

                // console.log(historyList);

                // Lấy danh sách theo ID user
                historyList.map((value) => {
                    if(value.userID == userRecord.id) {
                        targetHistoryList.push(value);
                    }
                })

                res.render('viewHistory', {
                    layout: 'mainHistory',
                    user: userRecord,
                    historyList: targetHistoryList,
                })

            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HistoryController();