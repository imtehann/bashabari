// src/translations/en.js
// English UI strings for Bashabari

const en = {
  // ── Brand ──────────────────────────────────────────────
  brand: {
    name: 'Bashabari',
    tagline: 'Find Your Perfect Home',
    slogan: 'Rent Smart. Live Better.',
    description: 'Bangladesh\'s most trusted rental platform. Verified listings, real landlords, zero hassle.',
  },

  // ── Navbar ─────────────────────────────────────────────
  nav: {
    listings:  'Browse Listings',
    saved:     'Saved',
    dashboard: 'Dashboard',
    admin:     'Admin Panel',
    login:     'Sign In',
    signup:    'Post Property',
    logout:    'Sign Out',
    profile:   'My Profile',
    search:    'Search properties...',
  },

  // ── Hero ───────────────────────────────────────────────
  hero: {
    badge:        'Trusted by 10,000+ Renters',
    heading1:     'Find Your Perfect',
    heading2:     'Home in Bangladesh',
    subheading:   'Verified listings. Real prices. No Facebook drama. Find your next basa in minutes.',
    cta_primary:  'Browse Listings',
    cta_secondary:'How It Works',
    stats: {
      listings:   'Active Listings',
      cities:     'Cities Covered',
      landlords:  'Verified Landlords',
      renters:    'Happy Renters',
    },
  },

  // ── Search ─────────────────────────────────────────────
  search: {
    placeholder:  'Search by area, city, or type...',
    location:     'Location',
    type:         'Property Type',
    budget:       'Budget',
    bedrooms:     'Bedrooms',
    btn:          'Search',
    filters:      'Filters',
    clear:        'Clear All',
    results:      'results found',
    no_results:   'No properties found',
    no_results_hint: 'Try adjusting your filters or search in a different area.',
    types: {
      all:        'All Types',
      apartment:  'Apartment',
      house:      'House',
      sublet:     'Sublet',
      hostel:     'Hostel',
      office:     'Office Space',
    },
    budgets: {
      all:        'Any Budget',
      under5k:    'Under ৳5,000',
      '5k_10k':   '৳5,000 – ৳10,000',
      '10k_20k':  '৳10,000 – ৳20,000',
      '20k_35k':  '৳20,000 – ৳35,000',
      above35k:   'Above ৳35,000',
    },
    beds: {
      any:  'Any',
      one:  '1 Bed',
      two:  '2 Beds',
      three:'3 Beds',
      four: '4+ Beds',
    },
  },

  // ── Listings ───────────────────────────────────────────
  listings: {
    title:        'Browse All Listings',
    subtitle:     'Handpicked, verified rentals across Bangladesh',
    featured:     'Featured Listings',
    new:          'Newly Added',
    sort_label:   'Sort By',
    sort_newest:  'Newest First',
    sort_price_asc:  'Price: Low to High',
    sort_price_desc: 'Price: High to Low',
    view_all:     'View All Listings',
    per_month:    '/month',
    beds:         'beds',
    baths:        'baths',
    sqft:         'sqft',
    save:         'Save',
    saved:        'Saved',
    contact:      'Contact',
    details:      'View Details',
    available:    'Available',
    rented:       'Rented',
    negotiable:   'Negotiable',
  },

  // ── Property Detail ────────────────────────────────────
  property: {
    overview:     'Property Overview',
    description:  'About This Property',
    amenities:    'Amenities',
    location:     'Location & Nearby',
    landlord:     'Landlord',
    contact_landlord: 'Contact Landlord',
    whatsapp:     'WhatsApp',
    call:         'Call Now',
    share:        'Share',
    report:       'Report Listing',
    map_view:     'View on Map',
    similar:      'Similar Properties',
    floor:        'Floor',
    facing:       'Facing',
    parking:      'Parking',
    year_built:   'Year Built',
    available_from: 'Available From',
  },

  // ── Auth ───────────────────────────────────────────────
  auth: {
    login_title:    'Welcome back',
    login_subtitle: 'Sign in to your Bashabari account',
    signup_title:   'Join Bashabari',
    signup_subtitle:'Find or list properties with ease',
    email:          'Email address',
    password:       'Password',
    confirm_password: 'Confirm password',
    full_name:      'Full name',
    phone:          'Phone number',
    login_btn:      'Sign In',
    signup_btn:     'Create Account',
    google_login:   'Continue with Google',
    forgot_password:'Forgot password?',
    no_account:     'Don\'t have an account?',
    have_account:   'Already have an account?',
    signup_link:    'Sign up',
    login_link:     'Sign in',
    terms:          'By creating an account, you agree to our',
    terms_link:     'Terms & Privacy Policy',
    or:             'or',
  },

  // ── Dashboard ──────────────────────────────────────────
  dashboard: {
    title:          'My Dashboard',
    overview:       'Overview',
    my_listings:    'My Listings',
    saved_props:    'Saved Properties',
    inquiries:      'Inquiries',
    settings:       'Settings',
    add_property:   'Add Property',
    edit:           'Edit',
    delete:         'Delete',
    views:          'Views',
    inquiries_count:'Inquiries',
    active:         'Active',
    inactive:       'Inactive',
    no_listings:    'You haven\'t posted any listings yet.',
    start_listing:  'Post Your First Property',
  },

  // ── Admin ──────────────────────────────────────────────
  admin: {
    title:          'Admin Panel',
    users:          'All Users',
    all_listings:   'All Listings',
    reports:        'Reports',
    analytics:      'Analytics',
    verify:         'Verify',
    unverify:       'Unverify',
    ban_user:       'Ban User',
    approve:        'Approve',
    reject:         'Reject',
    total_users:    'Total Users',
    total_listings: 'Total Listings',
    pending:        'Pending Review',
    flagged:        'Flagged',
  },

  // ── Common ─────────────────────────────────────────────
  common: {
    loading:      'Loading...',
    error:        'Something went wrong. Please try again.',
    not_found:    'Page not found',
    back_home:    'Back to Home',
    read_more:    'Read More',
    see_all:      'See All',
    close:        'Close',
    confirm:      'Confirm',
    cancel:       'Cancel',
    save:         'Save Changes',
    success:      'Success!',
    taka:         '৳',
    verified:     'Verified',
    per_month:    'per month',
    bedroom:      'bedroom',
    bathroom:     'bathroom',
  },

  // ── Trust Section ──────────────────────────────────────
  trust: {
    title:    'Why Renters Trust Bashabari',
    subtitle: 'We\'re building the safest, most reliable rental experience in Bangladesh.',
    items: [
      {
        title:   'Verified Listings',
        desc:    'Every property is checked before going live. No fake posts, no ghost listings.',
      },
      {
        title:   'Real Landlords',
        desc:    'ID-verified owners and agents with contact history and ratings.',
      },
      {
        title:   'No Middlemen',
        desc:    'Connect directly with landlords. No brokerage fees on our end.',
      },
      {
        title:   'Safe Communication',
        desc:    'WhatsApp-direct contact with inquiry tracking and safety reporting.',
      },
    ],
  },

  // ── Testimonials ───────────────────────────────────────
  testimonials: {
    title:    'What Our Renters Say',
    subtitle: 'Real stories from people who found their home on Bashabari',
  },

  // ── CTA ────────────────────────────────────────────────
  cta: {
    list_title:    'Have a Property to Rent?',
    list_subtitle: 'List it for free. Reach thousands of verified renters in your city.',
    list_btn:      'List Your Property',
    find_title:    'Ready to Find Your Next Home?',
    find_subtitle: 'Join 10,000+ renters who found their home through Bashabari.',
    find_btn:      'Start Searching',
  },

  // ── Footer ─────────────────────────────────────────────
  footer: {
    tagline:    'Bangladesh\'s most trusted rental platform.',
    company:    'Company',
    about:      'About Us',
    careers:    'Careers',
    blog:       'Blog',
    press:      'Press',
    product:    'Product',
    how_it_works: 'How It Works',
    pricing:    'Pricing',
    safety:     'Safety',
    support:    'Support & Help',
    legal:      'Legal',
    privacy:    'Privacy Policy',
    terms:      'Terms of Service',
    cookies:    'Cookie Policy',
    rights:     '© 2024 Bashabari. All rights reserved.',
    made_in:    'Made with care in Dhaka, Bangladesh 🇧🇩',
    cities:     'We\'re in Dhaka · Chittagong · Sylhet · Rajshahi · Khulna',
  },

  // ── 404 ────────────────────────────────────────────────
  notFound: {
    heading:  '404',
    title:    'Page Not Found',
    subtitle: 'The page you\'re looking for doesn\'t exist or has been moved.',
    btn:      'Go Back Home',
    search:   'Or search for a property',
  },
};

export default en;
