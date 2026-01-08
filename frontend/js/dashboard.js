const API = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');

// 🔐 Proteção
if (!token) {
    window.location.href = 'index.html';
}

// Elementos
const form = document.getElementById('transacaoForm');
const lista = document.getElementById('listaTransacoes');

// 🚀 Carregar transações
function carregarTransacoes() {
    fetch(`${API}/transacoes/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        lista.innerHTML = '';
        data.forEach(t => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${t.descricao}</span>
                <strong>R$ ${t.valor} (${t.tipo})</strong>
            `;
            lista.appendChild(li);
        });
    });
}

// ➕ Criar transação
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const tipo = document.getElementById('tipo').value;

    fetch(`${API}/transacoes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            descricao,
            valor,
            tipo
        })
    })
    .then(res => res.json())
    .then(() => {
        form.reset();
        carregarTransacoes();
    });
});

// Inicializa
carregarTransacoes();
