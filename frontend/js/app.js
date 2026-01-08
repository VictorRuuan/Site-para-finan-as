// 🔐 PROTEÇÃO DO DASHBOARD
if (window.location.pathname.includes('dashboard')) {
    if (localStorage.getItem('logado') !== 'true') {
        window.location.href = 'index.html';
    }
}

// LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            localStorage.setItem('logado', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Preencha todos os campos');
        }
    });
}

// LOGOUT
function logout() {
    localStorage.removeItem('logado');
    window.location.href = 'index.html';
}

// TRANSACOES
const form = document.getElementById('transacaoForm');
const lista = document.getElementById('listaTransacoes');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;
        const tipo = document.getElementById('tipo').value;

        const li = document.createElement('li');
        li.textContent = `${descricao} - R$ ${valor} (${tipo})`;

        lista.appendChild(li);
        form.reset();
    });
}
