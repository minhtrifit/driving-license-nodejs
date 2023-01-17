const licenseLevel = document.querySelector('.licenseLevel').textContent;
const licenseName = document.querySelector('.licenseName').id;
const userID = document.querySelector('.userId').id;
const examDate = document.querySelector('.date').id;
const confirmBtn = document.querySelector('.confirmBtn');
const examContent = document.querySelector('.box');
const rightContent = document.querySelector('.right-content .middle');

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetUrl = `/exam/${licenseLevel}`;

    examContent.innerHTML = '';
    examContent.style.width = '80%';
    examContent.style.height = '50%';

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

            // Nộp bài
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

                // Gửi danh sách câu trả lời lên server
                $.ajax({
                    url: submitURL,
                    type: 'POST',
                    data: {
                        'ansList': submitList,
                    },
                    success: (data) => {
                        console.log('Post successfully!');
                        console.log('Exam result:', data);

                        // window.location.href = submitURL;
                    }
                })
            })

        }
    })
})