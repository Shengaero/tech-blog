const form = document.getElementById('registerForm');

const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');
const inputPasswordConfirm = document.getElementById('inputPasswordConfirm');

const usernameFeedback = document.getElementById('usernameFeedback');
const passwordFeedback = document.getElementById('passwordFeedback');
const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');

function validateUsername() {
    const username = inputUsername.value.trim();
    inputUsername.removeAttribute('pattern');
    if(username.length < 4) {
        usernameFeedback.textContent = 'Username is less than 4 characters long!';
        inputUsername.parentNode.classList.add('was-validated');
    } else if(username.length > 32) {
        usernameFeedback.textContent = 'Username is longer than 4 characters long!';
        inputUsername.parentNode.classList.add('was-validated');
    } else {
        usernameFeedback.textContent = 'Enter your password!';
        inputUsername.classList.remove('is-invalid');
        inputUsername.parentNode.classList.remove('was-validated');
        inputUsername.parentNode.classList.remove('has-validated');
    }
}

function validatePassword() {
    const password = inputPassword.value.trim();
    if(password.length < 8) {
        passwordFeedback.textContent = 'Password is less than 8 characters long!';
        inputPassword.parentNode.classList.add('was-validated');
    } else {
        passwordFeedback.textContent = 'Enter your password!';
        inputPassword.parentNode.classList.remove('was-validated');
    }
    validatePasswordConfirm();
}

function validatePasswordConfirm() {
    const password = inputPassword.value.trim();
    const passwordConfirm = inputPasswordConfirm.value.trim();
    if(password !== passwordConfirm) {
        confirmPasswordFeedback.textContent = 'Password does not match!';
        inputPasswordConfirm.classList.add('is-invalid');
        inputPasswordConfirm.parentNode.classList.add('has-validated');
        inputPasswordConfirm.parentNode.classList.remove('was-validated');
    } else {
        confirmPasswordFeedback.textContent = 'Confirm your password!';
        inputPasswordConfirm.classList.remove('is-invalid');
        inputPasswordConfirm.parentNode.classList.remove('has-validated');
        inputPasswordConfirm.parentNode.classList.add('was-validated');
    }
}

inputUsername.addEventListener('input', event => {
    event.preventDefault();
    validateUsername();
});

inputPassword.addEventListener('input', event => {
    event.preventDefault();
    validatePassword();
});

inputPasswordConfirm.addEventListener('input', event => {
    event.preventDefault();
    validatePasswordConfirm();
});

form.addEventListener('submit', async event => {
    event.preventDefault();
    validateUsername();
    validatePassword();
    validatePasswordConfirm();

    if(!form.checkValidity()) {
        event.stopPropagation();
        return;
    }

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username: inputUsername.value.trim(),
            password: inputPassword.value.trim()
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/');
        return;
    }

    const json = await response.json();
    switch(json.message) {
        case 'username must be unique':
            usernameFeedback.textContent = 'That username is already taken!';
            inputUsername.classList.add('is-invalid');
            inputUsername.parentNode.classList.add('has-validated');
            break;
        default:
            alert('Failed to register!');
    }
});
