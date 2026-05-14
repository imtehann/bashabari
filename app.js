/* ============================================================
   BASHABARI — Shared App Logic
   js/app.js
   ============================================================ */

/* ── Translation Data ── */
const LANG = {
  en: {
    nav: { listings:"Find a Home", saved:"Saved", dashboard:"Dashboard", login:"Sign In", signup:"Post a Listing", logout:"Sign Out", admin:"Admin" },
    hero: {
      badge:"Trusted by 12,000+ renters across Dhaka",
      title1:"Find Your Perfect", titleGrad:"Home in Bangladesh",
      sub:"Skip the Facebook chaos. Browse verified listings, connect with trusted landlords, and find your next home — safely and confidently.",
      ph:"Search by area: Dhanmondi, Gulshan, Mirpur, Bashundhara...", btn:"Search Homes"
    },
    filters: { all:"All", apartment:"Apartment", house:"House", sublet:"Sublet", bachelor:"Bachelor", family:"Family" },
    listings: {
      title:"Featured Homes", sub:"Hand-picked listings from verified landlords across Dhaka",
      viewAll:"View All Listings", verified:"Verified", available:"Available Now",
      pm:"/mo", beds:"beds", bath:"bath", sqft:"sqft", save:"Save", saved:"Saved",
      contact:"Contact Landlord", whatsapp:"WhatsApp", viewDetails:"View Details", results:"homes found"
    },
    trust: {
      title:"Why Renters Trust Bashabari",
      t1:"Verified Landlords", d1:"Every landlord is manually reviewed before listing any property on Bashabari.",
      t2:"Safe Communication", d2:"All contact goes through our secure platform — no spam, no harassment, no scams.",
      t3:"Lightning-Fast Search", d3:"Smart filters help you find the right home in minutes, not weeks.",
      t4:"Local Support", d4:"Our Dhaka-based team responds within hours, in English and Bangla."
    },
    stats: { title:"Bangladesh's Most Trusted Rental Platform", sub:"Building a safer, smarter way to find a home in Bangladesh" },
    cta: {
      title:"Ready to Find Your Perfect Home?",
      sub:"Join thousands of renters who found their home through Bashabari — not Facebook groups.",
      btn:"Browse All Listings",
      landlordTitle:"Are You a Landlord?",
      landlordSub:"List your property for free and reach thousands of verified, serious renters in minutes.",
      landlordBtn:"Post a Listing — It's Free"
    },
    testi: { title:"Real Stories. Real Renters.", sub:"Don't take our word for it — hear from people who found their home on Bashabari." },
    footer: {
      tag:"Find Your Perfect Home",
      rights:"© 2025 Bashabari Technologies Ltd. All rights reserved.",
      made:"Made with ❤️ for Bangladesh"
    },
    auth: {
      loginTitle:"Welcome back", loginSub:"Sign in to your Bashabari account",
      signupTitle:"Create your account", signupSub:"Join thousands finding their perfect home",
      email:"Email address", password:"Password", name:"Full name", phone:"Phone number",
      loginBtn:"Sign In", signupBtn:"Create Account",
      google:"Continue with Google",
      toSignup:"Don't have an account? Sign up", toLogin:"Already have an account? Sign in",
      forgotPw:"Forgot password?", orContinue:"Or continue with email"
    },
    saved: { title:"Your Saved Homes", sub:"Properties you've bookmarked for later", empty:"No saved homes yet", emptySub:"Browse listings and tap the heart to save homes — they'll appear here." },
    notFound: { title:"Looks like you're lost", sub:"This page doesn't exist or has been moved.", btn:"Back to Home" },
    contact: {
      title:"Get in Touch", sub:"We'd love to hear from you. Our Dhaka team responds within a few hours.",
      name:"Full Name", email:"Email Address", phone:"Phone Number", subject:"Subject", message:"Your Message",
      btn:"Send Message", success:"Message sent! We'll get back to you soon.",
      addr:"Bashundhara R/A, Dhaka 1229", addrLabel:"Our Office",
      mail:"hello@bashabari.com.bd", mailLabel:"Email Us",
      phoneVal:"+880 1700-000000", phoneLabel:"Call Us",
      hours:"Sun–Thu, 9am–6pm", hoursLabel:"Working Hours"
    },
    admin: {
      title:"Admin Dashboard", sub:"Manage listings, users, and platform activity",
      totalListings:"Total Listings", totalUsers:"Total Users", totalSaved:"Total Saves", pendingVerify:"Pending Verification",
      recentListings:"Recent Listings", recentUsers:"Recent Users",
      status:"Status", active:"Active", pending:"Pending", action:"Action", approve:"Approve", reject:"Reject"
    }
  },
  bn: {
    nav: { listings:"বাড়ি খুঁজুন", saved:"সেভ করা", dashboard:"ড্যাশবোর্ড", login:"সাইন ইন", signup:"লিস্টিং দিন", logout:"সাইন আউট", admin:"অ্যাডমিন" },
    hero: {
      badge:"ঢাকায় ১২,০০০+ ভাড়াটের বিশ্বস্ত প্ল্যাটফর্ম",
      title1:"খুঁজে নিন আপনার", titleGrad:"স্বপ্নের বাড়ি",
      sub:"ফেসবুকের ঝামেলা ছাড়ুন। যাচাইকৃত লিস্টিং ব্রাউজ করুন এবং নিরাপদে আপনার পরবর্তী বাড়ি খুঁজে নিন।",
      ph:"এলাকা লিখুন: ধানমন্ডি, গুলশান, মিরপুর, বসুন্ধরা...", btn:"বাড়ি খুঁজুন"
    },
    filters: { all:"সব", apartment:"অ্যাপার্টমেন্ট", house:"বাড়ি", sublet:"সাবলেট", bachelor:"ব্যাচেলর", family:"পরিবার" },
    listings: {
      title:"বিশেষ বাড়িসমূহ", sub:"ঢাকার যাচাইকৃত বাড়িওয়ালাদের বাছাই করা লিস্টিং",
      viewAll:"সব লিস্টিং দেখুন", verified:"যাচাইকৃত", available:"এখনই পাওয়া যাচ্ছে",
      pm:"/মাস", beds:"বেড", bath:"বাথ", sqft:"বর্গফুট", save:"সেভ", saved:"সেভ হয়েছে",
      contact:"বাড়িওয়ালার সাথে যোগাযোগ", whatsapp:"হোয়াটসঅ্যাপ", viewDetails:"বিস্তারিত দেখুন", results:"বাড়ি পাওয়া গেছে"
    },
    trust: {
      title:"কেন ভাড়াটেরা বাশাবাড়িকে বিশ্বাস করেন",
      t1:"যাচাইকৃত বাড়িওয়ালা", d1:"প্রতিটি বাড়িওয়ালা লিস্টিংয়ের আগে ম্যানুয়াল যাচাই প্রক্রিয়ার মধ্য দিয়ে যান।",
      t2:"নিরাপদ যোগাযোগ", d2:"সমস্ত যোগাযোগ আমাদের সুরক্ষিত প্ল্যাটফর্মে হয়।",
      t3:"দ্রুত বাড়ি খোঁজা", d3:"স্মার্ট ফিল্টার আপনাকে মিনিটেই সঠিক বাড়ি খুঁজে পেতে সাহায্য করে।",
      t4:"স্থানীয় সহায়তা", d4:"আমাদের ঢাকা-ভিত্তিক দল ঘণ্টার মধ্যে বাংলায় ও ইংরেজিতে সাড়া দেয়।"
    },
    stats: { title:"বাংলাদেশের সবচেয়ে বিশ্বস্ত রেন্টাল প্ল্যাটফর্ম", sub:"আমরা বাংলাদেশে বাড়ি ভাড়া নেওয়াকে আরও নিরাপদ ও স্মার্ট করছি" },
    cta: {
      title:"আপনার স্বপ্নের বাড়ি খুঁজতে প্রস্তুত?",
      sub:"হাজার হাজার ভাড়াটেদের সাথে যোগ দিন যারা বাশাবাড়িতে বাড়ি পেয়েছেন।",
      btn:"সব লিস্টিং দেখুন",
      landlordTitle:"আপনি কি বাড়িওয়ালা?",
      landlordSub:"বিনামূল্যে আপনার সম্পত্তি তালিকাভুক্ত করুন এবং হাজার হাজার যাচাইকৃত ভাড়াটেদের কাছে পৌঁছান।",
      landlordBtn:"বিনামূল্যে লিস্টিং দিন"
    },
    testi: { title:"আসল ভাড়াটেদের আসল অভিজ্ঞতা", sub:"বাশাবাড়িতে বাড়ি পাওয়া মানুষদের কথা শুনুন।" },
    footer: { tag:"আপনার স্বপ্নের বাড়ি খুঁজুন", rights:"© ২০২৫ বাশাবাড়ি টেকনোলজিস লিমিটেড। সর্বস্বত্ব সংরক্ষিত।", made:"বাংলাদেশের জন্য ❤️ দিয়ে তৈরি" },
    auth: {
      loginTitle:"স্বাগতম", loginSub:"আপনার বাশাবাড়ি অ্যাকাউন্টে সাইন ইন করুন",
      signupTitle:"অ্যাকাউন্ট তৈরি করুন", signupSub:"হাজার হাজার মানুষের সাথে যোগ দিন",
      email:"ইমেইল ঠিকানা", password:"পাসওয়ার্ড", name:"পুরো নাম", phone:"ফোন নম্বর",
      loginBtn:"সাইন ইন", signupBtn:"অ্যাকাউন্ট তৈরি করুন",
      google:"গুগল দিয়ে সাইন ইন",
      toSignup:"অ্যাকাউন্ট নেই? সাইন আপ করুন", toLogin:"অ্যাকাউন্ট আছে? সাইন ইন করুন",
      forgotPw:"পাসওয়ার্ড ভুলে গেছেন?", orContinue:"অথবা ইমেইল দিয়ে চালিয়ে যান"
    },
    saved: { title:"আপনার সেভ করা বাড়ি", sub:"যে বাড়িগুলো আপনি বুকমার্ক করেছেন", empty:"এখনো কোনো বাড়ি সেভ করা হয়নি", emptySub:"লিস্টিং ব্রাউজ করুন এবং হার্ট ট্যাপ করুন।" },
    notFound: { title:"পথ হারিয়ে ফেলেছেন?", sub:"এই পেজটি নেই বা সরিয়ে নেওয়া হয়েছে।", btn:"হোমে ফিরুন" },
    contact: {
      title:"আমাদের সাথে যোগাযোগ করুন", sub:"আমাদের ঢাকার দল কয়েক ঘণ্টার মধ্যে সাড়া দেবে।",
      name:"পুরো নাম", email:"ইমেইল ঠিকানা", phone:"ফোন নম্বর", subject:"বিষয়", message:"আপনার বার্তা",
      btn:"বার্তা পাঠান", success:"বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।",
      addr:"বসুন্ধরা আ/এ, ঢাকা ১২২৯", addrLabel:"আমাদের অফিস",
      mail:"hello@bashabari.com.bd", mailLabel:"ইমেইল করুন",
      phoneVal:"+৮৮০ ১৭০০-০০০০০০", phoneLabel:"কল করুন",
      hours:"রবি–বৃহস্পতি, সকাল ৯টা – সন্ধ্যা ৬টা", hoursLabel:"কার্যঘণ্টা"
    },
    admin: {
      title:"অ্যাডমিন ড্যাশবোর্ড", sub:"লিস্টিং, ব্যবহারকারী এবং প্ল্যাটফর্ম কার্যক্রম পরিচালনা করুন",
      totalListings:"মোট লিস্টিং", totalUsers:"মোট ব্যবহারকারী", totalSaved:"মোট সেভ", pendingVerify:"যাচাইয়ের অপেক্ষায়",
      recentListings:"সাম্প্রতিক লিস্টিং", recentUsers:"সাম্প্রতিক ব্যবহারকারী",
      status:"অবস্থা", active:"সক্রিয়", pending:"অপেক্ষমাণ", action:"ক্রিয়া", approve:"অনুমোদন", reject:"প্রত্যাখ্যান"
    }
  }
};

