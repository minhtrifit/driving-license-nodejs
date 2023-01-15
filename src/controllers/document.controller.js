const db = require('../models/db.model.js');
const bodyParser = require("body-parser");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const e = require('express');
require('dotenv').config();

class DocumentController {
    async showDocumentPage(req, res, next) {
        try {
            if(!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userRecord = req.session.passport.user;
                const licenseList = await db.getAllLicenses();
                // console.log(licenseList);

                res.render('viewDocument', {
                    layout: 'mainDocument',
                    user: userRecord,
                    license: licenseList,
                })
            }
            
        } catch (error) {
            next(error);
        }
    }

    async showDetailDocument(req, res, next) {
        try {
            if(!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userRecord = req.session.passport.user;
                const licenseList = await db.getAllLicenses();
                const questionList = await db.getAllQuestion();
                const targetLevel = req.params.level;
                var targetLicense;

                for(var i = 0; i < licenseList.length; ++i) {
                    if(licenseList[i].level == targetLevel) {
                        targetLicense = licenseList[i];
                    }
                }

                if(targetLevel == 'A1') {
                    res.render('viewDetailDocument', {
                        layout: 'mainDetailDocument',
                        user: userRecord,
                        license: targetLicense,
                        list: questionList,
                    })
                }
                else {
                    res.render('viewCommingSoon', {
                        layout: 'mainCommingSoon',
                        user: userRecord,
                    })
                }
            }
            
        } catch (error) {
            next(error);
        }
    }

    async showConfirmDetailDocument(req, res, next) {
        try {
            if(!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userRecord = req.session.passport.user;
                const licenseList = await db.getAllLicenses();
                const questionList = await db.getAllQuestion();
                const targetLevel = req.params.level;
                var targetLicense;
                var targetQuestionList = [];

                // Lọc bằng lái
                for(var i = 0; i < licenseList.length; ++i) {
                    if(licenseList[i].level == targetLevel) {
                        targetLicense = licenseList[i];
                    }
                }

                // Lọc các câu hỏi
                for(var i = 0; i < questionList.length; ++i) {
                    if(questionList[i].level == targetLicense.level) {
                        targetQuestionList.push(questionList[i]);
                    }
                }


                res.send(targetQuestionList);
            }
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DocumentController();