/* ============================================
   BASHABARI — Core JavaScript
   Data, Rendering, Storage, Interactions
   ============================================ */

// ============ SAMPLE DATA ============
const listings = [
  {
    id: 1,
    title: "Spacious 3-Bedroom Family Flat",
    location: "Mirpur, Section 6",
    rent: 14000,
    type: "Family",
    beds: "3",
    baths: "2",
    description: "Bright, airy flat on 3rd floor with gas, water & lift. 5 min walk to Mirpur 10 Metro. Ideal for small families.",
    contact: "Mr. Hossain",
    phone: "+880 1712-334455",
    emoji: "🏠",
    verified: true,
    userAdded: false
  },
  {
    id: 2,
    title: "Modern Bachelor Room with Attached Bath",
    location: "Uttara, Sector 7",
    rent: 7500,
    type: "Bachelor",
    beds: "1",
    baths: "1",
    description: "Furnished room in a quiet locality. WiFi ready, air cooler included. 2 min to main road. No couples.",
    contact: "Mr. Rafiq",
    phone: "+880 1811-223344",
    emoji: "🛋",
    verified: true,
    userAdded: false
  },
  {
    id: 3,
    title: "Elegant 2-Bedroom Flat Near Lake",
    location: "Dhanmondi, Road 27",
    rent: 28000,
    type: "Family",
    beds: "2",
    baths: "2",
    description: "Premium flat with lake view. Tiles flooring, modular kitchen, 24hr security. Close to Square Hospital.",
    contact: "Ms. Nadia",
    phone: "+880 1916-556677",
    emoji: "🏡",
    verified: true,
    userAdded: false
  },
  {
    id: 4,
    title: "Affordable Sublet in Shared Flat",
    location: "Mohammadpur, Tajmahal Road",
    rent: 5000,
    type: "Sublet",
    beds: "1",
    baths: "1",
    description: "One furnished room in a 3-room flat shared with 2 others. Gas, WiFi, kitchen access. Female preferred.",
    contact: "Sumaiya",
    phone: "+880 1923-112233",
    emoji: "🏘",
    verified: false,
    userAdded: false
  },
  {
    id: 5,
    title: "Premium 4-Bedroom Apartment",
    location: "Gulshan 2, Circle",
    rent: 55000,
    type: "Family",
    beds: "4",
    baths: "3",
    description: "Luxury flat with 24hr security, car parking, rooftop access, centralized AC. Close to diplomatic zone.",
    contact: "Mr. Islam",
    phone: "+880 1755-998877",
    emoji: "🏢",
    verified: true,
    userAdded: false
  },
  {
    id: 6,
    title: "Cozy Bachelor Mess with Meals",
    location: "Banani, DOHS",
    rent: 9000,
    type: "Bachelor",
    beds: "1",
    baths: "1",
    description: "Private room in organized bachelor mess. 3 meals per day included. Laundry, WiFi, generator backup.",
    contact: "Mr. Alam",
    phone: "+880 1621-445566",
    emoji: "🛋",
    verified: true,
    userAdded: false
  },
  {
    id: 7,
    title: "New 3-Bedroom Flat in Bashundhara",
    location: "Bashundhara, Block B",
    rent: 18000,
    type: "Family",
    beds: "3",
    baths: "2",
    description: "Brand new building, never lived in. Large balcony, gas connection, parking included. Gated community.",
    contact: "Mr. Karim",
    phone: "+880 1789-334466",
    emoji: "🏠",
    verified: true,
    userAdded: false
  },
  {
    id: 8,
    title: "Commercial Office Space",
    location: "Rampura, DIT Road",
    rent: 22000,
    type: "Office",
    beds: "—",
    baths: "1",
    description: "1200 sqft commercial space, ground floor. Glass facade, 3-phase electricity, ideal for showroom or office.",
    contact: "Mr. Farhan",
    phone: "+880 1699-778899",
    emoji: "🏢",
    verified: false,
    userAdded: false
  },
  {
    id: 9,
    title: "Budget Bachelor Room Near University",
    location: "Mirpur, Section 10",
    rent: 5500,
    type: "Bachelor",
    beds: "1",
    baths: "1",
    description: "Small but cozy room, close to Dhaka Commerce College and buses. Common rooftop, no load-shedding area.",
    contact: "Mr. Shuvo",
    phone: "+880 1834-223355",
    emoji: "🛋",
    verified: false,
    userAdded: false
  },
  {
    id: 10,
    title: "Semi-Furnished 2-Bedroom Flat",
    location: "Uttara, Sector 11",
    rent: 13500,
    type: "Family",
    beds: "2",
    baths: "2",
    description: "Spacious flat with built-in wardrobes and dining table. Near Uttara Model School and BRT station.",
    contact: "Ms. Parveen",
    phone: "+880 1900-667788",
    emoji: "🏡",
    verified: true,
    userAdded: false
  },
  {
    id: 11,
    title: "Sublet Room in Quiet Apartment",
    location: "Dhanmondi, Road 4",
    rent: 7000,
    type: "Sublet",
    beds: "1",
    baths: "1",
    description: "Furnished sublet in a family flat. Homely environment. Share kitchen and living room. Couple or student welcome.",
    contact: "Mrs. Begum",
    phone: "+880 1768-445522",
    emoji: "🏘",
    verified: true,
    userAdded: false
  },
  {
    id: 12,
    title: "Luxury Penthouse with Rooftop",
    location: "Banani, Road 11",
    rent: 75000,
    type: "Family",
    beds: "5+",
    baths: "3",
    description: "Duplex penthouse with 360° Dhaka view from rooftop terrace. Fully furnished, smart home system, 3 car garage.",
    contact: "Mr. Chowdhury",
    phone: "+880 1711-000111",
    emoji: "🏢",
    verified: true,
    userAdded: false
  }
];

