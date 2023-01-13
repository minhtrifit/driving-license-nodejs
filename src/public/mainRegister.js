const registerBtn = document.querySelector('.registerBtn');
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    $.ajax({
        url: '/register',
        type: 'POST',
        data: {
            'username': usernameInput.value,
            'password': passwordInput.value,
        },
        success: (data) => {
            console.log('Post successfully!');
            alert(data);
            // window.location.href = "/";
        }
    })
})