/* ── Property Data ── */
const PROPERTIES = [
  {
    id: 1,
    title: "Modern 3BR Apartment — Gulshan 2",
    titleBn: "গুলশান ২-এ আধুনিক ৩ বেডরুম অ্যাপার্টমেন্ট",
    area: "Gulshan 2, Dhaka", areaBn: "গুলশান ২, ঢাকা",
    price: 45000, beds: 3, baths: 2, sqft: 1800,
    type: "apartment", typeBn: "অ্যাপার্টমেন্ট",
    verified: true, rating: 4.9, reviews: 24,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=70",
    desc: "Beautifully maintained apartment in the heart of Gulshan 2, walking distance from Circle 2. Marble flooring, modular kitchen, split ACs in all rooms, 24/7 security and dedicated parking. Ideal for corporate families and expats.",
    descBn: "গুলশান ২-এর কেন্দ্রে সুন্দরভাবে রক্ষণাবেক্ষণ করা ফ্ল্যাট। মার্বেল মেঝে, মডুলার রান্নাঘর, সব ঘরে স্প্লিট এসি এবং ২৪/৭ নিরাপত্তা সহ ডেডিকেটেড পার্কিং।",
    amenities: ["wifi", "parking", "generator", "security", "gym", "lift"],
    tags: ["furnished", "family"],
    landlord: { name: "Rafiqul Islam", nameBn: "রফিকুল ইসলাম", avatar: "RI", phone: "+8801711234567", verified: true, listed: 12, respTime: "~2 hours", respTimeBn: "~২ ঘণ্টা" }
  },
  {
    id: 2,
    title: "Cozy Bachelor Flat — Dhanmondi R/A",
    titleBn: "ধানমন্ডিতে আরামদায়ক ব্যাচেলর ফ্ল্যাট",
    area: "Dhanmondi R/A, Dhaka", areaBn: "ধানমন্ডি আ/এ, ঢাকা",
    price: 18000, beds: 1, baths: 1, sqft: 750,
    type: "bachelor", typeBn: "ব্যাচেলর",
    verified: true, rating: 4.7, reviews: 18,
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=70",
    desc: "Perfect for working professionals or students. Dhanmondi Road 8, sunny south-facing flat with easy access to shopping, cafes, and bus routes. Tiled bathroom, functional kitchen, semi-furnished.",
    descBn: "কর্মজীবী বা শিক্ষার্থীদের জন্য আদর্শ। ধানমন্ডি রোড ৮-এ অবস্থিত দক্ষিণমুখী উজ্জ্বল ফ্ল্যাট। শপিং, রেস্তোরাঁ ও বাস রুটে সহজ প্রবেশাধিকার সহ।",
    amenities: ["wifi", "generator", "security"],
    tags: ["bachelor", "semi-furnished"],
    landlord: { name: "Nazmul Hossain", nameBn: "নাজমুল হোসেন", avatar: "NH", phone: "+8801812345678", verified: true, listed: 5, respTime: "~1 hour", respTimeBn: "~১ ঘণ্টা" }
  },
  {
    id: 3,
    title: "Spacious Family Home — Mirpur DOHS",
    titleBn: "মিরপুর ডিওএইচএস-এ প্রশস্ত পারিবারিক বাড়ি",
    area: "Mirpur DOHS, Dhaka", areaBn: "মিরপুর ডিওএইচএস, ঢাকা",
    price: 55000, beds: 4, baths: 3, sqft: 2400,
    type: "house", typeBn: "বাড়ি",
    verified: true, rating: 4.8, reviews: 31,
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=70",
    desc: "Stunning 4-bedroom house with private rooftop, spacious living areas, fully equipped kitchen and a lush garden terrace. Quiet, gated community with round-the-clock security. Ideal for large families.",
    descBn: "চমৎকার ৪ বেডরুমের বাড়ি সাথে ব্যক্তিগত ছাদ, প্রশস্ত বসার জায়গা এবং সবুজ বাগান। গেটেড কমিউনিটিতে ২৪/৭ নিরাপত্তা।",
    amenities: ["wifi", "parking", "generator", "security", "garden"],
    tags: ["family", "garden"],
    landlord: { name: "Shirin Akter", nameBn: "শিরিন আক্তার", avatar: "SA", phone: "+8801911234567", verified: true, listed: 3, respTime: "~3 hours", respTimeBn: "~৩ ঘণ্টা" }
  },
  {
    id: 4,
    title: "Premium Studio Apartment — Banani",
    titleBn: "বনানীতে প্রিমিয়াম স্টুডিও অ্যাপার্টমেন্ট",
    area: "Banani, Dhaka", areaBn: "বনানী, ঢাকা",
    price: 22000, beds: 1, baths: 1, sqft: 650,
    type: "sublet", typeBn: "সাবলেট",
    verified: false, rating: 4.5, reviews: 9,
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=70",
    desc: "Fully furnished studio in Banani — perfect for expats and corporate professionals. Modern interiors, high-speed fibre internet, smart TV, and walking distance to Banani Lake and restaurants.",
    descBn: "বনানীতে সম্পূর্ণ আসবাবপত্র সহ স্টুডিও। প্রবাসী ও কর্পোরেট পেশাদারদের জন্য আদর্শ। বনানী লেক ও রেস্তোরাঁ থেকে হাঁটার দূরত্বে।",
    amenities: ["wifi", "generator", "security", "lift"],
    tags: ["furnished", "bachelor"],
    landlord: { name: "Farhan Ahmed", nameBn: "ফারহান আহমেদ", avatar: "FA", phone: "+8801612345678", verified: false, listed: 2, respTime: "~5 hours", respTimeBn: "~৫ ঘণ্টা" }
  },
  {
    id: 5,
    title: "3BR Family Flat — Uttara Sector 7",
    titleBn: "উত্তরা সেক্টর ৭-এ ৩ বেডরুম পারিবারিক ফ্ল্যাট",
    area: "Uttara Sector 7, Dhaka", areaBn: "উত্তরা সেক্টর ৭, ঢাকা",
    price: 28000, beds: 3, baths: 2, sqft: 1400,
    type: "apartment", typeBn: "অ্যাপার্টমেন্ট",
    verified: true, rating: 4.6, reviews: 15,
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=70",
    desc: "Well-maintained family flat in Uttara Sector 7, close to model schools and Uttara town centre. Quiet residential block with 24/7 security, dedicated parking, and a helpful building manager.",
    descBn: "উত্তরা সেক্টর ৭-এ সুন্দর পারিবারিক ফ্ল্যাট। স্কুল ও শপিং সেন্টারের কাছে। ২৪/৭ নিরাপত্তা ও পার্কিং সহ।",
    amenities: ["wifi", "parking", "generator", "security"],
    tags: ["family"],
    landlord: { name: "Karim Uddin", nameBn: "করিম উদ্দিন", avatar: "KU", phone: "+8801511234567", verified: true, listed: 7, respTime: "~2 hours", respTimeBn: "~২ ঘণ্টা" }
  },
  {
    id: 6,
    title: "Affordable Bachelor Room — Mohammadpur",
    titleBn: "মোহাম্মদপুরে সাশ্রয়ী ব্যাচেলর রুম",
    area: "Mohammadpur, Dhaka", areaBn: "মোহাম্মদপুর, ঢাকা",
    price: 9000, beds: 1, baths: 1, sqft: 380,
    type: "sublet", typeBn: "সাবলেট",
    verified: true, rating: 4.3, reviews: 7,
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=70",
    desc: "Great value for students and fresh graduates. Shared kitchen and bathroom with 2 other tenants in a calm, clean building. Walking distance to Mohammadpur bus stand and markets.",
    descBn: "শিক্ষার্থী ও নতুন গ্র্যাজুয়েটদের জন্য সাশ্রয়ী রুম। পরিষ্কার ও শান্ত পরিবেশে শেয়ার কিচেন ও বাথরুম।",
    amenities: ["wifi", "generator"],
    tags: ["bachelor", "budget"],
    landlord: { name: "Taslima Begum", nameBn: "তাসলিমা বেগম", avatar: "TB", phone: "+8801311234567", verified: true, listed: 1, respTime: "~4 hours", respTimeBn: "~৪ ঘণ্টা" }
  }
];

