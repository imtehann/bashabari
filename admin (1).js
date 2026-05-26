// =============================================
// BASHABARI - Admin JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.isLoggedIn() || !Auth.isAdmin()) {
    window.location.href = Auth.isLoggedIn() ? 'dashboard.html' : 'login.html';
    return;
  }

  renderAdminStats();
  renderAdminListings();
  setupAdminForm();
});

function renderAdminStats() {
  const all = ListingsStore.getAll();
  document.getElementById('adminStatTotal').textContent = all.length;
  document.getElementById('adminStatVerified').textContent = all.filter(l => l.verified).length;
  document.getElementById('adminStatFeatured').textContent = all.filter(l => l.featured).length;
  document.getElementById('adminStatViews').textContent = all.reduce((s, l) => s + l.views, 0);
}

function renderAdminListings(search = '') {
  const all = ListingsStore.getAll();
  const filtered = search ? all.filter(l => l.title.toLowerCase().includes(search) || l.location.toLowerCase().includes(search)) : all;

  const tbody = document.getElementById('adminTable');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-row">No listings found</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(l => `
    <tr>
      <td class="td-img"><img src="${l.images[0]}" alt="${l.title}" onerror="this.src='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=60'"></td>
      <td>
        <div class="td-title">${l.title}</div>
        <div class="td-sub">${l.area}</div>
      </td>
      <td>${l.location}</td>
      <td>${fmt.currency(l.rent)}</td>
      <td>
        <span class="toggle-badge ${l.verified ? 'verified' : ''}" onclick="adminToggleVerified(${l.id}, this)" title="Toggle verified">
          ${l.verified ? '✅ Verified' : '⬜ Unverified'}
        </span>
      </td>
      <td>
        <span class="toggle-badge ${l.featured ? 'featured' : ''}" onclick="adminToggleFeatured(${l.id}, this)" title="Toggle featured">
          ${l.featured ? '⭐ Featured' : '☆ Normal'}
        </span>
      </td>
      <td class="td-actions">
        <a href="property.html?id=${l.id}" class="btn-admin-view" target="_blank">View</a>
        <button class="btn-admin-edit" onclick="openEditModal(${l.id})">Edit</button>
        <button class="btn-admin-del" onclick="adminDelete(${l.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function adminToggleVerified(id, el) {
  ListingsStore.toggleVerified(id);
  const listing = ListingsStore.getById(id);
  el.className = `toggle-badge ${listing.verified ? 'verified' : ''}`;
  el.textContent = listing.verified ? '✅ Verified' : '⬜ Unverified';
  renderAdminStats();
  showToast('Verification status updated');
}

function adminToggleFeatured(id, el) {
  const all = ListingsStore.getAll();
  const l = all.find(x => x.id === parseInt(id));
  if (l) {
    ListingsStore.update(id, { featured: !l.featured });
    const updated = ListingsStore.getById(id);
    el.className = `toggle-badge ${updated.featured ? 'featured' : ''}`;
    el.textContent = updated.featured ? '⭐ Featured' : '☆ Normal';
    renderAdminStats();
    showToast('Featured status updated');
  }
}

function adminDelete(id) {
  if (!confirm('Are you sure you want to delete this listing?')) return;
  ListingsStore.delete(id);
  renderAdminListings();
  renderAdminStats();
  showToast('Listing deleted', 'error');
}

function openEditModal(id) {
  const l = ListingsStore.getById(id);
  if (!l) return;
  document.getElementById('editId').value = l.id;
  document.getElementById('editTitle').value = l.title;
  document.getElementById('editRent').value = l.rent;
  document.getElementById('editLocation').value = l.location;
  document.getElementById('editType').value = l.type;
  document.getElementById('editRooms').value = l.rooms;
  document.getElementById('editDesc').value = l.description;
  document.getElementById('editPhone').value = l.contact.phone;
  document.getElementById('editModal').classList.add('open');
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('open');
}

function setupAdminForm() {
  // Add listing form
  const addForm = document.getElementById('addListingForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(addForm);

      const newListing = {
        title: fd.get('title'),
        location: fd.get('location'),
        area: fd.get('area') || fd.get('location') + ', Dhaka',
        type: fd.get('type'),
        rooms: parseInt(fd.get('rooms')),
        bathrooms: parseInt(fd.get('bathrooms') || 1),
        size: parseInt(fd.get('size') || 0),
        rent: parseInt(fd.get('rent')),
        deposit: parseInt(fd.get('deposit') || fd.get('rent') * 2),
        available: true,
        verified: false,
        featured: false,
        description: fd.get('description'),
        amenities: (fd.get('amenities') || '').split(',').map(a => a.trim()).filter(Boolean),
        images: [fd.get('image') || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
        contact: {
          name: fd.get('contactName'),
          phone: fd.get('contactPhone'),
          whatsapp: fd.get('contactPhone').replace(/[^0-9]/g, '')
        }
      };

      ListingsStore.add(newListing);
      addForm.reset();
      renderAdminListings();
      renderAdminStats();
      showToast('✅ Listing added successfully!');

      // Switch to listings tab
      switchAdminTab('listings');
    });
  }

  // Edit form
  const editForm = document.getElementById('editForm');
  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('editId').value;
      ListingsStore.update(id, {
        title: document.getElementById('editTitle').value,
        rent: parseInt(document.getElementById('editRent').value),
        location: document.getElementById('editLocation').value,
        type: document.getElementById('editType').value,
        rooms: parseInt(document.getElementById('editRooms').value),
        description: document.getElementById('editDesc').value,
        contact: { ...ListingsStore.getById(id).contact, phone: document.getElementById('editPhone').value }
      });
      closeEditModal();
      renderAdminListings();
      showToast('Listing updated!');
    });
  }

  // Search
  let timer;
  document.getElementById('adminSearch')?.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => renderAdminListings(e.target.value.toLowerCase()), 300);
  });
}

function switchAdminTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelector(`.admin-tab[data-tab="${tab}"]`)?.classList.add('active');
  document.getElementById(`section-${tab}`)?.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => switchAdminTab(tab.dataset.tab));
  });
});
