var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    try {
        var token = req.cookies.token;
        var checkToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Nếu đã xác thực người dùng thì chuyển sang controller
        if (checkToken) {
            // console.log(checkToken);
            // console.log('Authentication successfully!');
            next();
        }
    }
    catch (err) {
        // Chưa xác thực thì chuyển về trang login
        res.redirect('/login');
    }

}

module.exports = {
    verifyToken
}