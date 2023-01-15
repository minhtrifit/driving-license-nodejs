var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const DocumentController = require('../controllers/document.controller.js');
const initPassportLocal = require('../config/passportLocal.js');
const jwtConfig = require('../config/verifyToken.js');
const uploadImage = require('../config/multer.js');

// Khởi tạo passport local
initPassportLocal();

router.get('/', DocumentController.showDocumentPage);
router.get('/:level', DocumentController.showDetailDocument);


module.exports = router;