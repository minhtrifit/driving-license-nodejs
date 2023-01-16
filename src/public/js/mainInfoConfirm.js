const licenseLevel = document.querySelector('.licenseLevel').textContent;
const licenseName = document.querySelector('.licenseName').id;
const userID = document.querySelector('.userId').id;
const examDate = document.querySelector('.date').id;
const confirmBtn = document.querySelector('.confirmBtn');
const examContent = document.querySelector('.box');

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetUrl = `/exam/${licenseLevel}`;

    examContent.innerHTML = '';
    examContent.style.width = '80%';

    $.ajax({
        url: targetUrl,
        type: 'POST',
        data: {
            'userID': userID,
            'examDate': examDate
        },
        success: (data) => {
            console.log('Post successfully!');
            console.log(data);

            examContent.innerHTML = `
                <h3 style="text-align: center; font-weight: bold; margin-top: 20px; text-transform: uppercase;">BÀI THI ${licenseName} </h3>
                <div class="swiper mySwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <h1>Question 1:</h1>
                            <input type="radio" class="ques" name="1" value="Male" />Male
                            <input type="radio" class="ques" name="1" value="Female" />Female
                        </div>
                        <div class="swiper-slide">Slide 2</div>
                        <div class="swiper-slide">Slide 3</div>
                        <div class="swiper-slide">Slide 4</div>
                        <div class="swiper-slide">Slide 5</div>
                        <div class="swiper-slide">Slide 6</div>
                        <div class="swiper-slide">Slide 7</div>
                        <div class="swiper-slide">Slide 8</div>
                        <div class="swiper-slide">Slide 9</div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="submitBtn"><a href="#">Nộp bài</a></div>`;

            var swiper = new Swiper(".mySwiper", {
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                },
            });

            const submitBtn = document.querySelector('.submitBtn');
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                var testList = document.querySelectorAll('.ques');

                for (var i = 0; i < testList.length; ++i) {
                    if (testList[i].checked) {
                        console.log(testList[i]);
                    }
                }
            })

        }
    })
})