const db = require('../models/db.model.js');
const bodyParser = require("body-parser");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

class HomeController {
    showLogin(req, res, next) {
        try {
            res.render('viewLogin', {
                layout: 'mainLogin',
            })

        } catch (error) {
            next(error);
        }
    }

    showConfirmLogin(req, res, next) {
        passport.authenticate('local', { session: true }, (err, user) => {     
            if (err || !user) {
                return res.send("Wrong username or password");
            }
            else {
                req.logIn(user, (err) => {
                    if (err) {
                        next(err);
                    } 
                    else {
                        console.log('Check user:', user);
                        res.redirect('/dashboard');
                    }
                });
            }
        })(req, res, next)
    }

    showRegister(req, res, next) {
        try {
            res.render('viewRegister', {
                layout: 'mainRegister',
            })

        } catch (error) {
            next(error);
        }
    }

    async showConfirmRegister(req, res, next) {
        try {
            var checkUser = true;
            const user = {
                username: req.body.username,
                password: req.body.password
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            user.repassword = hashedPassword;
            // console.log(user);

            const list = await db.getAllUsers();

            for (var i = 0; i < list.length; ++i) {
                if (list[i].username == user.username) {
                    console.log('Username has already exist!!!');
                    checkUser = false;
                    res.send('Username has already exist');
                }
            }

            if (checkUser == true) {
                await db.createNewUser(user);
                res.send('Successfully');
                // res.redirect('/');
            }

        } catch (error) {
            next(error);
        }
    }

    postLogout(req, res, next) {
        // Xóa session passport
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }

    async showDashboard(req, res, next) {
        try {
            // Nếu chưa đăng nhập
            if (!req.isAuthenticated()) {    
                res.redirect('/'); // Nếu muốn trở về trang đăng nhập
            }
            else {
                // Nếu đã đăng nhập thành công
                const userRecord = req.session.passport.user;

                res.render('viewDashboard', {
                    layout: 'main',
                    username: userRecord.username
                })
            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HomeController();