
function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

window.onload = function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') document.body.classList.add('dark');
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const pass = localStorage.getItem('pass');
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === user && p === pass) {
        showMessage('Login berhasil!', () => {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'home.html';
        });
    } else {
        showMessage('Login gagal! Username atau password salah.', () => {});
    }
}

document.getElementById('registerForm').onsubmit = function(e) {
    e.preventDefault();
    const u = document.getElementById('newUsername').value;
    const p = document.getElementById('newPassword').value;
    localStorage.setItem('user', u);
    localStorage.setItem('pass', p);
    showMessage('Registrasi berhasil! Silakan login.', showLogin);
}

function checkLogin() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.setItem('loggedIn', 'false');
    window.location.href = 'index.html';
}

function orderProduct(product) {
    const number = "628123456789";
    const url = `https://wa.me/${number}?text=Saya%20ingin%20memesan%20${encodeURIComponent(product)}`;
    document.getElementById('orderLink').innerHTML = `<a href="${url}" target="_blank">Pesan ${product} via WhatsApp</a>`;
}

function showMessage(message, callback) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.5)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.innerHTML = `
        <div style="background:white; padding:20px; border-radius:10px; text-align:center;">
            <p>${message}</p>
            <button style="margin-top:10px;" onclick="document.body.removeChild(this.parentElement.parentElement); (${callback})();">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
}
