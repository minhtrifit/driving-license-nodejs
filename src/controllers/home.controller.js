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
                return res.send('Sai tài khoản hoặc mật khẩu!');
            }
            else {
                req.logIn(user, (err) => {
                    // Đăng nhập thất bại
                    if (err) {
                        next(err);
                    }
                    // Đăng nhập thành công 
                    else {
                        return res.send('Đăng nhập thành công!');
                        // res.redirect('/dashboard');
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
            const list = await db.getAllAccounts();
            var checkUser = true;

            const user = {
                id: req.body.id,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                type: req.body.type
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;

            // Nếu tài khoản đã tồn tại
            for (var i = 0; i < list.length; ++i) {
                if (list[i].username == user.username) {
                    checkUser = false;
                    res.send('Tên đăng nhập đã tồn tại!');
                }
            }

            // Kiểm tra ID đã tồn tại chưa
            var checkUserID = true;
            while(true) {
                checkUserID = true;
                for (var i = 0; i < list.length; ++i) {
                    // Nếu đã tồn tại thì tạo mới
                    if (list[i].id == user.id) {
                        checkUserID = false;
                        var randomID = Math.floor(Math.random() * (parseInt(process.env.MAX_VALUE) - parseInt(process.env.MIN_VALUE))) + parseInt(process.env.MIN_VALUE);
                    }
                }

                if(checkUserID == true) {
                    break;
                }
            }

            // Nếu tài khoản chưa tồn tại
            if (checkUser == true) {
                await db.createNewUserAccount(user);
                res.send('Đăng ký tài khoản thành công!');
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
                console.log('Dashboard user:', userRecord);

                res.render('viewDashboard', {
                    layout: 'mainDashboard',
                    user: userRecord,
                })
            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HomeController();