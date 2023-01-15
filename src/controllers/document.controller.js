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
                const targetLevel = req.params.level;

                if(targetLevel == 'A1') {
                    res.send('ok');
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
}

module.exports = new DocumentController();