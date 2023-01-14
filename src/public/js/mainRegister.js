const registerBtn = document.querySelector('.registerBtn');
const nameInput = document.querySelector('.name');
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const repasswordInput = document.querySelector('.repassword');
const MAX_VALUE = 9999;
const MIN_VALUE = 1000;

function showRegisterBtn() {
    nameInput.addEventListener('input', () => {
        usernameInput.addEventListener('input', () => {
            passwordInput.addEventListener('input', () => {
                repasswordInput.addEventListener('input', () => {
                    if (nameInput.value != '' && usernameInput.value != '' && passwordInput.value != '' && repasswordInput.value != '') {
                        registerBtn.classList.add('registerBtnActive');
                    }
                    else {
                        registerBtn.classList.remove('registerBtnActive');
                    }
                })
            })
        })
    })

}

function checkInput() {
    var warningString = 'Nhập đẩy đủ: '
    if (nameInput.value == '') { warningString += 'họ tên, '; }
    if (usernameInput.value == '') { warningString += 'tên đăng nhập, '; }
    if (passwordInput.value == '') { warningString += 'mật khẩu, '; }
    if (repasswordInput.value == '') { warningString += 'xác nhận mật khẩu '; }
    warningString += 'trước khi đăng ký!';
    return warningString;
}

function checkFillFull() {
    if (nameInput.value != '' && usernameInput.value != '' && passwordInput.value != '' && repasswordInput.value != '') {
        return true;
    }
    else {
        return false;
    }
}

showRegisterBtn();

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const warning = checkInput();
    const checkFill = checkFillFull();
    if (checkFill != true) {
        alert(warning);
    }
    else {
        if (passwordInput.value != repasswordInput.value) {
            alert('Mật khẩu và xác nhận mật khẩu không khớp!');
        }
        else {
            const randomID = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE;

            $.ajax({
                url: '/register',
                type: 'POST',
                data: {
                    'id': randomID,
                    'name': nameInput.value,
                    'username': usernameInput.value,
                    'password': passwordInput.value,
                    'type': 'USER'
                },
                success: (data) => {
                    console.log('Post successfully!');
                    alert(data);
                    // window.location.href = "/";
                }
            })
        }
    }
})