// ============ LOCAL STORAGE ============
const USER_KEY = 'bashabari_user_listings';

function getUserListings() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || [];
  } catch { return []; }
}

function addUserListing(listing) {
  const all = getUserListings();
  all.push(listing);
  localStorage.setItem(USER_KEY, JSON.stringify(all));
}

function removeUserListing(id) {
  const all = getUserListings().filter(l => l.id !== id);
  localStorage.setItem(USER_KEY, JSON.stringify(all));
}

function getAllListings() {
  return [...listings, ...getUserListings()];
}

// ============ CARD RENDERER ============
function renderCard(listing, listView = false) {
  const price = listing.rent.toLocaleString('en-BD');
  const bedInfo = listing.beds && listing.beds !== '—'
    ? `<span>🛏 ${listing.beds} Bed${listing.beds > 1 ? 's' : ''}</span>`
    : '';
  const bathInfo = listing.baths
    ? `<span>🚿 ${listing.baths} Bath${listing.baths > 1 ? 's' : ''}</span>`
    : '';

  if (listView) {
    return `
    <div class="listing-card list-card">
      <div class="card-header">
        <div class="card-emoji">${listing.emoji}</div>
        <div class="card-badges" style="margin-top:0.5rem">
          ${listing.verified
            ? '<span class="badge-verified">✓ Verified</span>'
            : '<span class="badge-pending">Pending</span>'}
        </div>
      </div>
      <div class="card-body" style="flex-direction:column;align-items:flex-start;gap:0.25rem">
        <div class="card-title">${listing.title}</div>
        <div class="card-location">📍 ${listing.location}</div>
        <div class="card-meta">
          ${bedInfo}${bathInfo}
          <span>🏷 ${listing.type}</span>
        </div>
        <div class="card-desc">${listing.description}</div>
      </div>
      <div class="card-footer" style="border-left:1px solid var(--border);min-width:140px;flex-direction:column;justify-content:center;gap:0.5rem">
        <div class="card-price">৳${price}<small>/mo</small></div>
        <a href="tel:${listing.phone}" class="btn-contact">📞 Call</a>
        <div style="font-size:0.72rem;color:var(--muted)">${listing.contact}</div>
      </div>
    </div>`;
  }

  return `
  <div class="listing-card">
    <div class="card-header">
      <div class="card-emoji">${listing.emoji}</div>
      <div class="card-badges">
        ${listing.verified
          ? '<span class="badge-verified">✓ Verified</span>'
          : '<span class="badge-pending">Pending</span>'}
        <span class="badge-type">${listing.type}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="card-title">${listing.title}</div>
      <div class="card-location">📍 ${listing.location}</div>
      <div class="card-meta">
        ${bedInfo}${bathInfo}
      </div>
      <div class="card-desc">${listing.description}</div>
    </div>
    <div class="card-footer">
      <div class="card-price">৳${price}<small>/mo</small></div>
      <a href="tel:${listing.phone}" class="btn-contact">📞 ${listing.contact}</a>
    </div>
  </div>`;
}

// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ============ HAMBURGER ============
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const open = mobileMenu.classList.contains('open');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
}

// ============ LOADER ============
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');
  }, 1300);
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.5s ease both';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.step-card, .listing-card, .tc').forEach(el => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.opacity = '';
      observer.observe(el);
    }, 300);
  });
});
