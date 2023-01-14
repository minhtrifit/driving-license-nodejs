console.log('Test main script!!!');
const block = document.querySelector('.block');

block.addEventListener('click', (e) => {
    $.ajax({
        url: '/dashboard',
        type: 'GET',
        data: {
            'number': 1
        },
        success: (data) => {
            console.log('Post successfully!');
            console.log(data);       
        }
    })
})