const TESTIMONIALS = [
  { name:"Tanvir Rahman", nameBn:"তানভীর রহমান", role:"Software Engineer", roleBn:"সফটওয়্যার ইঞ্জিনিয়ার", loc:"Bashundhara R/A", locBn:"বসুন্ধরা আ/এ", avatar:"TR", rating:5, text:"Found my flat in Bashundhara within 3 days. Bashabari saved me from months of scrolling through chaotic Facebook groups. The verified landlord badge gave me real peace of mind.", textBn:"৩ দিনের মধ্যে বসুন্ধরায় ফ্ল্যাট পেয়েছি। ফেসবুকের বিশৃঙ্খল গ্রুপ থেকে মাসের পর মাস স্ক্রোল করার ঝামেলা থেকে বাশাবাড়ি আমাকে বাঁচিয়েছে।" },
  { name:"Nusrat Jahan", nameBn:"নুসরাত জাহান", role:"University Lecturer", roleBn:"বিশ্ববিদ্যালয় শিক্ষিকা", loc:"Dhanmondi", locBn:"ধানমন্ডি", avatar:"NJ", rating:5, text:"As a single woman, safety was my top priority. Bashabari's verified landlords and secure contact system made the whole renting process feel dignified and completely stress-free.", textBn:"একজন একক নারী হিসেবে নিরাপত্তাই ছিল আমার সর্বোচ্চ অগ্রাধিকার। বাশাবাড়ির যাচাইকৃত বাড়িওয়ালা এবং সুরক্ষিত যোগাযোগ পুরো ভাড়া প্রক্রিয়াটিকে সম্মানজনক করে তুলেছে।" },
  { name:"Rahim Chowdhury", nameBn:"রহিম চৌধুরী", role:"Business Owner", roleBn:"ব্যবসায়ী", loc:"Gulshan", locBn:"গুলশান", avatar:"RC", rating:5, text:"Listed my 3 properties in under 10 minutes. The dashboard is clean, enquiries come fast, and I filled all vacancies within 2 weeks. Outstanding platform for landlords.", textBn:"১০ মিনিটেরও কম সময়ে ৩টি সম্পত্তি তালিকাভুক্ত করেছি। ড্যাশবোর্ড পরিষ্কার, অনুসন্ধান দ্রুত আসে এবং ২ সপ্তাহেই সব খালি জায়গা পূর্ণ হয়েছে।" }
];

