// =============================================
// BASHABARI - Auth JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // Redirect if already logged in
  if (Auth.isLoggedIn()) {
    const current = window.location.pathname.split('/').pop();
    if (current === 'login.html' || current === 'signup.html') {
      window.location.href = 'dashboard.html';
    }
  }

  // ── Login Form ──────────────────────────────
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      // Get stored users or fallback to mock
      const users = Storage.get('bb_users') || MOCK_USERS;
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...safeUser } = user;
        Storage.set('bb_user', safeUser);
        showToast('Welcome back, ' + user.name + '!');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
      } else {
        showFieldError('loginEmail', 'Invalid email or password');
        showFieldError('loginPassword', 'Invalid email or password');
      }
    });
  }

  // ── Signup Form ─────────────────────────────
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const phone = document.getElementById('signupPhone').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirm = document.getElementById('signupConfirm').value;

      let valid = true;
      if (!name) { showFieldError('signupName', 'Name is required'); valid = false; }
      if (!email || !email.includes('@')) { showFieldError('signupEmail', 'Valid email required'); valid = false; }
      if (!phone || phone.length < 11) { showFieldError('signupPhone', 'Valid phone required'); valid = false; }
      if (password.length < 6) { showFieldError('signupPassword', 'Password must be 6+ characters'); valid = false; }
      if (password !== confirm) { showFieldError('signupConfirm', 'Passwords do not match'); valid = false; }
      if (!valid) return;

      const users = Storage.get('bb_users') || MOCK_USERS;
      if (users.find(u => u.email === email)) {
        showFieldError('signupEmail', 'Email already registered');
        return;
      }

      const newUser = {
        id: Date.now(),
        name, email, phone, password,
        savedListings: [],
        role: 'user',
        joinDate: new Date().toISOString().slice(0, 10)
      };
      users.push(newUser);
      Storage.set('bb_users', users);

      const { password: _, ...safeUser } = newUser;
      Storage.set('bb_user', safeUser);
      showToast('Account created! Welcome to BashabBari!');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
    });
  }

  // ── Password Toggle ──────────────────────────
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      btn.querySelector('.eye-icon').textContent = type === 'password' ? '👁' : '🙈';
    });
  });
});

function showFieldError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.add('input-error');
  const err = field.parentElement.querySelector('.field-error') || document.createElement('span');
  err.className = 'field-error';
  err.textContent = msg;
  if (!field.parentElement.querySelector('.field-error')) field.parentElement.appendChild(err);
}

function clearErrors() {
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  document.querySelectorAll('.field-error').forEach(el => el.remove());
}
