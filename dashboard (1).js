// =============================================
// BASHABARI - Dashboard JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.isLoggedIn()) { window.location.href = 'login.html'; return; }
  const user = Auth.getUser();

  // ── Saved Page ───────────────────────────────
  const savedGrid = document.getElementById('savedGrid');
  if (savedGrid) {
    const savedIds = SavedStore.getAll();
    const savedListings = ListingsStore.getAll().filter(l => savedIds.includes(l.id));

    document.getElementById('savedCount').textContent = savedListings.length;

    if (savedListings.length === 0) {
      savedGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">💔</div>
          <h3>No saved homes yet</h3>
          <p>Browse listings and tap the heart icon to save properties you like</p>
          <a href="listings.html" class="btn-primary">Browse Listings</a>
        </div>
      `;
    } else {
      savedGrid.innerHTML = savedListings.map(l => renderListingCard(l)).join('');
    }
  }

  // ── Dashboard Page ───────────────────────────
  const dashName = document.getElementById('dashUserName');
  if (dashName) {
    dashName.textContent = user.name;
    document.getElementById('dashUserEmail').textContent = user.email;
    document.getElementById('dashJoinDate').textContent = `Member since ${fmt.date(user.joinDate || new Date())}`;
    document.getElementById('dashAvatar').textContent = user.name.charAt(0);

    const savedIds = SavedStore.getAll();
    document.getElementById('statSaved').textContent = savedIds.length;

    const all = ListingsStore.getAll();
    document.getElementById('statTotal').textContent = all.length;
    document.getElementById('statVerified').textContent = all.filter(l => l.verified).length;

    // Recent saves
    const recGrid = document.getElementById('recentSaved');
    if (recGrid) {
      const recSaved = all.filter(l => savedIds.includes(l.id)).slice(0, 3);
      if (recSaved.length === 0) {
        recGrid.innerHTML = `<p class="no-items">You haven't saved any listings yet. <a href="listings.html">Browse now</a></p>`;
      } else {
        recGrid.innerHTML = recSaved.map(l => renderListingCard(l)).join('');
      }
    }

    // Featured listings
    const featGrid = document.getElementById('featuredGrid');
    if (featGrid) {
      const featured = all.filter(l => l.featured).slice(0, 3);
      featGrid.innerHTML = featured.map(l => renderListingCard(l)).join('');
    }
  }
});
