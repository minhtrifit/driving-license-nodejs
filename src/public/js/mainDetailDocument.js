const licenseLevel = document.querySelector('.licenseLevel').textContent;
const selectedBox = document.getElementById('mySelect');
var questionBox = document.querySelector('.question-content');

function loadQuestionContent() {
    const targetUrl = `/document/${licenseLevel}`;

    // Gọi API từ database bằng AJAX
    $.ajax({
        url: targetUrl,
        type: 'POST',
        success: (data) => {
            console.log('Post successfully!');
            // Danh sách các câu hỏi trả về từ server
            const questionList = data;

            // Load câu hỏi theo lựa chon
            selectedBox.addEventListener('change', (e) => {
                var option = selectedBox.options[selectedBox.selectedIndex];
                var selectedQuestion;
                var questionString = '';

                if (option.value == 'default') {
                    questionString = '<p style="font-size: 20px; color: #d13639; font-weight: bold; text-align:center;">Chọn câu hỏi để xem chi tiết</p>';
                    questionBox.innerHTML = questionString;
                }
                else {
                    for (var i = 0; i < questionList.length; ++i) {
                        if (questionList[i].id == option.value) {
                            selectedQuestion = questionList[i];
                        }
                    }

                    // Kiểm tra câu hỏi
                    if (option.value == selectedQuestion.id) {
                        console.log('Check option: ', option);
                        console.log('Check question: ', selectedQuestion);

                        // Loại câu hỏi dạng văn bản
                        if (selectedQuestion.type == 'TEXT') {

                            questionString +=
                                `<div class="title">
                            <p style="font-weight: bold; font-size: 18px;">Câu hỏi số ${selectedQuestion.id}: ${selectedQuestion.quiz}</p>
                            </div>
                            <div class="choose">`;

                            for (var i = 0; i < selectedQuestion.choose.length; ++i) {
                                // Nếu là đáp án đúng
                                if (selectedQuestion.ans == selectedQuestion.choose[i]) {
                                    questionString += `<p class="ans">${i + 1}. ${selectedQuestion.choose[i]}<\p>`;
                                }
                                else { questionString += `<p>${i + 1}. ${selectedQuestion.choose[i]}<\p>`; }
                            }

                            questionString += '</div>';

                            questionBox.innerHTML = questionString;
                        }
                        else if(selectedQuestion.type == 'IMAGE') {
                            questionString +=
                                `<div class="title">
                            <p style="font-weight: bold; font-size: 18px;">Câu hỏi số ${selectedQuestion.id}: ${selectedQuestion.quiz}</p>
                            <img src="../image/document/${selectedQuestion.level}/${selectedQuestion.id}.png" alt="">
                            </div>
                            <div class="choose">`;

                            for (var i = 0; i < selectedQuestion.choose.length; ++i) {
                                // Nếu là đáp án đúng
                                if (selectedQuestion.ans == selectedQuestion.choose[i]) {
                                    questionString += `<p class="ans">${i + 1}. ${selectedQuestion.choose[i]}<\p>`;
                                }
                                else { questionString += `<p>${i + 1}. ${selectedQuestion.choose[i]}<\p>`; }
                            }

                            questionString += '</div>';

                            questionBox.innerHTML = questionString;
                        }

                    }

                }
            })
        }
    })
}

loadQuestionContent();