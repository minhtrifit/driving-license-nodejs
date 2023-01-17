const db = require('../models/db.model.js');
const bodyParser = require("body-parser");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { text } = require('express');
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
    for(var i = 0; i < numberList.length; ++i) {
        for(var j = 0; j < sourceList.length; ++j) {
            if(sourceList[j].id == numberList[i]) {
                resultList.push(sourceList[j]);
            }
        }
    }
    return resultList;
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

                // Lấy nội dung bằng lái
                for (var i = 0; i < licenseList.length; ++i) {
                    if (licenseList[i].level == targetLevel) {
                        targetLicense = licenseList[i];
                    }
                }

                // // Lấy danh sách câu hỏi
                // for (var i = 30; i < questionList.length; ++i) {
                //     targetQuestionList.push(questionList[i]);
                // }

                // if (targetLevel == 'A1') {
                //     examContent = {
                //         'amount': 20,
                //         'questions': targetQuestionList,
                //     }
                // }

                var count = 0;
                var textList = [];
                var imageList = [];
                var questionIdList = [];

                if (targetLevel == 'A1') {
                    // Random câu hỏi dạng hình
                    do {
                        var randomID = getRandomImageQuestion(1, 50, questionList);
                        if (!imageList.includes(randomID)) {
                            imageList.push(randomID);
                            ++count;
                        }
                    }
                    while (count < 5);
                    count = 0;

                    // Random câu hỏi dạng hình
                    do {
                        var randomID = getRandomTextQuestion(1, 50, questionList);
                        if (!textList.includes(randomID)) {
                            textList.push(randomID);
                            ++count;
                        }
                    }
                    while (count < 15);
                    count = 0;
                    
                    questionIdList = mergeTwoRandom(textList, imageList);

                    console.log('Text size:', textList.length, 'Image size:', imageList.length); 
                    console.log('Question list:', questionIdList, 'length:', questionIdList.length, 'Only exist array:', checkOnlyExist(questionIdList));

                    targetQuestionList = getContentQuestion(questionIdList, questionList);

                }              

                examContent = {
                    'amount': 20,
                    'questions': targetQuestionList,
                }

                // Trả danh sách dữ liệu về cho client
                res.send(examContent);
            }

        } catch (error) {
            next(error);
        }
    }

    async showExamConfirm(req, res, next) {
        try {
            if(!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                const userAnsList = req.body.ansList;
                console.log('Server check:', userAnsList);
                res.send('successfully');
            }
            
        } catch (error) {
            next(error);
        }
    }

    async showExamResult(req, res, next) {
        try {
            if(!req.isAuthenticated()) {
                res.redirect('/');
            }
            else {
                console.log('Check req:', req.body);

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