const AMENITY_MAP = {
  wifi:      { icon:'wifi',      label:'Wi-Fi',     labelBn:'ওয়াই-ফাই' },
  parking:   { icon:'car',       label:'Parking',   labelBn:'পার্কিং' },
  generator: { icon:'zap',       label:'Generator', labelBn:'জেনারেটর' },
  security:  { icon:'shield',    label:'Security',  labelBn:'নিরাপত্তা' },
  gym:       { icon:'dumbbell',  label:'Gym',       labelBn:'জিম' },
  lift:      { icon:'layers',    label:'Lift',      labelBn:'লিফট' },
  garden:    { icon:'tree',      label:'Garden',    labelBn:'বাগান' }
};

/* ── Utilities ── */
const fmt = n => '৳ ' + n.toLocaleString('en-BD');
const savedKey = 'bashabari_saved';
const langKey  = 'bashabari_lang';
const loggedKey = 'bashabari_logged';

function getSaved()   { try{ return JSON.parse(localStorage.getItem(savedKey)||'[]'); }catch{ return []; } }
function setSaved(a)  { localStorage.setItem(savedKey, JSON.stringify(a)); }
function getLang()    { return localStorage.getItem(langKey) || 'en'; }
function setLangLS(l) { localStorage.setItem(langKey, l); }
function isLoggedIn() { return localStorage.getItem(loggedKey) === '1'; }
function login()      { localStorage.setItem(loggedKey, '1'); }
function logout()     { localStorage.removeItem(loggedKey); }

