const licenseLevel = document.querySelector('.licenseLevel').textContent;
const userID = document.querySelector('.userId').id;
const examDate = document.querySelector('.date').id;
const confirmBtn = document.querySelector('.confirmBtn');

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetUrl = `/exam/${licenseLevel}`;
    
    $.ajax({
        url: targetUrl,
        type: 'POST',
        data: {
            'userID': userID,
            'examDate': examDate
        },
        success: (data) => {
            console.log('Post successfully!');
        }
    })
})