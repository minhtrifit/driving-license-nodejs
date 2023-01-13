var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const DetailController = require('../controllers/detail.controller.js');
const initPassportLocal = require('../config/passportLocal.js');
const jwtConfig = require('../config/verifyToken.js');
const uploadImage = require('../config/multer.js');

// Khởi tạo passport local
initPassportLocal();

router.get('/', DetailController.showDetailPage);
router.get('/user1', DetailController.showDetailUser);


module.exports = router;