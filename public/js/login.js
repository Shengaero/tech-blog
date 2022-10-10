const loginFormHandler = async (event) => {
    event.preventDefault();
    const inputUsername = document.querySelector('#inputUsername');
    const inputPassword = document.querySelector('#inputPassword');

    const username = inputUsername.value.trim();
    const password = inputPassword.value.trim();

    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
};

document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);
