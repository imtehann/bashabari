// =============================================
// BASHABARI - Listings Page JS
// =============================================

let allListings = [];
let filteredListings = [];
let currentPage = 1;
const PER_PAGE = 9;

document.addEventListener('DOMContentLoaded', () => {
  allListings = ListingsStore.getAll();
  filteredListings = [...allListings];

  populateFilters();
  readURLParams();
  applyFilters();
  setupEventListeners();
});

function populateFilters() {
  // Location filter
  const locSel = document.getElementById('filterLocation');
  if (locSel) {
    LOCATIONS.forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc === 'All Locations' ? '' : loc;
      opt.textContent = loc;
      locSel.appendChild(opt);
    });
  }

  // Type filter
  const typeSel = document.getElementById('filterType');
  if (typeSel) {
    TYPES.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t === 'All Types' ? '' : t;
      opt.textContent = t;
      typeSel.appendChild(opt);
    });
  }

  // Price range
  const priceSel = document.getElementById('filterPrice');
  if (priceSel) {
    PRICE_RANGES.forEach((r, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = r.label;
      priceSel.appendChild(opt);
    });
  }
}

function readURLParams() {
  const params = new URLSearchParams(window.location.search);
  const loc = params.get('location');
  const q = params.get('q');
  const type = params.get('type');

  if (loc) {
    const sel = document.getElementById('filterLocation');
    if (sel) sel.value = loc;
  }
  if (q) {
    const input = document.getElementById('searchInput');
    if (input) input.value = q;
  }
  if (type) {
    const sel = document.getElementById('filterType');
    if (sel) sel.value = type;
  }
}

function getFilters() {
  return {
    q: (document.getElementById('searchInput')?.value || '').toLowerCase().trim(),
    location: document.getElementById('filterLocation')?.value || '',
    type: document.getElementById('filterType')?.value || '',
    priceIdx: parseInt(document.getElementById('filterPrice')?.value || '0'),
    rooms: document.getElementById('filterRooms')?.value || '',
    verified: document.getElementById('filterVerified')?.checked || false,
    sort: document.getElementById('sortSelect')?.value || 'newest'
  };
}

function applyFilters() {
  const f = getFilters();
  const priceRange = PRICE_RANGES[f.priceIdx] || PRICE_RANGES[0];

  filteredListings = allListings.filter(l => {
    if (f.q && !`${l.title} ${l.location} ${l.area} ${l.type} ${l.description}`.toLowerCase().includes(f.q)) return false;
    if (f.location && l.location !== f.location) return false;
    if (f.type && l.type !== f.type) return false;
    if (l.rent < priceRange.min || l.rent > priceRange.max) return false;
    if (f.rooms && parseInt(l.rooms) !== parseInt(f.rooms)) return false;
    if (f.verified && !l.verified) return false;
    return true;
  });

  // Sort
  if (f.sort === 'price-asc') filteredListings.sort((a, b) => a.rent - b.rent);
  else if (f.sort === 'price-desc') filteredListings.sort((a, b) => b.rent - a.rent);
  else if (f.sort === 'newest') filteredListings.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  else if (f.sort === 'popular') filteredListings.sort((a, b) => b.views - a.views);

  currentPage = 1;
  renderListings();
  updateResultCount();
}

function renderListings() {
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;

  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = filteredListings.slice(start, start + PER_PAGE);

  if (filteredListings.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No listings found</h3>
        <p>Try adjusting your filters or search term</p>
        <button class="btn-primary" onclick="clearFilters()">Clear All Filters</button>
      </div>
    `;
    renderPagination();
    return;
  }

  grid.innerHTML = pageItems.map(l => renderListingCard(l)).join('');
  renderPagination();

  // Animate cards
  grid.querySelectorAll('.listing-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
    card.classList.add('fade-in');
  });
}

function renderPagination() {
  const wrap = document.getElementById('pagination');
  if (!wrap) return;
  const totalPages = Math.ceil(filteredListings.length / PER_PAGE);
  if (totalPages <= 1) { wrap.innerHTML = ''; return; }

  let html = `<button onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹ Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      html += `<button onclick="goPage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      html += `<span>…</span>`;
    }
  }
  html += `<button onclick="goPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next ›</button>`;
  wrap.innerHTML = html;
}

function goPage(p) {
  const totalPages = Math.ceil(filteredListings.length / PER_PAGE);
  if (p < 1 || p > totalPages) return;
  currentPage = p;
  renderListings();
  document.getElementById('listingsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateResultCount() {
  const el = document.getElementById('resultCount');
  if (el) el.textContent = `${filteredListings.length} listings found`;
}

function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('filterLocation').value = '';
  document.getElementById('filterType').value = '';
  document.getElementById('filterPrice').value = '0';
  if (document.getElementById('filterRooms')) document.getElementById('filterRooms').value = '';
  if (document.getElementById('filterVerified')) document.getElementById('filterVerified').checked = false;
  document.getElementById('sortSelect').value = 'newest';
  applyFilters();
}

function setupEventListeners() {
  ['filterLocation', 'filterType', 'filterPrice', 'filterRooms', 'sortSelect'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', applyFilters);
  });
  document.getElementById('filterVerified')?.addEventListener('change', applyFilters);

  let searchTimer;
  document.getElementById('searchInput')?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 300);
  });

  document.getElementById('searchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilters();
  });

  // Toggle filter panel on mobile
  document.getElementById('toggleFilters')?.addEventListener('click', () => {
    document.getElementById('filterPanel')?.classList.toggle('open');
  });
}
