const db = require('../models/db.model.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initPassportLocal() {
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            var checkuser = await db.getUserByUsername(username);
            console.log('Check user:', checkuser);

            var userList = await db.getAllUsers();
            for (var i = 0; i < userList.length; ++i) {
                if (userList[i].username == username) {
                    var userRecord = userList[i];
                }
            }

            // Nếu không tìm thấy username
            if (!userRecord) {
                return done(null, false);
            }
            else {
                // Tìm thấy username => Kiểm tra password
                if (await bcrypt.compare(password, userRecord.password)) {
                    // Nếu đúng password
                    return done(null, userRecord);
                }
                else {
                    // Nếu sai password
                    return done(null, false);
                }
            }

            return done(null, false);

        } catch (error) {
            return done(error);
        }
    }));

    // Xác thực thành công thì lưu thông tin vào trong coockie
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // Passport lấy thông tin xác thực trong coockie
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};

module.exports = initPassportLocal;
