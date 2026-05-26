// =============================================
// BASHABARI - Property Detail JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const listing = id ? ListingsStore.getById(id) : null;

  if (!listing) {
    document.getElementById('propertyContent').innerHTML = `
      <div class="page-404" style="min-height:50vh;">
        <div class="err-num">404</div>
        <h2>Listing Not Found</h2>
        <p>This property may have been removed or the link is incorrect.</p>
        <div class="btns" style="justify-content:center;">
          <a href="listings.html" class="btn-primary">Browse Listings</a>
          <a href="index.html" class="btn-secondary">Go Home</a>
        </div>
      </div>
    `;
    return;
  }

  // Increment views
  ListingsStore.update(listing.id, { views: (listing.views || 0) + 1 });

  // Update page title + breadcrumb
  document.title = listing.title + ' — BashabBari';
  document.getElementById('propBreadcrumb').innerHTML =
    `<a href="index.html">Home</a> / <a href="listings.html">Listings</a> / ${listing.title}`;

  renderGallery(listing);
  renderDetails(listing);
  renderContactCard(listing);
  renderSimilar(listing);
});

function renderGallery(l) {
  const mainImg = document.getElementById('galleryMain');
  const thumbsWrap = document.getElementById('galleryThumbs');
  const countEl = document.getElementById('galleryCount');

  if (!mainImg) return;
  mainImg.src = l.images[0];
  mainImg.alt = l.title;

  if (countEl) countEl.textContent = `1 / ${l.images.length}`;

  if (thumbsWrap && l.images.length > 1) {
    thumbsWrap.innerHTML = l.images.map((src, i) => `
      <img src="${src}" alt="${l.title} ${i + 1}" class="${i === 0 ? 'active' : ''}"
        onerror="this.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=60'"
        onclick="switchGallery(${i}, '${src}')" />
    `).join('');
  } else if (thumbsWrap) {
    thumbsWrap.style.display = 'none';
  }
}

function switchGallery(idx, src) {
  const mainImg = document.getElementById('galleryMain');
  const countEl = document.getElementById('galleryCount');
  const thumbs = document.querySelectorAll('#galleryThumbs img');
  if (mainImg) { mainImg.src = src; }
  thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
  const total = thumbs.length || 1;
  if (countEl) countEl.textContent = `${idx + 1} / ${total}`;
}

function renderDetails(l) {
  const typeColors = { Apartment: '#3B82F6', House: '#10B981', Studio: '#8B5CF6', Duplex: '#F59E0B', Sublet: '#EF4444' };
  const color = typeColors[l.type] || '#6B7280';

  const el = document.getElementById('propDetails');
  if (!el) return;

  el.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
      <span class="badge-type" style="background:${color}">${l.type}</span>
      ${l.verified ? '<span class="badge-verified"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>' : ''}
      ${l.featured ? '<span class="badge-featured">⭐ Featured</span>' : ''}
      <span style="font-size:.8rem;color:var(--text-muted);margin-left:auto;">${fmt.relativeDate(l.postedDate)} · ${l.views} views</span>
    </div>

    <h1 style="font-size:1.6rem;font-weight:800;line-height:1.3;">${l.title}</h1>

    <div style="display:flex;align-items:center;gap:6px;margin-top:10px;color:var(--text-muted);font-size:.9rem;">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      ${l.area}
    </div>

    <div class="prop-stats">
      <div class="prop-stat">
        <div class="prop-stat-value">${l.rooms}</div>
        <div class="prop-stat-label">Bedrooms</div>
      </div>
      <div class="prop-stat">
        <div class="prop-stat-value">${l.bathrooms}</div>
        <div class="prop-stat-label">Bathrooms</div>
      </div>
      <div class="prop-stat">
        <div class="prop-stat-value">${l.size}</div>
        <div class="prop-stat-label">sq ft</div>
      </div>
      <div class="prop-stat">
        <div class="prop-stat-value">${fmt.currency(l.deposit)}</div>
        <div class="prop-stat-label">Deposit</div>
      </div>
    </div>

    <section style="margin-top:24px;">
      <h2 style="font-size:1rem;font-weight:700;margin-bottom:12px;">About this property</h2>
      <p style="line-height:1.8;color:var(--text-muted);font-size:.92rem;">${l.description}</p>
    </section>

    ${l.amenities && l.amenities.length ? `
    <section style="margin-top:24px;">
      <h2 style="font-size:1rem;font-weight:700;margin-bottom:12px;">Amenities</h2>
      <div class="amenities-wrap">
        ${l.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}
      </div>
    </section>` : ''}
  `;
}

function renderContactCard(l) {
  const card = document.getElementById('contactCard');
  if (!card) return;

  const saved = SavedStore.isSaved(l.id);

  card.innerHTML = `
    <div class="contact-header">
      <div class="contact-avatar">${l.contact.name.charAt(0).toUpperCase()}</div>
      <div>
        <div class="contact-name">${l.contact.name}</div>
        <div class="contact-label">Property Owner</div>
      </div>
    </div>

    <div style="margin-bottom:6px;">
      <div class="contact-price-big">${fmt.currency(l.rent)}<span>/month</span></div>
    </div>
    <div class="contact-deposit">+ ${fmt.currency(l.deposit)} security deposit</div>

    <a href="tel:${l.contact.phone}" class="btn-contact-call">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.33h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      Call ${l.contact.phone}
    </a>

    <a href="https://wa.me/88${l.contact.whatsapp}" target="_blank" rel="noopener" class="btn-contact-whatsapp">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.484 2 12.017c0 1.99.525 3.86 1.447 5.479L2 22l4.672-1.425A9.956 9.956 0 0 0 12 22c5.523 0 10-4.484 10-10.017S17.523 2 11.999 2zm0 18.018a8.006 8.006 0 0 1-4.09-1.12l-.294-.173-3.05.93.896-2.99-.19-.307A7.997 7.997 0 0 1 4 12.017C4 7.585 7.582 4 12 4s8 3.585 8 8.017-3.582 8.001-8 8.001z"/></svg>
      WhatsApp
    </a>

    <button id="savePropBtn" class="btn-save-prop${saved ? ' saved' : ''}" onclick="toggleSaveProperty(${l.id})">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" id="savePropIcon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      ${saved ? 'Saved to favourites' : 'Save to favourites'}
    </button>

    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);">
      <div style="display:flex;gap:6px;font-size:.8rem;color:var(--text-muted);align-items:center;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        Always meet in person before making any payments.
      </div>
    </div>
  `;
}

function toggleSaveProperty(id) {
  if (!Auth.isLoggedIn()) { window.location.href = 'login.html'; return; }
  const isSaved = SavedStore.toggle(id);
  const btn = document.getElementById('savePropBtn');
  const icon = document.getElementById('savePropIcon');
  if (btn) {
    btn.className = 'btn-save-prop' + (isSaved ? ' saved' : '');
    btn.childNodes[btn.childNodes.length - 1].textContent = isSaved ? 'Saved to favourites' : 'Save to favourites';
  }
  if (icon) icon.setAttribute('fill', isSaved ? 'currentColor' : 'none');
  showToast(isSaved ? 'Saved to your list!' : 'Removed from saved');
}

function renderSimilar(l) {
  const grid = document.getElementById('similarGrid');
  if (!grid) return;
  const similar = ListingsStore.getAll()
    .filter(x => x.id !== l.id && (x.location === l.location || x.type === l.type))
    .slice(0, 3);
  if (similar.length === 0) {
    document.getElementById('similarSection').style.display = 'none';
    return;
  }
  grid.innerHTML = similar.map(x => renderListingCard(x)).join('');
}