/* ── Current language state ── */
let currentLang = getLang();

function t(section, key) {
  return LANG[currentLang]?.[section]?.[key] || LANG.en?.[section]?.[key] || '';
}
function tObj(section) {
  return LANG[currentLang]?.[section] || LANG.en?.[section] || {};
}

/* ── Stars HTML ── */
function starsHTML(n) {
  let h = '<div class="stars">';
  for (let i=1;i<=5;i++) {
    h += `<svg class="star" viewBox="0 0 20 20" fill="${i<=n?'#f59e0b':'none'}" stroke="${i<=n?'#f59e0b':'#e2e8f0'}" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  }
  return h + '</div>';
}

/* ── Property card HTML ── */
function propCardHTML(prop, saved) {
  const isBn = currentLang === 'bn';
  const isSaved = saved.includes(prop.id);
  const tl = tObj('listings');
  return `
  <div class="card prop-card" onclick="window.location.href='listing-detail.html?id=${prop.id}'" data-prop="${prop.id}">
    <div class="prop-img-wrap">
      ${prop.img
        ? `<img class="prop-img" src="${prop.img}" alt="${isBn?prop.titleBn:prop.title}" onerror="this.parentNode.innerHTML='<div class=\\'prop-img-placeholder\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'1.5\\' d=\\'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z\\'/><polyline points=\\'9,22 9,12 15,12 15,22\\'/></svg></div>'">`
        : `<div class="prop-img-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg></div>`
      }
      <div class="prop-badges">
        ${prop.verified ? `<span class="badge-verified"><svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> ${tl.verified}</span>` : ''}
        <span class="badge-type">${isBn?prop.typeBn:prop.type}</span>
      </div>
      <button class="btn-bookmark${isSaved?' saved':''}" onclick="event.stopPropagation();toggleSave(${prop.id},this)" aria-label="Save">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="${isSaved?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </button>
    </div>
    <div class="prop-body">
      <div class="prop-rating flex-between">
        <div style="display:flex;align-items:center;gap:6px">
          ${starsHTML(Math.round(prop.rating))}
          <span style="font-size:12px;color:var(--gray-500)">${prop.rating} (${prop.reviews})</span>
        </div>
        <span class="badge-available"><span class="live-dot"></span> ${tl.available}</span>
      </div>
      <h3 class="prop-title${isBn?' font-bn':''}">${isBn?prop.titleBn:prop.title}</h3>
      <div class="prop-area">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span${isBn?' class="font-bn"':''}>${isBn?prop.areaBn:prop.area}</span>
      </div>
      <div class="prop-meta">
        <div class="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg><strong>${prop.beds}</strong><span>${tl.beds}</span></div>
        <div class="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16m-8-8v16"/></svg><strong>${prop.baths}</strong><span>${tl.bath}</span></div>
        <div class="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg><strong>${prop.sqft}</strong><span>${tl.sqft}</span></div>
      </div>
      <div class="prop-footer">
        <div class="prop-price">
          <span class="price-num">${fmt(prop.price)}</span>
          <span class="price-unit">${tl.pm}</span>
        </div>
        <a href="listing-detail.html?id=${prop.id}" class="btn-view-details" onclick="event.stopPropagation()">
          ${tl.viewDetails}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>`;
}

/* ── Save / Bookmark toggle ── */
function toggleSave(id, btn) {
  let saved = getSaved();
  const isSaved = saved.includes(id);
  if (isSaved) {
    saved = saved.filter(i => i !== id);
    showToast(currentLang==='bn' ? 'সেভ তালিকা থেকে সরানো হয়েছে' : 'Removed from saved');
  } else {
    saved.push(id);
    showToast(currentLang==='bn' ? 'সেভ হয়েছে ✓' : 'Saved ✓');
  }
  setSaved(saved);
  if (btn) {
    btn.classList.toggle('saved', !isSaved);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', !isSaved ? 'currentColor' : 'none');
  }
  updateSavedBadge();
}

function updateSavedBadge() {
  const n = getSaved().length;
  document.querySelectorAll('.saved-badge-count').forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  });
  document.querySelectorAll('.bottom-nav-badge').forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  });
}

/* ── Toast ── */
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  let wrap = document.getElementById('toast-container');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-container';
    wrap.className = 'toast-container';
    document.body.appendChild(wrap);
  }
  wrap.innerHTML = `<div class="toast">${msg}</div>`;
  toastTimer = setTimeout(() => { wrap.innerHTML = ''; }, 2600);
}

/* ── Navbar ── */
function renderNavbar(activePage) {
  const isBn = currentLang === 'bn';
  const logged = isLoggedIn();
  const nl = tObj('nav');
  const saved = getSaved();
  const sCount = saved.length;

  const pages = [
    { key:'listings', href:'listings.html', label:nl.listings },
    { key:'saved',    href:'saved.html',    label:nl.saved, badge:sCount },
    ...(logged ? [{ key:'dashboard', href:'dashboard.html', label:nl.dashboard }] : [])
  ];

  const linksHTML = pages.map(p => `
    <a href="${p.href}" class="nav-link${activePage===p.key?' active':''}${isBn?' font-bn':''}">
      ${p.label}
      ${p.badge && p.badge>0 ? `<span class="nav-badge saved-badge-count">${p.badge}</span>` : ''}
    </a>`).join('');

  const rightHTML = logged
    ? `<a href="dashboard.html" class="avatar avatar-md" style="text-decoration:none">U</a>
       <button class="btn-nav-login" onclick="handleLogout()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg></button>`
    : `<a href="login.html" class="btn-nav-login${isBn?' font-bn':''}">${nl.login}</a>
       <a href="signup.html" class="btn-nav-cta${isBn?' font-bn':''}">${nl.signup}</a>`;

  const mobileLinks = [
    { href:'index.html', label:'Home', labelBn:'হোম', key:'home' },
    { href:'listings.html', label:'Find a Home', labelBn:'বাড়ি খুঁজুন', key:'listings' },
    { href:'saved.html', label:'Saved Homes', labelBn:'সেভ করা বাড়ি', key:'saved' },
    { href:'contact.html', label:'Contact', labelBn:'যোগাযোগ', key:'contact' },
    ...(logged ? [{ href:'dashboard.html', label:'Dashboard', labelBn:'ড্যাশবোর্ড', key:'dashboard' }] : []),
    ...(logged ? [] : [{ href:'login.html', label:'Sign In', labelBn:'সাইন ইন', key:'login' }])
  ];

  const html = `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 22L20 11L30 22" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="14" y="22" width="12" height="10" rx="1.5" fill="#1e40af"/>
            <rect x="17.5" y="25" width="5" height="7" rx="1" fill="#93c5fd"/>
          </svg>
        </div>
        <div class="nav-logo-text">
          <div class="nav-logo-name">BASHA<span>BARI</span></div>
          <div class="nav-logo-tagline">Find Your Perfect Home</div>
        </div>
      </a>
      <div class="nav-links">${linksHTML}</div>
      <div class="nav-right">
        <div class="lang-toggle">
          <button class="lang-btn${currentLang==='en'?' active':''}" onclick="switchLang('en')">EN</button>
          <button class="lang-btn${currentLang==='bn'?' active':''}" onclick="switchLang('bn')">বাংলা</button>
        </div>
        ${rightHTML}
      </div>
      <button class="nav-hamburger" id="hamburger" onclick="toggleMobileMenu()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-menu" id="mobile-menu">
    ${mobileLinks.map(l=>`<a href="${l.href}" class="mobile-menu-link${activePage===l.key?' active':''}${isBn?' font-bn':''}">${isBn?l.labelBn:l.label}</a>`).join('')}
    <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.07);display:flex;gap:8px;align-items:center">
      <div class="lang-toggle">
        <button class="lang-btn${currentLang==='en'?' active':''}" onclick="switchLang('en')">EN</button>
        <button class="lang-btn${currentLang==='bn'?' active':''}" onclick="switchLang('bn')">বাংলা</button>
      </div>
    </div>
  </div>`;

  const navWrap = document.getElementById('navbar-root');
  if (navWrap) navWrap.innerHTML = html;
}

/* ── Mobile menu toggle ── */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn   = document.getElementById('hamburger');
  if (menu) menu.classList.toggle('open');
  if (btn)  btn.classList.toggle('open');
}

