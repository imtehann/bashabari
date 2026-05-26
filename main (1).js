// =============================================
// BASHABARI - Main Shared JS
// =============================================

// ── Storage Helpers ──────────────────────────
const Storage = {
  get: (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(key)
};

// ── Auth State ───────────────────────────────
const Auth = {
  getUser: () => Storage.get('bb_user'),
  isLoggedIn: () => !!Storage.get('bb_user'),
  logout: () => { Storage.remove('bb_user'); window.location.href = 'index.html'; },
  isAdmin: () => { const u = Storage.get('bb_user'); return u && u.role === 'admin'; }
};

// ── Listings State ───────────────────────────
const ListingsStore = {
  getAll: () => {
    const stored = Storage.get('bb_listings');
    return stored && stored.length ? stored : LISTINGS_DATA;
  },
  save: (listings) => Storage.set('bb_listings', listings),
  getById: (id) => {
    return ListingsStore.getAll().find(l => l.id === parseInt(id));
  },
  add: (listing) => {
    const all = ListingsStore.getAll();
    const newId = Math.max(...all.map(l => l.id)) + 1;
    const newListing = { ...listing, id: newId, views: 0, saves: 0, postedDate: new Date().toISOString().slice(0, 10) };
    all.unshift(newListing);
    ListingsStore.save(all);
    return newListing;
  },
  update: (id, data) => {
    const all = ListingsStore.getAll();
    const idx = all.findIndex(l => l.id === parseInt(id));
    if (idx !== -1) { all[idx] = { ...all[idx], ...data }; ListingsStore.save(all); }
  },
  delete: (id) => {
    const all = ListingsStore.getAll().filter(l => l.id !== parseInt(id));
    ListingsStore.save(all);
  },
  toggleVerified: (id) => {
    const all = ListingsStore.getAll();
    const idx = all.findIndex(l => l.id === parseInt(id));
    if (idx !== -1) { all[idx].verified = !all[idx].verified; ListingsStore.save(all); }
  }
};

// ── Saved Listings ───────────────────────────
const SavedStore = {
  getAll: () => Storage.get('bb_saved') || [],
  isSaved: (id) => SavedStore.getAll().includes(parseInt(id)),
  toggle: (id) => {
    const saved = SavedStore.getAll();
    const intId = parseInt(id);
    const idx = saved.indexOf(intId);
    if (idx === -1) { saved.push(intId); } else { saved.splice(idx, 1); }
    Storage.set('bb_saved', saved);
    return idx === -1; // returns true if now saved
  }
};

// ── Formatters ───────────────────────────────
const fmt = {
  currency: (n) => '৳' + Number(n).toLocaleString('en-BD'),
  date: (d) => new Date(d).toLocaleDateString('en-BD', { year: 'numeric', month: 'short', day: 'numeric' }),
  relativeDate: (d) => {
    const diff = Math.floor((Date.now() - new Date(d)) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    return fmt.date(d);
  }
};

// ── Render Helpers ───────────────────────────
function renderListingCard(listing, compact = false) {
  const saved = SavedStore.isSaved(listing.id);
  const typeColors = { Apartment: '#3B82F6', House: '#10B981', Studio: '#8B5CF6', Duplex: '#F59E0B', Sublet: '#EF4444' };
  const color = typeColors[listing.type] || '#6B7280';
  return `
    <div class="listing-card" data-id="${listing.id}">
      <div class="card-img-wrap">
        <img src="${listing.images[0]}" alt="${listing.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'">
        <button class="save-btn${saved ? ' saved' : ''}" onclick="handleSave(event, ${listing.id})" title="${saved ? 'Unsave' : 'Save'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <div class="card-badges">
          <span class="badge-type" style="background:${color}">${listing.type}</span>
          ${listing.verified ? '<span class="badge-verified"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>' : ''}
          ${listing.featured ? '<span class="badge-featured">⭐ Featured</span>' : ''}
        </div>
      </div>
      <div class="card-body">
        <div class="card-price">${fmt.currency(listing.rent)}<span>/month</span></div>
        <h3 class="card-title"><a href="property.html?id=${listing.id}">${listing.title}</a></h3>
        <div class="card-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${listing.area}
        </div>
        <div class="card-meta">
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> ${listing.rooms} Rooms</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg> ${listing.size} sqft</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${fmt.relativeDate(listing.postedDate)}</span>
        </div>
        <div class="card-actions">
          <a href="property.html?id=${listing.id}" class="btn-view">View Details</a>
          <a href="tel:${listing.contact.phone}" class="btn-call">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.33h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Call
          </a>
        </div>
      </div>
    </div>
  `;
}

function handleSave(e, id) {
  e.preventDefault();
  e.stopPropagation();
  if (!Auth.isLoggedIn()) { window.location.href = 'login.html'; return; }
  const isSaved = SavedStore.toggle(id);
  const btn = e.currentTarget;
  btn.classList.toggle('saved', isSaved);
  btn.querySelector('svg').setAttribute('fill', isSaved ? 'currentColor' : 'none');
  showToast(isSaved ? 'Saved to your list!' : 'Removed from saved');
}

// ── Toast ─────────────────────────────────────
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Navbar ────────────────────────────────────
function renderNavbar() {
  const user = Auth.getUser();
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = (page) => current === page ? 'active' : '';

  const nav = document.getElementById('navbar');
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <span class="logo-icon">🏠</span>
        <span>Basha<strong>Bari</strong></span>
      </a>
      <nav class="nav-links">
        <a href="index.html" class="${isActive('index.html')}">Home</a>
        <a href="listings.html" class="${isActive('listings.html')}">Listings</a>
        ${user ? `<a href="saved.html" class="${isActive('saved.html')}">Saved</a>` : ''}
        ${user ? `<a href="dashboard.html" class="${isActive('dashboard.html')}">Dashboard</a>` : ''}
        ${user && user.role === 'admin' ? `<a href="admin.html" class="${isActive('admin.html')}">Admin</a>` : ''}
      </nav>
      <div class="nav-actions">
        ${user ? `
          <div class="nav-user" id="navUserMenu">
            <div class="nav-avatar" onclick="toggleUserMenu()">${user.name.charAt(0)}</div>
            <div class="user-dropdown" id="userDropdown">
              <div class="dropdown-name">${user.name}</div>
              <div class="dropdown-email">${user.email}</div>
              <hr>
              <a href="dashboard.html">My Dashboard</a>
              <a href="saved.html">Saved Homes</a>
              ${user.role === 'admin' ? '<a href="admin.html">Admin Panel</a>' : ''}
              <hr>
              <button onclick="Auth.logout()">Logout</button>
            </div>
          </div>
        ` : `
          <a href="login.html" class="btn-nav-login">Login</a>
          <a href="signup.html" class="btn-nav-signup">List a Property</a>
        `}
      </div>
      <button class="nav-hamburger" id="navHamburger" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <a href="index.html">Home</a>
      <a href="listings.html">Listings</a>
      ${user ? `<a href="saved.html">Saved</a><a href="dashboard.html">Dashboard</a>` : ''}
      ${user && user.role === 'admin' ? `<a href="admin.html">Admin</a>` : ''}
      ${user ? `<button onclick="Auth.logout()" class="mobile-logout">Logout</button>` : `<a href="login.html">Login</a><a href="signup.html" class="mobile-signup">List a Property</a>`}
    </div>
  `;
}

function toggleUserMenu() {
  document.getElementById('userDropdown')?.classList.toggle('open');
}

function toggleMobileNav() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
  document.getElementById('navHamburger')?.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#navUserMenu')) {
    document.getElementById('userDropdown')?.classList.remove('open');
  }
});

// ── Footer ────────────────────────────────────
function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo">
          <span class="logo-icon">🏠</span>
          <span>Basha<strong>Bari</strong></span>
        </a>
        <p>Bangladesh's trusted broker-free rental platform. Find your perfect home without the hassle.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">in</a>
          <a href="#" aria-label="Twitter">t</a>
        </div>
      </div>
      <div class="footer-links">
        <div>
          <h4>Platform</h4>
          <a href="listings.html">Browse Listings</a>
          <a href="signup.html">List a Property</a>
          <a href="saved.html">Saved Homes</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} BashabBari. All rights reserved. Made with ❤️ for Bangladesh.</p>
      <p>No brokers. No hassle. Just homes.</p>
    </div>
  `;
}

// ── Loading Overlay ───────────────────────────
function showLoading() {
  let l = document.getElementById('loadingOverlay');
  if (!l) {
    l = document.createElement('div');
    l.id = 'loadingOverlay';
    l.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(l);
  }
  l.classList.add('active');
}
function hideLoading() {
  document.getElementById('loadingOverlay')?.classList.remove('active');
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
});
