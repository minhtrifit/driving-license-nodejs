const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginBtn= document.querySelector('.loginBtn');

function showLoginBtn() {
    usernameInput.addEventListener('input', () => {
        passwordInput.addEventListener('input', () => {
            if(usernameInput.value != '' && passwordInput.value != '') {
                loginBtn.classList.add('loginBtnActive');
            }
            else {
                loginBtn.classList.remove('loginBtnActive');
            }
        })
    })
}

showLoginBtn();

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(usernameInput.value == '' && passwordInput.value == '') {
        alert('Nhập tài khoản và mật khẩu trước khi đăng nhập!');
    }
    else {

    }
})

