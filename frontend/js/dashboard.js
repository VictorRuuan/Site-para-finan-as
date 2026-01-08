const API = 'http://127.0.0.1:8000/api';

// PROTEÇÃO DE ROTA
const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'index.html';
}

// LOGOUT
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}
