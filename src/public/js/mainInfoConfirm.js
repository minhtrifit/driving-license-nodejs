const licenseLevel = document.querySelector('.licenseLevel').textContent;
const licenseName = document.querySelector('.licenseName').id;
const userID = document.querySelector('.userId').id;
const examDate = document.querySelector('.date').id;
const confirmBtn = document.querySelector('.confirmBtn');
const examContent = document.querySelector('.box');
const rightContent = document.querySelector('.right-content .middle');
const slidebarContent = document.querySelector('.left-content .middle');

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
var TIME_OUT = false;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

let TIME_LIMIT = 0; // Count down by seconds
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

//===================== Xác nhận thông tin trước khi bắt đầu làm bài
confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetUrl = `/exam/${licenseLevel}`;
    const backupSlidebarContent = slidebarContent.innerHTML;

    // Reset giao diện
    examContent.innerHTML = '';
    examContent.style.width = '80%';
    examContent.style.height = '50%';
    slidebarContent.innerHTML = '';
    slidebarContent.innerHTML = '<div id="countDownClock"></div>';

    // Tính thời gian làm bài cho đồng hồ
    if (licenseLevel == 'A1') {
        TIME_LIMIT = 60 * 15;
    }

    // Tạo đồng hồ đếm giờ làm bài
    document.getElementById("countDownClock").innerHTML = `
        <div class="base-timer">
            <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                    <path
                        id="base-timer-path-remaining"
                        stroke-dasharray="283"
                        class="base-timer__path-remaining ${remainingPathColor}"
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                    ></path>
                </g>
            </svg>
            <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
        </div>`;

    //===================== Hết thời gian làm bài
    function onTimesUp() {
        clearInterval(timerInterval);
        alert('Hết giờ làm bài!');
        const submitBtn = document.querySelector('.submitBtn');
        TIME_OUT = true;
        submitBtn.click();
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
    }

    //===================== Bắt đầu đếm thời gian làm bài
    startTimer();

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

    $.ajax({
        url: targetUrl,
        type: 'POST',
        data: {
            'userID': userID,
            'examDate': examDate
        },
        success: (data) => {
            console.log('Post successfully!');
            const questionAmount = data.amount;
            const questionList = data.questions;
            var contentStr = '';

            // Danh sách câu hỏi trả về từ server
            // console.log(questionAmount, questionList);

            contentStr = `
                <h3 style="text-align: center; font-weight: bold; margin-top: 20px; text-transform: uppercase;">BÀI THI ${licenseName} </h3>
                    <div class="swiper mySwiper">
                        <div class="swiper-wrapper">`;

            for (var i = 0; i < questionAmount; ++i) {
                if (questionList[i].type == 'TEXT') {
                    contentStr += `
                    <div class="swiper-slide">
                        <div class="quiz">
                            <h3 style="font-size: 21px; text-align: left;">Câu hỏi số ${i + 1}: ${questionList[i].quiz}</h3>
                        </div>
                        <div class="ans">`;

                    for (var j = 0; j < questionList[i].choose.length; ++j) {
                        contentStr += `<div class="ansChoose">
                                         <input type="radio" class="ques" name="${questionList[i].id}" value="${questionList[i].choose[j]}" /><p>${questionList[i].choose[j]}</p>
                                        </div>`;
                    }

                    contentStr += `
                        </div>
                    </div>`;
                }
                else if (questionList[i].type == 'IMAGE') {
                    contentStr += `
                    <div class="swiper-slide">
                        <div class="quiz">
                            <h3 style="font-size: 21px; text-align: left;">Câu hỏi số ${i + 1}: ${questionList[i].quiz}</h3>
                            <img src="../image/document/${licenseLevel}/${questionList[i].id}.png" alt="" style="width: 100px; border: 0px;"></img>
                        </div>
                        <div class="ans">`;

                    for (var j = 0; j < questionList[i].choose.length; ++j) {
                        contentStr += `<div class="ansChoose">
                                         <input type="radio" class="ques" name="${questionList[i].id}" value="${questionList[i].choose[j]}" /><p>${questionList[i].choose[j]}</p>
                                        </div>`;
                    }

                    contentStr += `
                        </div>
                    </div>`;
                }
            }

            contentStr += `
                        </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="submitBtn"><a href="#">Nộp bài</a></div>`;

            examContent.innerHTML = contentStr;
            rightContent.innerHTML += '<p style="font-size: 15px; color: red; font-style: italic; margin-top: 30px; margin-left: 20px;">Mẹo: Trượt ngang bằng chuột hoặc nhấp chọn số để xem danh sách câu hỏi</p>';

            var swiper = new Swiper(".mySwiper", {
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                },
            });

            //===================== Xác nhận nộp bài
            const submitBtn = document.querySelector('.submitBtn');
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                var ansList = document.querySelectorAll('.ques');
                var submitList = [];

                for (var i = 0; i < ansList.length; ++i) {
                    if (ansList[i].checked) {
                        var answerData = {
                            id: ansList[i].name,
                            ans: ansList[i].value
                        }
                        submitList.push(answerData);
                    }
                }

                // Danh sách câu trả lời
                console.log('Client list:', submitList);

                var submitURL = `/exam/${licenseLevel}/result`;

                if (submitList.length == 0) { alert('Trả lời ít nhất 1 câu hỏi'); }
                else {
                    if (confirm('Xác nhận nộp bài?') == true && TIME_OUT == false) {
                        console.log(TIME_OUT);
                        // Gửi danh sách câu trả lời lên server
                        $.ajax({
                            url: submitURL,
                            type: 'POST',
                            data: {
                                'level': licenseLevel,
                                'ansList': submitList,
                            },
                            success: (data) => {
                                console.log('Post successfully!');

                                // Kết quả bài thi được gửi về từ server
                                const result = data;
                                console.log('Exam result:', result);

                                // window.location.href = submitURL;
                                // window.location.replace(`submitURL`);

                                var resultLicenseName = licenseName;
                                var resultLicenseLevel = licenseLevel;

                                // Reset giao diện
                                rightContent.innerHTML = '';
                                slidebarContent.innerHTML = backupSlidebarContent;

                                rightContent.innerHTML = `
                                <div class="box">
                                    <h3 style="text-align: center; font-weight: bold; margin-top: 20px; text-transform: uppercase;">KẾT QUẢ BÀI THI</h3>
                                    <img src="../image/avatar.png" alt="">
                                    <div class="main">
                                        <p id="${result.userName}" class="userName">Họ và tên: ${result.userName}</p>
                                        <p id="${result.userID}" class="userId">Số báo danh: ${result.userID}</p>
                                        <p id="${resultLicenseName}" class="licenseName">Nội dung thi: ${resultLicenseName}</p>
                                        <p id="${result.date}" class="date">Ngày thi: ${result.date}</p>
                                        <p id="${result.point}" class="date" hidden>Điểm: ${result.point} (câu)</p>
                                        <p id="${result.note}" class="date">Kết quả: ${result.note}</p>
                                        <div class="resultOption">
                                            <div class="confirmBtn"><a href="/dashboard">Xác nhận</a></div>
                                        </div>
                                    </div>
                                </div>`;
                            }
                        })
                    }
                    else if (TIME_OUT == true) {
                        alert('Bạn bị loại do không nộp bài trong thời gian quy định!');
                        window.location.href = '/dashboard';
                    }
                }
            })

        }
    })
})