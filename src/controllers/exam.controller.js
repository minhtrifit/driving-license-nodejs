const db = require('../models/db.model.js');
const bodyParser = require("body-parser");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { text } = require('express');
const e = require('express');
require('dotenv').config();

function getRandomTextQuestion(min, max, list) {
    var questionID;
    do { questionID = Math.floor(Math.random() * (max - min + 1)) + min; }
    while (checkTextQuestion(questionID, list) == false);

    return questionID;
}

function getRandomImageQuestion(min, max, list) {
    var questionID;
    do { questionID = Math.floor(Math.random() * (max - min + 1)) + min; }
    while (checkImageQuestion(questionID, list) == false);

    return questionID;
}

function checkTextQuestion(id, list) {
    for (var i = 0; i < list.length; ++i) {
        if (list[i].type == 'TEXT' && list[i].id == id) { return true; }
    }
    return false;
}

function checkImageQuestion(id, list) {
    for (var i = 0; i < list.length; ++i) {
        if (list[i].type == 'IMAGE' && list[i].id == id) { return true; }
    }
    return false;
}

function checkOnlyExist(list) {
    for (var i = 0; i < list.length; ++i) {
        var flag = list[i];
        for (var j = 0; j < list.length; ++j) { if (i != j && list[j] == flag) { return false; } }
    }
    return true;
}

function mergeTwoRandom(arr1, arr2) {

    function extractRandom(arr) {
        var index = Math.floor(Math.random() * arr.length);
        var result = arr[index];
        // remove item from the array
        arr.splice(index, 1);
        return (result);
    }

    var result = [];
    while (arr1.length || arr2.length) {
        if (arr1.length) {
            result.push(extractRandom(arr1));
        }
        if (arr2.length) {
            result.push(extractRandom(arr2));
        }
    }
    return (result);
}

function getContentQuestion(numberList, sourceList) {
    var resultList = [];
    for (var i = 0; i < numberList.length; ++i) {
        for (var j = 0; j < sourceList.length; ++j) {
            if (sourceList[j].id == numberList[i]) {
                resultList.push(sourceList[j]);
            }
        }
    }
    return resultList;
}

function checkInitResultID(id, list) {
    for (var i = 0; i < list.length; ++i) {
        if (list[i].id == id) {
            return true;
        }
    }
    return false;
}