/* ── Language switch ── */
function switchLang(l) {
  currentLang = l;
  setLangLS(l);
  location.reload();
}

/* ── Auth ── */
function handleLogin(e) {
  if (e) e.preventDefault();
  login();
  showToast(currentLang==='bn' ? 'সাইন ইন সফল হয়েছে ✓' : 'Welcome to Bashabari ✓');
  setTimeout(()=>{ window.location.href = 'dashboard.html'; }, 600);
}
function handleLogout() {
  logout();
  window.location.href = 'index.html';
}

/* ── Footer ── */
function renderFooter() {
  const isBn = currentLang === 'bn';
  const ft = tObj('footer');
  const cols = {
    [isBn?'কোম্পানি':'Company']:
      [['about','#'],['careers','#'],['press','#'],['blog','#']].map(([l,h])=>[isBn?`${l}`:`${l.charAt(0).toUpperCase()+l.slice(1)}`,h]),
    [isBn?'সহায়তা':'Support']:
      [isBn?['হেল্প সেন্টার','#']:['Help Center','#'], isBn?['নিরাপত্তা টিপস','#']:['Safety Tips','#'], isBn?['যোগাযোগ','contact.html']:['Contact Us','contact.html']],
    [isBn?'আইনি':'Legal']:
      [isBn?['গোপনীয়তা নীতি','#']:['Privacy Policy','#'], isBn?['সেবার শর্ত','#']:['Terms of Service','#']]
  };
  const colsHTML = Object.entries(cols).map(([title, items]) => `
    <div>
      <div class="footer-col-title${isBn?' font-bn':''}">${title}</div>
      ${items.map(([label, href]) => `<a href="${href}" class="footer-link${isBn?' font-bn':''}">${label}</a>`).join('')}
    </div>`).join('');

  const html = `
  <footer class="footer">
    <div class="container">
      <div style="display:grid;grid-template-columns:1.3fr repeat(3,1fr);gap:48px;flex-wrap:wrap">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo">
            <div class="nav-logo-icon">
              <svg viewBox="0 0 40 40" fill="none"><path d="M10 22L20 11L30 22" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="22" width="12" height="10" rx="1.5" fill="#1e40af"/><rect x="17.5" y="25" width="5" height="7" rx="1" fill="#93c5fd"/></svg>
            </div>
            <div class="nav-logo-text">
              <div class="nav-logo-name">BASHA<span>BARI</span></div>
            </div>
          </a>
          <p class="${isBn?'font-bn':''}">${ft.tag}</p>
          <div class="footer-social">
            ${['f','in','tw','yt'].map(s=>`<a href="#" class="footer-social-btn">${s}</a>`).join('')}
          </div>
        </div>
        ${colsHTML}
      </div>
      <div class="footer-bottom">
        <span class="${isBn?'font-bn':''}">${ft.rights}</span>
        <span>${ft.made}</span>
      </div>
    </div>
  </footer>`;

  const fw = document.getElementById('footer-root');
  if (fw) fw.innerHTML = html;
}

