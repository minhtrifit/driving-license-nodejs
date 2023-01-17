var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const examRouter = require('../controllers/exam.controller.js');
const initPassportLocal = require('../config/passportLocal.js');
const jwtConfig = require('../config/verifyToken.js');
const uploadImage = require('../config/multer.js');

// Khởi tạo passport local
initPassportLocal();

// Route đăng nhập, đăng ký (Route mặc định là trang đăng nhập)
router.get('/:level', examRouter.showInfoConfirm);
router.post('/:level', examRouter.showExam);
router.post('/:level/result', examRouter.showExamConfirm);
// router.use('/:level/result', examRouter.showExamResult);


module.exports = router;