class ExamController {
    async showInfoConfirm(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userRecord = req.session.passport.user;
                const licenseList = await db.getAllLicenses();
                const targetLevel = req.params.level;
                const myDate = new Date();
                const day = myDate.getDate();
                const month = myDate.getMonth() + 1;
                const year = myDate.getFullYear();
                const examDay = day + '/' + month + '/' + year;
                var targetLicense;

                for (var i = 0; i < licenseList.length; ++i) {
                    if (licenseList[i].level == targetLevel) {
                        targetLicense = licenseList[i];
                    }
                }

                if (targetLevel == 'A1') {
                    res.render('viewInfoConfirm', {
                        layout: 'mainInfoConfirm',
                        user: userRecord,
                        license: targetLicense,
                        date: examDay
                    })
                }
                else {
                    res.render('viewCommingSoon', {
                        layout: 'mainCommingSoon',
                    })
                }
            }

        } catch (error) {
            next(error);
        }
    }

    async showExam(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userRecord = req.session.passport.user;
                const licenseList = await db.getAllLicenses();
                const questionList = await db.getAllQuestion();
                const targetLevel = req.params.level;
                var targetLicense;
                var examContent;
                var targetQuestionList = [];

                // console.log(questionList);

                // L???y n???i dung b???ng l??i
                for (var i = 0; i < licenseList.length; ++i) {
                    if (licenseList[i].level == targetLevel) {
                        targetLicense = licenseList[i];
                    }
                }

                // // L???y danh s??ch c??u h???i
                // for (var i = 36; i < questionList.length; ++i) {
                //     targetQuestionList.push(questionList[i]);
                // }

                // if (targetLevel == 'A1') {
                //     examContent = {
                //         'amount': 25,
                //         'questions': targetQuestionList,
                //     }
                // }

                var count = 0;
                var textList = [];
                var imageList = [];
                var questionIdList = [];

                if (targetLevel == 'A1') {
                    // Random c??u h???i d???ng h??nh
                    do {
                        var randomID = getRandomImageQuestion(1, 200, questionList);
                        console.log('check id:', randomID);
                        if (!imageList.includes(randomID)) {
                            imageList.push(randomID);
                            ++count;
                        }
                    }
                    while (count < 5);
                    count = 0;

                    // Random c??u h???i d???ng ch???
                    do {
                        var randomID = getRandomTextQuestion(1, 200, questionList);
                        if (!textList.includes(randomID)) {
                            textList.push(randomID);
                            ++count;
                        }
                    }
                    while (count < 20);
                    count = 0;

                    questionIdList = mergeTwoRandom(textList, imageList);

                    // console.log('Text size:', textList.length, 'Image size:', imageList.length);
                    console.log('Question list:', questionIdList, 'length:', questionIdList.length, 'Only exist array:', checkOnlyExist(questionIdList));

                    targetQuestionList = getContentQuestion(questionIdList, questionList);

                    examContent = {
                        'amount': 25,
                        'questions': targetQuestionList,
                    }

                }

                // Tr??? danh s??ch d??? li???u v??? cho client
                res.send(examContent);
            }

        } catch (error) {
            next(error);
        }
    }

    async showExamConfirm(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userAnsList = req.body.ansList;
                const licenseLevel = req.body.level;
                const userRecord = req.session.passport.user;
                const dbList = await db.getAllQuestion();
                const resultList = await db.getAllResult();
                const licenseList = await db.getAllLicenses();
                var point = 0;
                var eliminated = false;
                const myDate = new Date();
                const day = myDate.getDate();
                const month = myDate.getMonth() + 1;
                const year = myDate.getFullYear();
                const examDay = day + '/' + month + '/' + year;
                // console.log('Server check:', userAnsList);
                // console.log(userRecord);

                // T??nh ??i???m k???t qu???
                for (var i = 0; i < userAnsList.length; ++i) {
                    for (var j = 0; j < dbList.length; ++j) {
                        // Ki???m tra c??u tra l???i trong database
                        if (parseInt(userAnsList[i].id) == dbList[j].id) {
                            // N???u l?? c??u h???i lo???i tr???c ti???p
                            if (dbList[j].eliminated == 'YES') {
                                if (userAnsList[i].ans == dbList[j].ans) {
                                    // console.log(parseInt(userAnsList[i].id), 'CORRECT');
                                    ++point;
                                }
                                else { eliminated = true; }
                            }
                            else {
                                if (userAnsList[i].ans == dbList[j].ans) {
                                    // console.log(parseInt(userAnsList[i].id), 'CORRECT');
                                    ++point;
                                }
                                // else { console.log(parseInt(userAnsList[i].id), 'WRONG'); }
                            }
                        }
                    }

                }

                // X??t k???t qu???
                var note = '';
                if (licenseLevel == 'A1') {
                    if (point < 21 && eliminated == false) { note = `Thi tr?????t, kh??ng ????? s??? c??u quy ?????nh (${point}/25 c??u)`; }
                    if (eliminated == true) { note = `Thi tr?????t, sai c??u h???i lo???i tr???c ti???p`; }
                    if (point >= 21 && eliminated == false) { note = 'Thi ?????t'; }
                }

                // K???t qu???
                var resultForm = {
                    'userID': userRecord.id,
                    'userName': userRecord.name,
                    'eliminated': eliminated,
                    'date': examDay,
                    'point': point,
                    'note': note
                }

                console.log(resultForm);

                // T???o object ????? l??u v??o database
                var maxResultId = 9999;
                var minResultId = 1000;
                var randromResultId;

                // T???o id ng???u nhi??n cho result
                do {
                    randromResultId = Math.floor(Math.random() * (maxResultId - minResultId + 1)) + minResultId;
                }
                while (checkInitResultID(randromResultId, resultList) == true);

                // L???y t??n lo???i b???ng l??i
                var licenseName = '';
                for (var i = 0; i < licenseList.length; ++i) {
                    if (licenseList[i].level == licenseLevel) { licenseName = licenseList[i].name; }
                }

                // L???y ng??y l??u v??o database
                var dateDB = year + '-' + month + '-' + day;

                // K???t qu??? b??i thi
                var noteDB = '';
                if (note == 'Thi ?????t') { noteDB = '?????t'; }
                else { noteDB = 'Kh??ng ?????t'; }

                var resultFormDB = {
                    'id': randromResultId,
                    'userID': userRecord.id,
                    'userName': userRecord.name,
                    'level': licenseLevel,
                    'licenseName': licenseName,
                    'date': dateDB,
                    'result': noteDB
                }

                console.log(resultFormDB);
                // L??u k???t qu??? b??i l??m v??o database
                await db.createNewResult(resultFormDB);

                // Tr??? k???t qu??? v??? cho client
                res.send(resultForm);
            }

        } catch (error) {
            next(error);
        }
    }

    async showExamResult(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                console.log('Check req:', req.query);

                res.render('viewResult', {
                    layout: 'mainResult',
                })
            }

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new ExamController();