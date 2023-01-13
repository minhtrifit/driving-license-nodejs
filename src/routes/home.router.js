var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const homeController = require('../controllers/home.controller.js');
const initPassportLocal = require('../config/passportLocal.js');
const jwtConfig = require('../config/verifyToken.js');
const uploadImage = require('../config/multer.js');

// Khởi tạo passport local
initPassportLocal();

// Route đăng nhập, đăng ký (Route mặc định là trang đăng nhập)
router.get('/', homeController.showLogin);
router.post('/login', homeController.showConfirmLogin);
router.get('/register', homeController.showRegister);
router.post('/register', homeController.showConfirmRegister);
router.post('/logout', homeController.postLogout);

// Route trang chủ, ....
router.get('/dashboard', homeController.showDashboard);


module.exports = router;