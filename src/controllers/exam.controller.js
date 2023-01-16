const db = require('../models/db.model.js');
const bodyParser = require("body-parser");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

class ExamController {
    async showInfoConfirm(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userRecord = req.session.passport.user;
                const licenseList = await db.getAllLicenses();
                const targetLevel = req.params.level;
                const myDate = new Date();
                const day = myDate.getDate();
                const month = myDate.getMonth() + 1;
                const year = myDate.getFullYear();
                const examDay = day + '/' + month + '/' + year;
                var targetLicense;

                for(var i = 0; i < licenseList.length; ++i) {
                    if(licenseList[i].level == targetLevel) {
                        targetLicense = licenseList[i];
                    }
                }

                if (targetLevel == 'A1') {
                    res.render('viewInfoConfirm', {
                        layout: 'mainInfoConfirm',
                        user: userRecord,
                        license: targetLicense,
                        date: examDay
                    })
                }
                else {
                    res.render('viewCommingSoon', {
                        layout: 'mainCommingSoon',
                    })
                }
            }

        } catch (error) {
            next(error);
        }
    }

    async showExam(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userRecord = req.session.passport.user;
                const licenseList = await db.getAllLicenses();
                const questionList = await db.getAllQuestion();
                const targetLevel = req.params.level;
                var targetLicense;
                var examContent;
                var targetQuestionList = [];

                for(var i = 0; i < licenseList.length; ++i) {
                    if(licenseList[i].level == targetLevel) {
                        targetLicense = licenseList[i];
                    }
                }

                for(var i = 30; i < questionList.length; ++i) {
                    targetQuestionList.push(questionList[i]);
                }

                if(targetLevel == 'A1') {
                    examContent = {
                        'amount': 20,
                        'questions': targetQuestionList,
                    }
                }

                res.render('viewCommingSoon', {
                    layout: 'mainCommingSoon',
                })
            }

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new ExamController();