/* ── Mobile Bottom Nav ── */
function renderBottomNav(activePage) {
  const saved = getSaved();
  const sCount = saved.length;
  const items = [
    { key:'home',     href:'index.html',    icon:'home',    label:'Home', labelBn:'হোম' },
    { key:'listings', href:'listings.html', icon:'search',  label:'Search', labelBn:'খুঁজুন' },
    { key:'saved',    href:'saved.html',    icon:'bookmark', label:'Saved', labelBn:'সেভ', badge:sCount },
    { key:'dashboard',href:'dashboard.html',icon:'user',    label:'Profile', labelBn:'প্রোফাইল' }
  ];
  const icons = {
    home: `<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`,
    search: `<circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/>`,
    bookmark: `<path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>`,
    user: `<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>`
  };
  const html = `
  <nav class="bottom-nav">
    ${items.map(item => `
    <button class="bottom-nav-item${activePage===item.key?' active':''}" onclick="window.location.href='${item.href}'">
      ${item.badge && item.badge>0 ? `<span class="bottom-nav-badge saved-badge-count">${item.badge}</span>` : ''}
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${icons[item.icon]}</svg>
      <span>${currentLang==='bn'?item.labelBn:item.label}</span>
    </button>`).join('')}
  </nav>`;
  const bnw = document.getElementById('bottom-nav-root');
  if (bnw) bnw.innerHTML = html;
}

/* ── Scroll reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Init (called per page) ── */
function initPage(activePage) {
  currentLang = getLang();
  renderNavbar(activePage);
  if (document.getElementById('footer-root')) renderFooter();
  if (document.getElementById('bottom-nav-root')) renderBottomNav(activePage);
  updateSavedBadge();
  setTimeout(initScrollReveal, 100);
}
