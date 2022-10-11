const form = document.getElementById('loginForm');

const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');

const incorrectUserPass = document.getElementById('incorrectUserPass');

form.addEventListener('submit', async event => {
    event.preventDefault();

    const response = await fetch('/api/users/login', {
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
    if(json.message) {
        incorrectUserPass.textContent = 'Incorrect username or password!';
        incorrectUserPass.classList.remove('invisible');
    } else {
        alert('Failed to register!');
    }
});
