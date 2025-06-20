
window.onload = function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.onsubmit = function (e) {
    e.preventDefault();
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    const user = localStorage.getItem("user");
    const pass = localStorage.getItem("pass");
    if (u === user && p === pass) {
      showMessage("Login berhasil!", () => {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
      });
    } else {
      showMessage("Login gagal! Username atau password salah.");
    }
  };

  registerForm.onsubmit = function (e) {
    e.preventDefault();
    const nama = document.getElementById("newName").value;
    const user = document.getElementById("newUsername").value;
    const pass = document.getElementById("newPassword").value;
    localStorage.setItem("nama", nama);
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    showMessage("Registrasi berhasil!", () => {
      showLogin();
    });
  };
};

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

function logout() {
  localStorage.removeItem("loggedIn");
  showMessage("Logout berhasil!", () => {
    window.location.href = "index.html";
  });
}

function showMessage(msg, callback) {
  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
      if (callback) callback();
    }, 300);
  }, 2000);
}
