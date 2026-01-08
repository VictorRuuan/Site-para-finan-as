const API = 'http://127.0.0.1:8000/api';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');

    fetch(`${API}/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.access) {
            localStorage.setItem('token', data.access);
            window.location.href = 'dashboard.html';
        } else {
            error.innerText = 'Login inválido';
        }
    })
    .catch(() => {
        error.innerText = 'Erro ao conectar com o servidor';
    });
}
