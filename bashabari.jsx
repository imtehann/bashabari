import { useState, useEffect, useCallback } from "react";
import {
  Search, Heart, User, MapPin, Bed, Bath, Home, Menu, X,
  MessageCircle, Star, Shield, CheckCircle, Building2,
  TrendingUp, Users, Award, ArrowRight, Eye, Globe,
  Wifi, Car, Zap, Bell, Share2, ChevronRight, Lock,
  Mail, BadgeCheck, Clock, ChevronLeft, Plus, BarChart3,
  Settings, FileText, SlidersHorizontal, Trees, Filter,
  Phone, LogOut, Bookmark, BookmarkCheck, ChevronDown, Layers
} from "lucide-react";

/* =========================================================
   GLOBAL STYLES
   ========================================================= */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@700;800&family=Hind+Siliguri:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a; background: #ffffff; }
  .display { font-family: 'Playfair Display', Georgia, serif; }
  .bn { font-family: 'Hind Siliguri', 'DM Sans', sans-serif; }
  button { cursor: pointer; border: none; background: none; font-family: inherit; }
  input, select { font-family: inherit; }
  a { text-decoration: none; color: inherit; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shimmer { 0% { background-position: -400% 0; } 100% { background-position: 400% 0; } }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  @keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

  .fade-up { animation: fadeUp 0.65s ease forwards; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .slide-down { animation: slideDown 0.25s ease forwards; }
  .d1 { animation-delay: 0.08s; opacity: 0; }
  .d2 { animation-delay: 0.18s; opacity: 0; }
  .d3 { animation-delay: 0.28s; opacity: 0; }
  .d4 { animation-delay: 0.40s; opacity: 0; }
  .d5 { animation-delay: 0.54s; opacity: 0; }

  .card-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .card-lift:hover { transform: translateY(-5px); box-shadow: 0 28px 60px rgba(15,23,42,0.13); }
  .btn-trans { transition: all 0.2s ease; }
  .btn-glow:hover { box-shadow: 0 8px 28px rgba(37,99,235,0.42); transform: translateY(-2px); }

  .hero-bg {
    background: linear-gradient(150deg, #0a1628 0%, #0f2347 35%, #1a3875 65%, #1d4ed8 100%);
    position: relative; overflow: hidden;
  }
  .hero-bg::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 20% 60%, rgba(59,130,246,0.18) 0%, transparent 55%),
                radial-gradient(ellipse at 80% 20%, rgba(96,165,250,0.12) 0%, transparent 45%),
                radial-gradient(ellipse at 55% 85%, rgba(147,197,253,0.09) 0%, transparent 40%);
  }
  .hero-dots {
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white' fill-opacity='0.04'/%3E%3C/svg%3E");
    position: absolute; inset: 0; pointer-events: none;
  }

  .glass-card { background: rgba(255,255,255,0.07); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.11); }
  .nav-glass { background: rgba(10,22,40,0.96); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.06); }

  .search-bar {
    background: white; border-radius: 18px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08);
    overflow: hidden;
  }

  .lang-toggle { display: flex; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.14); border-radius: 30px; padding: 3px; gap: 2px; }
  .lang-option { padding: 4px 13px; border-radius: 24px; font-size: 12.5px; font-weight: 500; color: rgba(255,255,255,0.55); cursor: pointer; transition: all 0.22s ease; white-space: nowrap; }
  .lang-option.active { background: white; color: #0f172a; font-weight: 600; }
  .lang-toggle-light { background: #f1f5f9; border: 1px solid #e2e8f0; }
  .lang-option-light { color: #64748b; }
  .lang-option-light.active { background: #1e40af; color: white; }

  .filter-chip { padding: 7px 18px; border-radius: 24px; font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; border: 1.5px solid #e2e8f0; background: white; color: #475569; }
  .filter-chip:hover { border-color: #93c5fd; color: #1e40af; background: #eff6ff; }
  .filter-chip.active { background: #1e40af; border-color: #1e40af; color: white; }

  .verified-pill { background: linear-gradient(135deg, #10b981, #059669); color: white; font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 20px; letter-spacing: 0.4px; display: inline-flex; align-items: center; gap: 3px; }

  .prop-card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid #f1f5f9; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
  .prop-image { width: 100%; height: 216px; object-fit: cover; display: block; }
  .prop-img-placeholder { width: 100%; height: 216px; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%); display: flex; align-items: center; justify-content: center; }

  .skeleton { background: linear-gradient(90deg, #f8fafc 25%, #e2e8f0 50%, #f8fafc 75%); background-size: 400% 100%; animation: shimmer 1.6s infinite; border-radius: 10px; }

  .price-text { background: linear-gradient(135deg, #1e3a8a, #2563eb); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .section-chip { display: inline-flex; align-items: center; gap: 6px; background: rgba(37,99,235,0.07); color: #2563eb; border: 1px solid rgba(37,99,235,0.14); padding: 5px 14px; border-radius: 24px; font-size: 13px; font-weight: 600; letter-spacing: 0.2px; }

  .testimonial-card { background: white; border-radius: 22px; padding: 30px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #f1f5f9; transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .testimonial-card:hover { transform: translateY(-4px); box-shadow: 0 14px 44px rgba(0,0,0,0.10); }

  .trust-card { background: white; border-radius: 22px; padding: 32px 28px; border: 1px solid #f1f5f9; box-shadow: 0 4px 20px rgba(0,0,0,0.05); transition: all 0.25s ease; }
  .trust-card:hover { border-color: #bfdbfe; transform: translateY(-4px); box-shadow: 0 14px 44px rgba(37,99,235,0.09); }

  .trust-icon-wrap { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }

  .avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: white; background: linear-gradient(135deg, #1e40af, #3b82f6); flex-shrink: 0; }
  .avatar-lg { width: 58px; height: 58px; font-size: 20px; }
  .avatar-xl { width: 72px; height: 72px; font-size: 24px; }

  .input-field { width: 100%; padding: 13px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; font-size: 15px; transition: all 0.2s ease; outline: none; color: #0f172a; background: #fafafa; }
  .input-field:focus { border-color: #3b82f6; background: white; box-shadow: 0 0 0 3px rgba(59,130,246,0.11); }

  .page-wrap { animation: fadeIn 0.3s ease; }

  .mobile-nav { position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #f1f5f9; display: none; z-index: 50; box-shadow: 0 -4px 24px rgba(0,0,0,0.07); padding-bottom: env(safe-area-inset-bottom); }

  .toast { position: fixed; bottom: 84px; left: 50%; transform: translateX(-50%); background: #0f172a; color: white; padding: 13px 26px; border-radius: 40px; font-size: 14px; font-weight: 500; z-index: 200; animation: toastIn 0.3s ease; white-space: nowrap; box-shadow: 0 8px 32px rgba(0,0,0,0.28); }

  .wapp-btn { background: #25d366; color: white; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border-radius: 12px; font-weight: 600; font-size: 14.5px; }
  .wapp-btn:hover { background: #128C7E; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,211,102,0.3); }

  .live-dot { width: 7px; height: 7px; background: #10b981; border-radius: 50%; animation: pulse-dot 1.8s ease infinite; }

  .tag-pill { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11.5px; font-weight: 600; background: #eff6ff; color: #2563eb; border: 1px solid #dbeafe; margin: 2px; }

  .stat-num { font-size: 36px; font-weight: 800; letter-spacing: -1px; color: white; }
  .stat-label { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 3px; font-weight: 400; }

  .hero-stat { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 16px 20px; text-align: center; min-width: 120px; }

  .cta-section { background: linear-gradient(150deg, #0a1628 0%, #1e3a8a 100%); position: relative; overflow: hidden; }
  .cta-section::before { content:''; position:absolute; top:-40%; right:-10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%); pointer-events: none; }

  .dashboard-stat { background: white; border-radius: 18px; padding: 24px; border: 1px solid #f1f5f9; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
  .dashboard-nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: all 0.18s ease; color: #64748b; font-size: 14.5px; font-weight: 500; }
  .dashboard-nav-item:hover { background: #f8fafc; color: #1e40af; }
  .dashboard-nav-item.active { background: #eff6ff; color: #1e40af; font-weight: 600; }

  .auth-card { background: white; border-radius: 24px; padding: 44px 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.09); border: 1px solid #f1f5f9; max-width: 440px; width: 100%; }

  .footer-bg { background: #0a1628; }

  @media (max-width: 768px) {
    .hide-mob { display: none !important; }
    .mobile-nav { display: flex !important; }
    .auth-card { padding: 32px 24px; border-radius: 20px; }
    .hero-stats-row { flex-direction: column; gap: 10px; }
  }
  @media (min-width: 769px) { .show-mob { display: none !important; } }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #f8fafc; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
`;

/* =========================================================
   TRANSLATIONS
   ========================================================= */
const TR = {
  en: {
    nav: { listings:"Find a Home", saved:"Saved", dashboard:"Dashboard", login:"Sign In", signup:"Post a Listing", logout:"Sign Out" },
    hero: {
      badge: "Trusted by 12,000+ renters in Dhaka",
      title1: "Find Your Perfect", titleGrad: "Home in Bangladesh",
      sub: "Skip the Facebook chaos. Browse verified listings, connect with trusted landlords, and find your next home — safely and confidently.",
      ph: "Search by area: Dhanmondi, Gulshan, Mirpur...", btn: "Search Homes",
      s1v:"12K+", s1l:"Happy Renters", s2v:"3,200+", s2l:"Active Listings", s3v:"840+", s3l:"Verified Landlords", s4v:"32", s4l:"Areas Covered"
    },
    filters: { all:"All", apartment:"Apartment", house:"House", sublet:"Sublet", bachelor:"Bachelor", family:"Family" },
    listings: {
      title:"Featured Homes", sub:"Hand-picked listings from verified landlords across Dhaka",
      viewAll:"View All Listings", verified:"Verified", available:"Available Now",
      pm:"/mo", beds:"beds", bath:"bath", sqft:"sqft", save:"Save", saved:"Saved",
      contact:"Contact Landlord", whatsapp:"WhatsApp", viewDetails:"View Details"
    },
    property: {
      overview:"Property Overview", amenities:"Amenities & Features", desc:"About This Property",
      landlord:"About the Landlord", backToListings:"Back to Listings",
      listedProperties:"Properties Listed", responseTime:"Response Time",
      contactViaWa:"Contact via WhatsApp", callNow:"Call Now", similarHomes:"Similar Homes Nearby"
    },
    stats: { title:"Bangladesh's Most Trusted Rental Platform", sub:"We're building a safer, smarter way to find a home in Bangladesh" },
    testimonials: { title:"Real Stories from Real Renters", sub:"Don't take our word for it — hear from people who found their home on Bashabari" },
    trust: {
      title:"Why Renters Trust Bashabari",
      t1:"Verified Landlords", d1:"Every landlord is manually reviewed and verified before listing any property.",
      t2:"Safe Communication", d2:"All contact goes through our secure platform — no spam, no harassment, no scams.",
      t3:"Lightning-Fast Search", d3:"Smart filters help you find the right home in minutes, not weeks.",
      t4:"Local Support Team", d4:"Our Dhaka-based team responds within hours, in English and Bangla."
    },
    cta: {
      title:"Ready to Find Your Perfect Home?",
      sub:"Join thousands of renters who found their home through Bashabari — not Facebook groups.",
      btn:"Browse All Listings",
      landlordTitle:"Are You a Landlord?",
      landlordSub:"List your property for free and reach thousands of verified, serious renters.",
      landlordBtn:"Post a Listing — It's Free"
    },
    footer: {
      tag:"Find Your Perfect Home", company:"Company", about:"About Us", careers:"Careers", press:"Press", blog:"Blog",
      support:"Support", help:"Help Center", safety:"Safety Tips", contact:"Contact Us",
      legal:"Legal", privacy:"Privacy Policy", terms:"Terms of Service",
      rights:"© 2025 Bashabari. All rights reserved.", made:"Made with ❤️ for Bangladesh"
    },
    auth: {
      loginTitle:"Welcome back", loginSub:"Sign in to your Bashabari account",
      signupTitle:"Create your account", signupSub:"Join thousands finding their perfect home",
      email:"Email address", password:"Password", name:"Full name", phone:"Phone number",
      loginBtn:"Sign In", signupBtn:"Create Account",
      toSignup:"Don't have an account? Sign up →", toLogin:"Already have an account? Sign in →",
      forgotPw:"Forgot password?", orContinue:"Or continue with"
    },
    dashboard: {
      title:"My Dashboard", sub:"Manage your listings and account activity",
      myListings:"My Listings", savedHomes:"Saved Homes", messages:"Messages", settings:"Settings",
      addListing:"Add New Listing", activeListings:"Active Listings", totalViews:"Total Views",
      savedBy:"Saved by Others", responseRate:"Response Rate", noListings:"No active listings yet.",
      noListingsSub:"Post your first property and start receiving enquiries."
    },
    saved: {
      title:"Your Saved Homes", sub:"Properties you've bookmarked for later",
      empty:"No saved homes yet", emptySub:"Browse listings and tap ♡ to save homes you love — they'll appear here."
    },
    notFound: { title:"Looks like you're lost", sub:"This page doesn't exist or has been moved.", btn:"Back to Home" }
  },
  bn: {
    nav: { listings:"বাড়ি খুঁজুন", saved:"সেভ করা", dashboard:"ড্যাশবোর্ড", login:"সাইন ইন", signup:"লিস্টিং দিন", logout:"সাইন আউট" },
    hero: {
      badge: "ঢাকায় ১২,০০০+ রেন্টারের আস্থার প্ল্যাটফর্ম",
      title1: "বাংলাদেশে খুঁজুন", titleGrad: "আপনার স্বপ্নের বাড়ি",
      sub: "ফেসবুকের ঝামেলা ছাড়ুন। যাচাইকৃত লিস্টিং ব্রাউজ করুন, বিশ্বস্ত বাড়িওয়ালার সাথে যোগাযোগ করুন এবং নিরাপদে বাড়ি খুঁজে নিন।",
      ph: "এলাকার নাম লিখুন: ধানমন্ডি, গুলশান, মিরপুর...", btn: "বাড়ি খুঁজুন",
      s1v:"১২ হাজার+", s1l:"সুখী ভাড়াটে", s2v:"৩,২০০+", s2l:"সক্রিয় লিস্টিং", s3v:"৮৪০+", s3l:"যাচাইকৃত বাড়িওয়ালা", s4v:"৩২", s4l:"এলাকা কভার"
    },
    filters: { all:"সব", apartment:"অ্যাপার্টমেন্ট", house:"বাড়ি", sublet:"সাবলেট", bachelor:"ব্যাচেলর", family:"পরিবার" },
    listings: {
      title:"বিশেষ বাড়িসমূহ", sub:"ঢাকার যাচাইকৃত বাড়িওয়ালাদের বাছাই করা লিস্টিং",
      viewAll:"সব লিস্টিং দেখুন", verified:"যাচাইকৃত", available:"এখনই পাওয়া যাচ্ছে",
      pm:"/মাস", beds:"বেড", bath:"বাথ", sqft:"বর্গফুট", save:"সেভ করুন", saved:"সেভ হয়েছে",
      contact:"বাড়িওয়ালার সাথে যোগাযোগ", whatsapp:"হোয়াটসঅ্যাপ", viewDetails:"বিস্তারিত দেখুন"
    },
    property: {
      overview:"সম্পত্তির বিবরণ", amenities:"সুবিধাসমূহ", desc:"এই বাড়ি সম্পর্কে",
      landlord:"বাড়িওয়ালার পরিচয়", backToListings:"লিস্টিংয়ে ফিরুন",
      listedProperties:"তালিকাভুক্ত সম্পত্তি", responseTime:"সাড়া দেওয়ার সময়",
      contactViaWa:"হোয়াটসঅ্যাপে যোগাযোগ", callNow:"এখনই কল করুন", similarHomes:"কাছাকাছি অনুরূপ বাড়ি"
    },
    stats: { title:"বাংলাদেশের সবচেয়ে বিশ্বস্ত রেন্টাল প্ল্যাটফর্ম", sub:"আমরা বাংলাদেশে বাড়ি ভাড়া নেওয়াকে আরও নিরাপদ ও স্মার্ট করে তুলছি" },
    testimonials: { title:"আসল ভাড়াটেদের আসল অভিজ্ঞতা", sub:"আমাদের কথা নয়, বাশাবাড়িতে বাড়ি পাওয়া মানুষদের কথা শুনুন" },
    trust: {
      title:"কেন ভাড়াটেরা বাশাবাড়িকে বিশ্বাস করেন",
      t1:"যাচাইকৃত বাড়িওয়ালা", d1:"প্রতিটি বাড়িওয়ালা লিস্টিংয়ের আগে ম্যানুয়াল যাচাই প্রক্রিয়ার মধ্য দিয়ে যান।",
      t2:"নিরাপদ যোগাযোগ", d2:"সমস্ত যোগাযোগ আমাদের সুরক্ষিত প্ল্যাটফর্মে হয় — কোনো স্প্যাম বা স্ক্যাম নেই।",
      t3:"দ্রুত বাড়ি খোঁজা", d3:"স্মার্ট ফিল্টার আপনাকে সপ্তাহ নয়, মিনিটের মধ্যে সঠিক বাড়ি খুঁজে পেতে সাহায্য করে।",
      t4:"স্থানীয় সহায়তা দল", d4:"আমাদের ঢাকা-ভিত্তিক দল ঘণ্টার মধ্যে বাংলায় ও ইংরেজিতে সাড়া দেয়।"
    },
    cta: {
      title:"আপনার স্বপ্নের বাড়ি খুঁজতে প্রস্তুত?",
      sub:"হাজার হাজার ভাড়াটেদের সাথে যোগ দিন যারা ফেসবুক নয়, বাশাবাড়িতে বাড়ি পেয়েছেন।",
      btn:"সব লিস্টিং দেখুন",
      landlordTitle:"আপনি কি বাড়িওয়ালা?",
      landlordSub:"বিনামূল্যে আপনার সম্পত্তি তালিকাভুক্ত করুন এবং হাজার হাজার যাচাইকৃত ভাড়াটেদের কাছে পৌঁছান।",
      landlordBtn:"বিনামূল্যে লিস্টিং দিন"
    },
    footer: {
      tag:"আপনার স্বপ্নের বাড়ি খুঁজুন", company:"কোম্পানি", about:"আমাদের সম্পর্কে", careers:"ক্যারিয়ার", press:"প্রেস", blog:"ব্লগ",
      support:"সহায়তা", help:"হেল্প সেন্টার", safety:"নিরাপত্তা টিপস", contact:"যোগাযোগ",
      legal:"আইনি", privacy:"গোপনীয়তা নীতি", terms:"সেবার শর্ত",
      rights:"© ২০২৫ বাশাবাড়ি। সর্বস্বত্ব সংরক্ষিত।", made:"বাংলাদেশের জন্য ❤️ দিয়ে তৈরি"
    },
    auth: {
      loginTitle:"স্বাগতম", loginSub:"আপনার বাশাবাড়ি অ্যাকাউন্টে সাইন ইন করুন",
      signupTitle:"অ্যাকাউন্ট তৈরি করুন", signupSub:"হাজার হাজার মানুষের সাথে যোগ দিন",
      email:"ইমেইল ঠিকানা", password:"পাসওয়ার্ড", name:"পুরো নাম", phone:"ফোন নম্বর",
      loginBtn:"সাইন ইন", signupBtn:"অ্যাকাউন্ট তৈরি করুন",
      toSignup:"অ্যাকাউন্ট নেই? সাইন আপ করুন →", toLogin:"অ্যাকাউন্ট আছে? সাইন ইন করুন →",
      forgotPw:"পাসওয়ার্ড ভুলে গেছেন?", orContinue:"অথবা দিয়ে চালিয়ে যান"
    },
    dashboard: {
      title:"আমার ড্যাশবোর্ড", sub:"আপনার লিস্টিং এবং অ্যাকাউন্ট কার্যক্রম পরিচালনা করুন",
      myListings:"আমার লিস্টিং", savedHomes:"সেভ করা বাড়ি", messages:"বার্তা", settings:"সেটিংস",
      addListing:"নতুন লিস্টিং যোগ করুন", activeListings:"সক্রিয় লিস্টিং", totalViews:"মোট ভিউ",
      savedBy:"অন্যরা সেভ করেছে", responseRate:"রেসপন্স রেট", noListings:"এখনো কোনো লিস্টিং নেই।",
      noListingsSub:"আপনার প্রথম সম্পত্তি পোস্ট করুন এবং অনুসন্ধান পেতে শুরু করুন।"
    },
    saved: {
      title:"আপনার সেভ করা বাড়ি", sub:"যে বাড়িগুলো আপনি পরে দেখার জন্য বুকমার্ক করেছেন",
      empty:"এখনো কোনো বাড়ি সেভ করা হয়নি", emptySub:"লিস্টিং ব্রাউজ করুন এবং ♡ চাপুন — সেগুলো এখানে দেখা যাবে।"
    },
    notFound: { title:"পথ হারিয়ে ফেলেছেন?", sub:"এই পেজটি নেই বা সরিয়ে নেওয়া হয়েছে।", btn:"হোমে ফিরুন" }
  }
};

/* =========================================================
   MOCK DATA
   ========================================================= */
const PROPERTIES = [
  { id:1, title:"Modern 3BR Apartment in Gulshan 2", titleBn:"গুলশান ২-এ আধুনিক ৩ বেডরুম অ্যাপার্টমেন্ট", area:"Gulshan 2, Dhaka", areaBn:"গুলশান ২, ঢাকা", price:45000, beds:3, baths:2, sqft:1800, type:"apartment", typeBn:"অ্যাপার্টমেন্ট", verified:true, rating:4.9, reviews:24, landlord:{ name:"Rafiqul Islam", nameBn:"রফিকুল ইসলাম", avatar:"RI", phone:"+8801711234567", verified:true, listed:12, respTime:"~2 hours", respTimeBn:"~২ ঘণ্টা" }, amenities:["wifi","parking","generator","security","gym","lift"], desc:"Beautifully maintained in the heart of Gulshan 2, walking distance from Circle 2. Marble flooring, modular kitchen, split ACs in all rooms, 24/7 security and dedicated parking. Ideal for corporate families and expats.", descBn:"গুলশান ২-এর কেন্দ্রে সুন্দরভাবে রক্ষণাবেক্ষণ করা ফ্ল্যাট। মার্বেল মেঝে, মডুলার রান্নাঘর, সব ঘরে স্প্লিট এসি এবং ২৪/৭ নিরাপত্তা।", img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&auto=format&fit=crop&q=70", tags:["furnished","family"] },
  { id:2, title:"Cozy Bachelor Flat in Dhanmondi", titleBn:"ধানমন্ডিতে আরামদায়ক ব্যাচেলর ফ্ল্যাট", area:"Dhanmondi R/A, Dhaka", areaBn:"ধানমন্ডি আ/এ, ঢাকা", price:18000, beds:1, baths:1, sqft:750, type:"bachelor", typeBn:"ব্যাচেলর", verified:true, rating:4.7, reviews:18, landlord:{ name:"Nazmul Hossain", nameBn:"নাজমুল হোসেন", avatar:"NH", phone:"+8801812345678", verified:true, listed:5, respTime:"~1 hour", respTimeBn:"~১ ঘণ্টা" }, amenities:["wifi","generator","security"], desc:"Perfect for working professionals or students. Dhanmondi Road 8, sunny south-facing flat with easy access to shopping, cafes, and bus routes. Tiled bathroom, functional kitchen, semi-furnished.", descBn:"কর্মজীবী বা শিক্ষার্থীদের জন্য আদর্শ। ধানমন্ডি রোড ৮, দক্ষিণমুখী উজ্জ্বল ফ্ল্যাট।", img:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&auto=format&fit=crop&q=70", tags:["bachelor","semi-furnished"] },
  { id:3, title:"Spacious Family Home, Mirpur DOHS", titleBn:"মিরপুর ডিওএইচএস-এ প্রশস্ত পারিবারিক বাড়ি", area:"Mirpur DOHS, Dhaka", areaBn:"মিরপুর ডিওএইচএস, ঢাকা", price:55000, beds:4, baths:3, sqft:2400, type:"house", typeBn:"বাড়ি", verified:true, rating:4.8, reviews:31, landlord:{ name:"Shirin Akter", nameBn:"শিরিন আক্তার", avatar:"SA", phone:"+8801911234567", verified:true, listed:3, respTime:"~3 hours", respTimeBn:"~৩ ঘণ্টা" }, amenities:["wifi","parking","generator","security","garden"], desc:"Stunning 4-bedroom house with private rooftop, spacious living areas, fully equipped kitchen and a lush garden terrace. Quiet, gated community with round-the-clock security. Ideal for large families.", descBn:"চমৎকার ৪ বেডরুমের বাড়ি সাথে ব্যক্তিগত ছাদ, প্রশস্ত বসার জায়গা এবং সবুজ বাগান। গেটেড কমিউনিটি।", img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&auto=format&fit=crop&q=70", tags:["family","garden"] },
  { id:4, title:"Premium Studio, Banani", titleBn:"বনানীতে প্রিমিয়াম স্টুডিও", area:"Banani, Dhaka", areaBn:"বনানী, ঢাকা", price:22000, beds:1, baths:1, sqft:650, type:"sublet", typeBn:"সাবলেট", verified:false, rating:4.5, reviews:9, landlord:{ name:"Farhan Ahmed", nameBn:"ফারহান আহমেদ", avatar:"FA", phone:"+8801612345678", verified:false, listed:2, respTime:"~5 hours", respTimeBn:"~৫ ঘণ্টা" }, amenities:["wifi","generator","security","lift"], desc:"Fully furnished studio in Banani — perfect for expats and corporate professionals. Modern interiors, high-speed fibre internet, smart TV, and walking distance to Banani Lake and restaurants.", descBn:"বনানীতে সম্পূর্ণ আসবাবপত্র সহ স্টুডিও। প্রবাসী ও কর্পোরেট পেশাদারদের জন্য আদর্শ।", img:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&auto=format&fit=crop&q=70", tags:["furnished","bachelor"] },
  { id:5, title:"Family Flat, Uttara Sector 7", titleBn:"উত্তরা সেক্টর ৭-এ পারিবারিক ফ্ল্যাট", area:"Uttara Sector 7, Dhaka", areaBn:"উত্তরা সেক্টর ৭, ঢাকা", price:28000, beds:3, baths:2, sqft:1400, type:"apartment", typeBn:"অ্যাপার্টমেন্ট", verified:true, rating:4.6, reviews:15, landlord:{ name:"Karim Uddin", nameBn:"করিম উদ্দিন", avatar:"KU", phone:"+8801511234567", verified:true, listed:7, respTime:"~2 hours", respTimeBn:"~২ ঘণ্টা" }, amenities:["wifi","parking","generator","security"], desc:"Well-maintained family flat in Uttara Sector 7, close to model schools and Uttara town centre. Quiet residential block with 24/7 security, dedicated parking, and a helpful building manager.", descBn:"উত্তরা সেক্টর ৭-এ সুন্দর পারিবারিক ফ্ল্যাট। স্কুল ও শপিং সেন্টারের কাছে।", img:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&auto=format&fit=crop&q=70", tags:["family"] },
  { id:6, title:"Budget Room, Mohammadpur", titleBn:"মোহাম্মদপুরে সাশ্রয়ী রুম", area:"Mohammadpur, Dhaka", areaBn:"মোহাম্মদপুর, ঢাকা", price:9000, beds:1, baths:1, sqft:380, type:"sublet", typeBn:"সাবলেট", verified:true, rating:4.3, reviews:7, landlord:{ name:"Taslima Begum", nameBn:"তাসলিমা বেগম", avatar:"TB", phone:"+8801311234567", verified:true, listed:1, respTime:"~4 hours", respTimeBn:"~৪ ঘণ্টা" }, amenities:["wifi","generator"], desc:"Great value for students and fresh graduates. Shared kitchen and bathroom with 2 other tenants in a calm, clean building. Walking distance to Mohammadpur bus stand and markets.", descBn:"শিক্ষার্থী ও নতুন গ্র্যাজুয়েটদের জন্য সাশ্রয়ী রুম। পরিষ্কার ও শান্ত পরিবেশ।", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&auto=format&fit=crop&q=70", tags:["bachelor","budget"] }
];

const TESTIMONIALS = [
  { name:"Tanvir Rahman", nameBn:"তানভীর রহমান", role:"Software Engineer, Dhaka", roleBn:"সফটওয়্যার ইঞ্জিনিয়ার, ঢাকা", avatar:"TR", rating:5, text:"Found my flat in Bashundhara within 3 days. Bashabari saved me from months of scrolling through chaotic Facebook groups. The verified landlord feature gave me real peace of mind.", textBn:"৩ দিনের মধ্যে বসুন্ধরায় ফ্ল্যাট পেয়েছি। ফেসবুকের বিশৃঙ্খল গ্রুপে মাসের পর মাস স্ক্রোল থেকে বাশাবাড়ি আমাকে বাঁচিয়েছে।" },
  { name:"Nusrat Jahan", nameBn:"নুসরাত জাহান", role:"University Lecturer, Dhanmondi", roleBn:"বিশ্ববিদ্যালয় শিক্ষিকা, ধানমন্ডি", avatar:"NJ", rating:5, text:"As a single woman, safety was my top concern. Bashabari's verified landlords and secure contact system made the whole process feel dignified and stress-free.", textBn:"একজন একক নারী হিসেবে নিরাপত্তাই ছিল আমার সর্বোচ্চ উদ্বেগ। বাশাবাড়ির সুরক্ষিত যোগাযোগ পুরো প্রক্রিয়াটিকে মর্যাদাপূর্ণ করে তুলেছে।" },
  { name:"Rahim Chowdhury", nameBn:"রহিম চৌধুরী", role:"Business Owner, Gulshan", roleBn:"ব্যবসায়ী, গুলশান", avatar:"RC", rating:5, text:"Listed my 3 properties in under 10 minutes. The dashboard is clean, enquiries come fast, and I filled all vacancies within 2 weeks. Outstanding platform for landlords.", textBn:"১০ মিনিটেরও কম সময়ে ৩টি সম্পত্তি তালিকাভুক্ত করেছি। ২ সপ্তাহেই সব খালি জায়গা পূর্ণ হয়েছে।" }
];

/* =========================================================
   UTILS
   ========================================================= */
const fmt = (n) => `৳ ${n.toLocaleString('en-BD')}`;
const fmtBn = (n) => `৳ ${n.toLocaleString('bn-BD')}`;

const AMENITY_ICONS = {
  wifi: { icon: Wifi, label:"Wi-Fi", labelBn:"ওয়াই-ফাই" },
  parking: { icon: Car, label:"Parking", labelBn:"পার্কিং" },
  generator: { icon: Zap, label:"Generator", labelBn:"জেনারেটর" },
  security: { icon: Shield, label:"Security", labelBn:"নিরাপত্তা" },
  gym: { icon: Award, label:"Gym", labelBn:"জিম" },
  lift: { icon: Layers, label:"Lift", labelBn:"লিফট" },
  garden: { icon: Trees, label:"Garden", labelBn:"বাগান" }
};

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */
function BashaLogo({ size = 32, light = true }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#1e3a8a"/>
        <path d="M10 22 L20 11 L30 22" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <rect x="14" y="22" width="12" height="9" rx="1.5" fill="#1e40af"/>
        <rect x="17.5" y="25" width="5" height="6" rx="1" fill="#93c5fd"/>
        <circle cx="29" cy="15" r="4" fill="#3b82f6" opacity="0.6"/>
        <text x="27.5" y="18" fill="white" fontSize="6" fontWeight="800" fontFamily="sans-serif">B</text>
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:1 }}>
          <span style={{ color: light ? "white":"#0f172a", fontSize: size*0.44, fontWeight:700, letterSpacing:"0.5px", fontFamily:"'DM Sans',sans-serif" }}>BASHA</span>
          <span style={{ color: "#60a5fa", fontSize: size*0.44, fontWeight:800, letterSpacing:"0.5px", fontFamily:"'DM Sans',sans-serif" }}>BARI</span>
        </div>
        <div style={{ color: light ? "rgba(255,255,255,0.45)" : "#94a3b8", fontSize: size*0.22, letterSpacing:"1.5px", fontWeight:500, textTransform:"uppercase", marginTop:1 }}>Find Your Perfect Home</div>
      </div>
    </div>
  );
}

function LanguageToggle({ lang, setLang, light = true }) {
  return (
    <div className={`lang-toggle${light?"":" lang-toggle-light"}`}>
      <button className={`lang-option${light?"":" lang-option-light"}${lang==="en"?" active":""}`} onClick={()=>setLang("en")}>EN</button>
      <button className={`lang-option${light?"":" lang-option-light"}${lang==="bn"?" active":""}`} onClick={()=>setLang("bn")}>বাংলা</button>
    </div>
  );
}

function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

function Stars({ n }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={13} style={{ color: i<=n ? "#f59e0b":"#e2e8f0", fill: i<=n?"#f59e0b":"none" }}/>
      ))}
    </div>
  );
}

/* =========================================================
   PROPERTY CARD
   ========================================================= */
function PropertyCard({ prop, lang, saved, onSave, onView }) {
  const t = TR[lang];
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="prop-card card-lift" style={{ cursor:"pointer" }}>
      <div style={{ position:"relative" }} onClick={()=>onView(prop.id)}>
        {imgErr ? (
          <div className="prop-img-placeholder">
            <Building2 size={48} color="#93c5fd"/>
          </div>
        ) : (
          <img src={prop.img} alt={prop.title} className="prop-image" onError={()=>setImgErr(true)}/>
        )}
        <div style={{ position:"absolute", top:12, left:12, display:"flex", gap:6, flexWrap:"wrap" }}>
          {prop.verified && (
            <span className="verified-pill">
              <CheckCircle size={9}/> {t.listings.verified}
            </span>
          )}
          <span style={{ background:"rgba(15,23,42,0.75)", backdropFilter:"blur(6px)", color:"white", fontSize:"10.5px", fontWeight:600, padding:"3px 9px", borderRadius:20 }}>
            {lang==="bn" ? prop.typeBn : prop.type}
          </span>
        </div>
        <button
          onClick={e=>{ e.stopPropagation(); onSave(prop.id); }}
          style={{ position:"absolute", top:12, right:12, width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.92)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", boxShadow:"0 2px 8px rgba(0,0,0,0.15)" }}
        >
          {saved ? <Bookmark size={15} style={{ color:"#1e40af", fill:"#1e40af" }}/> : <Bookmark size={15} style={{ color:"#64748b" }}/>}
        </button>
      </div>

      <div style={{ padding:"18px 18px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <Stars n={prop.rating}/>
            <span style={{ fontSize:12, color:"#64748b", marginLeft:2 }}>{prop.rating} ({prop.reviews})</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            <div className="live-dot"/>
            <span style={{ fontSize:11, color:"#10b981", fontWeight:600 }}>{t.listings.available}</span>
          </div>
        </div>

        <h3 onClick={()=>onView(prop.id)} style={{ fontSize:15.5, fontWeight:700, color:"#0f172a", marginBottom:5, lineHeight:1.35, cursor:"pointer" }} className={lang==="bn"?"bn":""}>
          {lang==="bn" ? prop.titleBn : prop.title}
        </h3>

        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:12 }}>
          <MapPin size={12} color="#64748b"/>
          <span style={{ fontSize:12.5, color:"#64748b" }} className={lang==="bn"?"bn":""}>{lang==="bn" ? prop.areaBn : prop.area}</span>
        </div>

        <div style={{ display:"flex", gap:14, marginBottom:14, paddingTop:12, borderTop:"1px solid #f1f5f9" }}>
          {[
            { icon:Bed, val:prop.beds, label:t.listings.beds },
            { icon:Bath, val:prop.baths, label:t.listings.bath },
            { icon:FileText, val:prop.sqft, label:t.listings.sqft }
          ].map(({ icon:Icon, val, label })=>(
            <div key={label} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <Icon size={13} color="#94a3b8"/>
              <span style={{ fontSize:13, fontWeight:600, color:"#374151" }}>{val}</span>
              <span style={{ fontSize:12, color:"#9ca3af" }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span className="price-text" style={{ fontSize:20, fontWeight:800, letterSpacing:"-0.5px" }}>{fmt(prop.price)}</span>
            <span style={{ fontSize:12.5, color:"#94a3b8", fontWeight:400 }}>{t.listings.pm}</span>
          </div>
          <button
            onClick={()=>onView(prop.id)}
            className="btn-trans"
            style={{ background:"#1e40af", color:"white", padding:"8px 16px", borderRadius:10, fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:5 }}
          >
            {t.listings.viewDetails} <ArrowRight size={13}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NAVBAR
   ========================================================= */
function Navbar({ page, setPage, lang, setLang, isLoggedIn, setIsLoggedIn, savedCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = TR[lang].nav;

  return (
    <nav className="nav-glass" style={{ position:"fixed", top:0, left:0, right:0, zIndex:100 }}>
      <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        <button onClick={()=>setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <BashaLogo size={30} light={true}/>
        </button>

        <div className="hide-mob" style={{ display:"flex", alignItems:"center", gap:4 }}>
          {[["listings","listings"], ["saved","saved"], ...(isLoggedIn?[["dashboard","dashboard"]]:[])].map(([key,label])=>(
            <button key={key} onClick={()=>setPage(key)}
              className="btn-trans"
              style={{ padding:"8px 14px", borderRadius:10, fontSize:14, fontWeight:500, color: page===key ? "white":"rgba(255,255,255,0.65)", background: page===key ? "rgba(255,255,255,0.12)":"transparent", position:"relative" }}>
              {t[label]}
              {key==="saved" && savedCount>0 && <span style={{ position:"absolute", top:4, right:4, width:16, height:16, background:"#ef4444", borderRadius:"50%", fontSize:10, fontWeight:700, color:"white", display:"flex", alignItems:"center", justifyContent:"center" }}>{savedCount}</span>}
            </button>
          ))}
        </div>

        <div className="hide-mob" style={{ display:"flex", alignItems:"center", gap:12 }}>
          <LanguageToggle lang={lang} setLang={setLang}/>
          {isLoggedIn ? (
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <button onClick={()=>setPage("dashboard")} style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#1e40af,#3b82f6)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:700, fontSize:13 }}>U</button>
              <button onClick={()=>setIsLoggedIn(false)} className="btn-trans" style={{ color:"rgba(255,255,255,0.6)", fontSize:13, padding:"6px 10px", borderRadius:8 }}><LogOut size={15}/></button>
            </div>
          ) : (
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>setPage("login")} className="btn-trans" style={{ color:"rgba(255,255,255,0.75)", fontSize:14, fontWeight:500, padding:"8px 14px", borderRadius:10 }}>{t.login}</button>
              <button onClick={()=>setPage("signup")} className="btn-trans btn-glow" style={{ background:"#2563eb", color:"white", fontSize:13.5, fontWeight:600, padding:"9px 18px", borderRadius:11 }}>{t.signup}</button>
            </div>
          )}
        </div>

        <button className="show-mob" onClick={()=>setMenuOpen(!menuOpen)} style={{ color:"white", padding:8 }}>
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      {menuOpen && (
        <div className="slide-down" style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"16px 24px 20px", display:"flex", flexDirection:"column", gap:4 }}>
          {[["home","Home"], ["listings","Find a Home"], ["saved","Saved"], ...(isLoggedIn?[["dashboard","Dashboard"]]:[])] .map(([key,label])=>(
            <button key={key} onClick={()=>{ setPage(key); setMenuOpen(false); }}
              style={{ textAlign:"left", padding:"11px 14px", borderRadius:10, color:"rgba(255,255,255,0.8)", fontSize:15, fontWeight:500, background: page===key?"rgba(255,255,255,0.08)":"transparent" }}>
              {label}
            </button>
          ))}
          <div style={{ marginTop:8, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:8, alignItems:"center" }}>
            <LanguageToggle lang={lang} setLang={setLang}/>
            {!isLoggedIn && <button onClick={()=>{ setPage("login"); setMenuOpen(false); }} style={{ flex:1, background:"#2563eb", color:"white", padding:"10px 16px", borderRadius:11, fontSize:14, fontWeight:600 }}>Sign In</button>}
          </div>
        </div>
      )}
    </nav>
  );
}

/* =========================================================
   MOBILE BOTTOM NAV
   ========================================================= */
function MobileBottomNav({ page, setPage, savedCount }) {
  const items = [
    { key:"home", icon:Home, label:"Home" },
    { key:"listings", icon:Search, label:"Search" },
    { key:"saved", icon:Bookmark, label:"Saved", badge:savedCount },
    { key:"dashboard", icon:User, label:"Profile" }
  ];
  return (
    <div className="mobile-nav">
      {items.map(({ key, icon:Icon, label, badge })=>(
        <button key={key} onClick={()=>setPage(key)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"10px 4px", gap:4, position:"relative", background:"none", border:"none", cursor:"pointer" }}>
          <div style={{ position:"relative" }}>
            <Icon size={21} style={{ color: page===key ? "#1e40af" : "#94a3b8" }}/>
            {badge>0 && <span style={{ position:"absolute", top:-4, right:-5, width:15, height:15, background:"#ef4444", borderRadius:"50%", fontSize:9, fontWeight:700, color:"white", display:"flex", alignItems:"center", justifyContent:"center" }}>{badge}</span>}
          </div>
          <span style={{ fontSize:11, fontWeight: page===key?600:400, color: page===key?"#1e40af":"#94a3b8" }}>{label}</span>
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */
function Footer({ lang, setPage }) {
  const t = TR[lang].footer;
  const links = { [t.company]:[[t.about,null],[t.careers,null],[t.press,null],[t.blog,null]], [t.support]:[[t.help,null],[t.safety,null],[t.contact,null]], [t.legal]:[[t.privacy,null],[t.terms,null]] };
  return (
    <footer className="footer-bg" style={{ padding:"64px 24px 32px" }}>
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:48, marginBottom:48 }}>
          <div>
            <BashaLogo size={28} light={true}/>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, lineHeight:1.7, marginTop:16, maxWidth:220 }} className={lang==="bn"?"bn":""}>{t.tag}</p>
            <div style={{ display:"flex", gap:12, marginTop:20 }}>
              {["f","in","tw","yt"].map(s=>(
                <div key={s} style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.5)", fontSize:12, fontWeight:700 }}>{s}</div>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([section, items])=>(
            <div key={section}>
              <div style={{ color:"white", fontSize:13.5, fontWeight:700, marginBottom:16, letterSpacing:"0.3px" }} className={lang==="bn"?"bn":""}>{section}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {items.map(([label])=>(
                  <span key={label} style={{ color:"rgba(255,255,255,0.45)", fontSize:13.5, cursor:"pointer", transition:"color 0.2s" }} className={lang==="bn"?"bn":""} onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.8)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.45)"}>{label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }} className={lang==="bn"?"bn":""}>{t.rights}</span>
          <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }} className={lang==="bn"?"bn":""}>{t.made}</span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   HOME PAGE
   ========================================================= */
function HomePage({ lang, setPage, savedIds, onSave }) {
  const t = TR[lang];
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter==="all" ? PROPERTIES : PROPERTIES.filter(p=>p.type===activeFilter);

  return (
    <div className="page-wrap" style={{ paddingTop:64 }}>
      {/* HERO */}
      <section className="hero-bg" style={{ padding:"88px 24px 72px", minHeight:"82vh", display:"flex", alignItems:"center" }}>
        <div className="hero-dots"/>
        <div style={{ maxWidth:860, margin:"0 auto", width:"100%", position:"relative", zIndex:1, textAlign:"center" }}>
          <div className="fade-up d1 section-chip" style={{ marginBottom:24 }}>
            <div className="live-dot"/>
            <span className={lang==="bn"?"bn":""}>{t.hero.badge}</span>
          </div>

          <h1 className={`fade-up d2 display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(36px,6vw,66px)", fontWeight:800, color:"white", lineHeight:1.12, marginBottom:24, letterSpacing:"-1px" }}>
            {t.hero.title1}{" "}
            <span style={{ background:"linear-gradient(135deg,#60a5fa,#a5f3fc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              {t.hero.titleGrad}
            </span>
          </h1>

          <p className={`fade-up d3${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(15px,2.5vw,18px)", color:"rgba(255,255,255,0.65)", lineHeight:1.75, marginBottom:40, maxWidth:640, marginLeft:"auto", marginRight:"auto" }}>
            {t.hero.sub}
          </p>

          <div className="fade-up d4 search-bar" style={{ display:"flex", alignItems:"center", maxWidth:700, margin:"0 auto 40px", padding:"6px 6px 6px 20px" }}>
            <Search size={18} color="#94a3b8" style={{ flexShrink:0 }}/>
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder={t.hero.ph}
              className={lang==="bn"?"bn":""}
              style={{ flex:1, border:"none", outline:"none", fontSize:15, color:"#0f172a", padding:"10px 14px", background:"transparent" }}
            />
            <button
              onClick={()=>setPage("listings")}
              className="btn-trans btn-glow"
              style={{ background:"#1e40af", color:"white", padding:"12px 26px", borderRadius:13, fontSize:14.5, fontWeight:700, whiteSpace:"nowrap" }}
            >
              <span className={lang==="bn"?"bn":""}>{t.hero.btn}</span>
            </button>
          </div>

          <div className="fade-up d5" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            {[
              [t.hero.s1v, t.hero.s1l],
              [t.hero.s2v, t.hero.s2l],
              [t.hero.s3v, t.hero.s3l],
              [t.hero.s4v, t.hero.s4l]
            ].map(([val,label])=>(
              <div key={label} className="hero-stat">
                <div className={`stat-num${lang==="bn"?" bn":""}`}>{val}</div>
                <div className={`stat-label${lang==="bn"?" bn":""}`}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section style={{ padding:"80px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:1240, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div className="section-chip" style={{ marginBottom:16 }}><Building2 size={14}/> <span className={lang==="bn"?"bn":""}>{t.listings.title}</span></div>
            <h2 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:"#0f172a", marginBottom:12, letterSpacing:"-0.5px" }}>{t.listings.title}</h2>
            <p style={{ color:"#64748b", fontSize:16, maxWidth:500, margin:"0 auto" }} className={lang==="bn"?"bn":""}>{t.listings.sub}</p>
          </div>

          {/* Filters */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:36 }}>
            {Object.entries(t.filters).map(([key,label])=>(
              <button key={key} onClick={()=>setActiveFilter(key)} className={`filter-chip${activeFilter===key?" active":""} ${lang==="bn"?"bn":""}`}>{label}</button>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:24, marginBottom:44 }}>
            {filtered.map(prop=>(
              <PropertyCard key={prop.id} prop={prop} lang={lang} saved={savedIds.includes(prop.id)} onSave={onSave} onView={()=>{}}/>
            ))}
          </div>

          <div style={{ textAlign:"center" }}>
            <button onClick={()=>setPage("listings")} className="btn-trans btn-glow" style={{ background:"#1e40af", color:"white", padding:"14px 36px", borderRadius:14, fontSize:15, fontWeight:700, display:"inline-flex", alignItems:"center", gap:8 }}>
              <span className={lang==="bn"?"bn":""}>{t.listings.viewAll}</span> <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      </section>

      {/* STATS DARK SECTION */}
      <section style={{ background:"linear-gradient(150deg,#0a1628 0%,#1e3a8a 100%)", padding:"72px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-20%", right:"-5%", width:400, height:400, background:"radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1240, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <h2 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:"white", marginBottom:14, letterSpacing:"-0.5px" }}>{t.stats.title}</h2>
            <p style={{ color:"rgba(255,255,255,0.55)", fontSize:16, maxWidth:520, margin:"0 auto" }} className={lang==="bn"?"bn":""}>{t.stats.sub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20 }}>
            {[
              { val:"12,000+", label:"Happy Renters", labelBn:"সুখী ভাড়াটে", icon:Users },
              { val:"3,200+", label:"Active Listings", labelBn:"সক্রিয় লিস্টিং", icon:Building2 },
              { val:"840+", label:"Verified Landlords", labelBn:"যাচাইকৃত বাড়িওয়ালা", icon:BadgeCheck },
              { val:"32", label:"Areas Covered", labelBn:"এলাকা কভার", icon:MapPin },
            ].map(({ val, label, labelBn, icon:Icon })=>(
              <div key={label} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:18, padding:"28px 24px", textAlign:"center" }}>
                <Icon size={22} color="#60a5fa" style={{ marginBottom:12 }}/>
                <div style={{ fontSize:38, fontWeight:900, color:"white", letterSpacing:"-1.5px", lineHeight:1 }}>{val}</div>
                <div style={{ fontSize:13.5, color:"rgba(255,255,255,0.5)", marginTop:8, fontWeight:400 }} className={lang==="bn"?"bn":""}>{lang==="bn"?labelBn:label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"80px 24px", background:"white" }}>
        <div style={{ maxWidth:1240, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-chip" style={{ marginBottom:16 }}><Star size={14}/> <span className={lang==="bn"?"bn":""}>{t.testimonials.title}</span></div>
            <h2 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:"#0f172a", marginBottom:12, letterSpacing:"-0.5px" }}>{t.testimonials.title}</h2>
            <p style={{ color:"#64748b", fontSize:16 }} className={lang==="bn"?"bn":""}>{t.testimonials.sub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
            {TESTIMONIALS.map(tm=>(
              <div key={tm.name} className="testimonial-card">
                <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:18 }}>
                  <div className="avatar avatar-lg">{tm.avatar}</div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, color:"#0f172a" }} className={lang==="bn"?"bn":""}>{lang==="bn"?tm.nameBn:tm.name}</div>
                    <div style={{ fontSize:12.5, color:"#64748b", marginTop:2 }} className={lang==="bn"?"bn":""}>{lang==="bn"?tm.roleBn:tm.role}</div>
                  </div>
                  <div style={{ marginLeft:"auto" }}><Stars n={tm.rating}/></div>
                </div>
                <p style={{ fontSize:14.5, color:"#475569", lineHeight:1.72, fontStyle:"italic" }} className={lang==="bn"?"bn":""}>&ldquo;{lang==="bn"?tm.textBn:tm.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{ padding:"72px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:1240, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-chip" style={{ marginBottom:16 }}><Shield size={14}/> <span className={lang==="bn"?"bn":""}>{t.trust.title}</span></div>
            <h2 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, color:"#0f172a", letterSpacing:"-0.5px" }}>{t.trust.title}</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
            {[
              { icon:BadgeCheck, color:"#dbeafe", iconColor:"#2563eb", title:t.trust.t1, desc:t.trust.d1 },
              { icon:Shield, color:"#d1fae5", iconColor:"#059669", title:t.trust.t2, desc:t.trust.d2 },
              { icon:Zap, color:"#fef3c7", iconColor:"#d97706", title:t.trust.t3, desc:t.trust.d3 },
              { icon:Users, color:"#fce7f3", iconColor:"#db2777", title:t.trust.t4, desc:t.trust.d4 }
            ].map(({ icon:Icon, color, iconColor, title, desc })=>(
              <div key={title} className="trust-card">
                <div className="trust-icon-wrap" style={{ background:color }}>
                  <Icon size={24} color={iconColor}/>
                </div>
                <h3 style={{ fontSize:16.5, fontWeight:700, color:"#0f172a", marginBottom:10 }} className={lang==="bn"?"bn":""}>{title}</h3>
                <p style={{ fontSize:14, color:"#64748b", lineHeight:1.7 }} className={lang==="bn"?"bn":""}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{ padding:"72px 24px" }}>
        <div style={{ maxWidth:1240, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:40 }}>
            <div>
              <h2 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:800, color:"white", marginBottom:14, letterSpacing:"-0.5px" }}>{t.cta.title}</h2>
              <p style={{ color:"rgba(255,255,255,0.6)", fontSize:16, marginBottom:28, lineHeight:1.7 }} className={lang==="bn"?"bn":""}>{t.cta.sub}</p>
              <button onClick={()=>setPage("listings")} className="btn-trans btn-glow" style={{ background:"white", color:"#1e40af", padding:"14px 32px", borderRadius:14, fontSize:15, fontWeight:700, display:"inline-flex", alignItems:"center", gap:8 }}>
                <span className={lang==="bn"?"bn":""}>{t.cta.btn}</span> <ArrowRight size={16}/>
              </button>
            </div>
            <div style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.11)", borderRadius:22, padding:"32px 28px" }}>
              <Building2 size={28} color="#60a5fa" style={{ marginBottom:16 }}/>
              <h3 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"white", marginBottom:12 }}>{t.cta.landlordTitle}</h3>
              <p style={{ color:"rgba(255,255,255,0.55)", fontSize:15, marginBottom:24, lineHeight:1.7 }} className={lang==="bn"?"bn":""}>{t.cta.landlordSub}</p>
              <button onClick={()=>setPage("signup")} className="btn-trans" style={{ background:"#2563eb", color:"white", padding:"13px 24px", borderRadius:12, fontSize:14.5, fontWeight:700, width:"100%" }}>
                <span className={lang==="bn"?"bn":""}>{t.cta.landlordBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} setPage={setPage}/>
    </div>
  );
}

/* =========================================================
   LISTINGS PAGE
   ========================================================= */
function ListingsPage({ lang, savedIds, onSave, setPage, setDetailId }) {
  const t = TR[lang];
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ const timer = setTimeout(()=>setLoading(false), 900); return ()=>clearTimeout(timer); }, []);

  const results = PROPERTIES.filter(p=>{
    const qLower = query.toLowerCase();
    const matchQ = !query || p.area.toLowerCase().includes(qLower) || p.title.toLowerCase().includes(qLower);
    const matchT = activeType==="all" || p.type===activeType;
    const matchP = p.price <= maxPrice;
    return matchQ && matchT && matchP;
  });

  return (
    <div className="page-wrap" style={{ paddingTop:64, minHeight:"100vh", background:"#f8fafc" }}>
      {/* Search header */}
      <div style={{ background:"white", borderBottom:"1px solid #f1f5f9", padding:"20px 24px" }}>
        <div style={{ maxWidth:1240, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:16 }}>
            <div style={{ flex:1, display:"flex", alignItems:"center", gap:10, background:"#f8fafc", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"10px 16px" }}>
              <Search size={16} color="#94a3b8"/>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.hero.ph} className={lang==="bn"?"bn":""} style={{ flex:1, border:"none", outline:"none", fontSize:14.5, color:"#0f172a", background:"transparent" }}/>
              {query && <button onClick={()=>setQuery("")}><X size={14} color="#94a3b8"/></button>}
            </div>
            <button onClick={()=>setShowFilters(!showFilters)} className="btn-trans" style={{ background: showFilters?"#1e40af":"white", color: showFilters?"white":"#374151", border:"1.5px solid", borderColor: showFilters?"#1e40af":"#e2e8f0", padding:"10px 16px", borderRadius:12, display:"flex", alignItems:"center", gap:7, fontSize:14, fontWeight:500 }}>
              <SlidersHorizontal size={15}/> Filters
            </button>
          </div>

          {showFilters && (
            <div className="slide-down" style={{ background:"#f8fafc", borderRadius:14, padding:"16px 18px", border:"1px solid #e2e8f0", marginBottom:4 }}>
              <div style={{ display:"flex", gap:24, flexWrap:"wrap", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"#374151", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>Property Type</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {Object.entries(t.filters).map(([k,v])=>(
                      <button key={k} onClick={()=>setActiveType(k)} className={`filter-chip${activeType===k?" active":""} ${lang==="bn"?"bn":""}`} style={{ padding:"5px 14px", fontSize:12.5 }}>{v}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"#374151", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>Max Price: {fmt(maxPrice)}</div>
                  <input type="range" min={5000} max={100000} step={1000} value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} style={{ width:200, accentColor:"#2563eb" }}/>
                </div>
              </div>
            </div>
          )}

          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {Object.entries(t.filters).map(([k,v])=>(
              <button key={k} onClick={()=>setActiveType(k)} className={`filter-chip${activeType===k?" active":""} ${lang==="bn"?"bn":""}`}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1240, margin:"0 auto", padding:"32px 24px 80px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div style={{ fontSize:15, color:"#374151", fontWeight:500 }}>{results.length} homes found</div>
        </div>

        {loading ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:24 }}>
            {[1,2,3,4,5,6].map(i=>(
              <div key={i} style={{ background:"white", borderRadius:20, overflow:"hidden", border:"1px solid #f1f5f9" }}>
                <div className="skeleton" style={{ height:216, borderRadius:0 }}/>
                <div style={{ padding:18 }}>
                  <div className="skeleton" style={{ height:16, width:"70%", marginBottom:10 }}/>
                  <div className="skeleton" style={{ height:13, width:"50%", marginBottom:16 }}/>
                  <div className="skeleton" style={{ height:13, width:"90%", marginBottom:10 }}/>
                  <div className="skeleton" style={{ height:36, marginTop:16 }}/>
                </div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 24px" }}>
            <Search size={48} color="#cbd5e1" style={{ marginBottom:16 }}/>
            <h3 style={{ fontSize:20, fontWeight:700, color:"#374151", marginBottom:8 }}>No homes found</h3>
            <p style={{ color:"#94a3b8", fontSize:15 }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:24 }}>
            {results.map(prop=>(
              <PropertyCard key={prop.id} prop={prop} lang={lang} saved={savedIds.includes(prop.id)} onSave={onSave} onView={(id)=>{ setDetailId(id); setPage("property"); }}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROPERTY DETAIL PAGE
   ========================================================= */
function PropertyDetailPage({ propId, lang, savedIds, onSave, setPage }) {
  const t = TR[lang].property;
  const prop = PROPERTIES.find(p=>p.id===propId) || PROPERTIES[0];
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="page-wrap" style={{ paddingTop:64, minHeight:"100vh", background:"#f8fafc" }}>
      {/* Back button */}
      <div style={{ background:"white", borderBottom:"1px solid #f1f5f9", padding:"14px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <button onClick={()=>setPage("listings")} style={{ display:"flex", alignItems:"center", gap:7, color:"#374151", fontSize:14, fontWeight:500, background:"none", border:"none", cursor:"pointer" }}>
            <ChevronLeft size={17}/> <span className={lang==="bn"?"bn":""}>{t.backToListings}</span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px 80px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:32 }}>
          {/* Left */}
          <div>
            {/* Image */}
            {imgErr ? (
              <div style={{ height:420, background:"linear-gradient(135deg,#dbeafe,#bfdbfe)", borderRadius:22, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:28 }}>
                <Building2 size={64} color="#93c5fd"/>
              </div>
            ) : (
              <img src={prop.img} alt={prop.title} onError={()=>setImgErr(true)} style={{ width:"100%", height:420, objectFit:"cover", borderRadius:22, display:"block", marginBottom:28 }}/>
            )}

            {/* Header info */}
            <div style={{ background:"white", borderRadius:20, padding:"28px", border:"1px solid #f1f5f9", marginBottom:20 }}>
              <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                {prop.verified && <span className="verified-pill"><CheckCircle size={9}/> {TR[lang].listings.verified}</span>}
                <span style={{ background:"#f1f5f9", color:"#374151", fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:20 }}>{lang==="bn"?prop.typeBn:prop.type}</span>
              </div>
              <h1 className={lang==="bn"?"bn":""} style={{ fontSize:"clamp(22px,3vw,30px)", fontWeight:800, color:"#0f172a", marginBottom:10, letterSpacing:"-0.5px" }}>
                {lang==="bn"?prop.titleBn:prop.title}
              </h1>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:16 }}>
                <MapPin size={14} color="#64748b"/><span style={{ fontSize:14.5, color:"#64748b" }} className={lang==="bn"?"bn":""}>{lang==="bn"?prop.areaBn:prop.area}</span>
                <span style={{ margin:"0 8px", color:"#e2e8f0" }}>·</span>
                <Stars n={prop.rating}/>
                <span style={{ fontSize:13, color:"#64748b" }}>{prop.rating} ({prop.reviews} reviews)</span>
              </div>
              <div style={{ display:"flex", gap:20, padding:"16px 0", borderTop:"1px solid #f1f5f9", borderBottom:"1px solid #f1f5f9", marginBottom:16 }}>
                {[{I:Bed,v:prop.beds,l:"beds"},{I:Bath,v:prop.baths,l:"bath"},{I:FileText,v:prop.sqft,l:"sqft"}].map(({I,v,l})=>(
                  <div key={l} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <I size={18} color="#3b82f6"/>
                    <span style={{ fontSize:16, fontWeight:700, color:"#0f172a" }}>{v}</span>
                    <span style={{ fontSize:13, color:"#64748b" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                <span className="price-text" style={{ fontSize:30, fontWeight:900, letterSpacing:"-1px" }}>{fmt(prop.price)}</span>
                <span style={{ color:"#94a3b8", fontSize:14 }}>{TR[lang].listings.pm}</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ background:"white", borderRadius:20, padding:"28px", border:"1px solid #f1f5f9", marginBottom:20 }}>
              <h3 style={{ fontSize:17, fontWeight:700, color:"#0f172a", marginBottom:14 }} className={lang==="bn"?"bn":""}>{t.desc}</h3>
              <p style={{ fontSize:15, color:"#475569", lineHeight:1.8 }} className={lang==="bn"?"bn":""}>{lang==="bn"?prop.descBn:prop.desc}</p>
            </div>

            {/* Amenities */}
            <div style={{ background:"white", borderRadius:20, padding:"28px", border:"1px solid #f1f5f9", marginBottom:20 }}>
              <h3 style={{ fontSize:17, fontWeight:700, color:"#0f172a", marginBottom:18 }} className={lang==="bn"?"bn":""}>{t.amenities}</h3>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {prop.amenities.map(a=>{
                  const info = AMENITY_ICONS[a];
                  if (!info) return null;
                  const Icon = info.icon;
                  return (
                    <div key={a} style={{ display:"flex", alignItems:"center", gap:8, background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:12, padding:"10px 16px" }}>
                      <Icon size={16} color="#0284c7"/>
                      <span style={{ fontSize:13.5, fontWeight:500, color:"#0369a1" }} className={lang==="bn"?"bn":""}>{lang==="bn"?info.labelBn:info.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div>
            {/* Landlord card */}
            <div style={{ background:"white", borderRadius:20, padding:"28px", border:"1px solid #f1f5f9", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", position:"sticky", top:84 }}>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#0f172a", marginBottom:20 }} className={lang==="bn"?"bn":""}>{t.landlord}</h3>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, paddingBottom:20, borderBottom:"1px solid #f1f5f9" }}>
                <div className="avatar avatar-xl">{prop.landlord.avatar}</div>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:16, fontWeight:700, color:"#0f172a" }} className={lang==="bn"?"bn":""}>{lang==="bn"?prop.landlord.nameBn:prop.landlord.name}</span>
                    {prop.landlord.verified && <BadgeCheck size={16} color="#2563eb"/>}
                  </div>
                  <div style={{ fontSize:13, color:"#64748b", marginTop:3 }}>{prop.landlord.listed} properties listed</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginBottom:10 }}>
                <div style={{ flex:1, background:"#f8fafc", borderRadius:12, padding:"12px", textAlign:"center" }}>
                  <Clock size={16} color="#64748b" style={{ marginBottom:4 }}/>
                  <div style={{ fontSize:11, color:"#94a3b8", fontWeight:500 }}>Response Time</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#374151", marginTop:3 }}>{lang==="bn"?prop.landlord.respTimeBn:prop.landlord.respTime}</div>
                </div>
                <div style={{ flex:1, background:"#f8fafc", borderRadius:12, padding:"12px", textAlign:"center" }}>
                  <Building2 size={16} color="#64748b" style={{ marginBottom:4 }}/>
                  <div style={{ fontSize:11, color:"#94a3b8", fontWeight:500 }}>Listed</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#374151", marginTop:3 }}>{prop.landlord.listed} homes</div>
                </div>
              </div>

              <a href={`https://wa.me/${prop.landlord.phone.replace(/[^0-9]/g,"")}`} target="_blank" rel="noreferrer" className="wapp-btn btn-trans" style={{ width:"100%", justifyContent:"center", marginBottom:10, borderRadius:12, display:"flex", textDecoration:"none" }}>
                <MessageCircle size={16}/> <span className={lang==="bn"?"bn":""}>{t.contactViaWa}</span>
              </a>
              <a href={`tel:${prop.landlord.phone}`} className="btn-trans" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"12px", borderRadius:12, border:"1.5px solid #e2e8f0", fontSize:14.5, fontWeight:600, color:"#374151", textDecoration:"none" }}>
                <Phone size={15}/> <span className={lang==="bn"?"bn":""}>{t.callNow}</span>
              </a>

              <button onClick={()=>onSave(prop.id)} className="btn-trans" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", marginTop:10, padding:"11px", borderRadius:12, border:"1.5px solid", borderColor: savedIds.includes(prop.id)?"#1e40af":"#e2e8f0", background: savedIds.includes(prop.id)?"#eff6ff":"transparent", color: savedIds.includes(prop.id)?"#1e40af":"#374151", fontSize:14, fontWeight:600 }}>
                <Bookmark size={15} style={{ fill: savedIds.includes(prop.id)?"#1e40af":"none" }}/>
                {savedIds.includes(prop.id) ? TR[lang].listings.saved : TR[lang].listings.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SAVED PAGE
   ========================================================= */
function SavedPage({ lang, savedIds, onSave, setPage, setDetailId }) {
  const t = TR[lang].saved;
  const saved = PROPERTIES.filter(p=>savedIds.includes(p.id));
  return (
    <div className="page-wrap" style={{ paddingTop:64, minHeight:"100vh", background:"#f8fafc" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 24px 80px" }}>
        <div style={{ marginBottom:36 }}>
          <h1 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:800, color:"#0f172a", marginBottom:8 }}>{t.title}</h1>
          <p style={{ color:"#64748b", fontSize:15 }} className={lang==="bn"?"bn":""}>{t.sub}</p>
        </div>

        {saved.length===0 ? (
          <div style={{ textAlign:"center", padding:"80px 24px", background:"white", borderRadius:24, border:"1px solid #f1f5f9" }}>
            <Bookmark size={52} color="#cbd5e1" style={{ marginBottom:18 }}/>
            <h3 style={{ fontSize:20, fontWeight:700, color:"#374151", marginBottom:8 }} className={lang==="bn"?"bn":""}>{t.empty}</h3>
            <p style={{ color:"#94a3b8", fontSize:15, marginBottom:24 }} className={lang==="bn"?"bn":""}>{t.emptySub}</p>
            <button onClick={()=>setPage("listings")} className="btn-trans btn-glow" style={{ background:"#1e40af", color:"white", padding:"12px 28px", borderRadius:12, fontSize:14.5, fontWeight:700 }}>
              Browse Listings
            </button>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:24 }}>
            {saved.map(prop=>(
              <PropertyCard key={prop.id} prop={prop} lang={lang} saved={true} onSave={onSave} onView={(id)=>{ setDetailId(id); setPage("property"); }}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD PAGE
   ========================================================= */
function DashboardPage({ lang }) {
  const t = TR[lang].dashboard;
  const [activeTab, setActiveTab] = useState("myListings");
  const tabs = [
    { key:"myListings", icon:Building2, label:t.myListings },
    { key:"savedHomes", icon:Bookmark, label:t.savedHomes },
    { key:"messages", icon:MessageCircle, label:t.messages },
    { key:"settings", icon:Settings, label:t.settings }
  ];
  return (
    <div className="page-wrap" style={{ paddingTop:64, minHeight:"100vh", background:"#f8fafc" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 24px 80px" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
          <div>
            <h1 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, color:"#0f172a", marginBottom:4 }}>{t.title}</h1>
            <p style={{ color:"#64748b", fontSize:15 }} className={lang==="bn"?"bn":""}>{t.sub}</p>
          </div>
          <button className="btn-trans btn-glow" style={{ background:"#1e40af", color:"white", padding:"11px 22px", borderRadius:12, fontSize:14, fontWeight:700, display:"flex", alignItems:"center", gap:7 }}>
            <Plus size={15}/> <span className={lang==="bn"?"bn":""}>{t.addListing}</span>
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:32 }}>
          {[
            { icon:Building2, val:"2", label:t.activeListings, color:"#eff6ff", iconColor:"#2563eb" },
            { icon:Eye, val:"1,240", label:t.totalViews, color:"#fef3c7", iconColor:"#d97706" },
            { icon:Bookmark, val:"38", label:t.savedBy, color:"#f0fdf4", iconColor:"#059669" },
            { icon:TrendingUp, val:"94%", label:t.responseRate, color:"#fdf4ff", iconColor:"#9333ea" }
          ].map(({ icon:Icon, val, label, color, iconColor })=>(
            <div key={label} className="dashboard-stat">
              <div style={{ width:44, height:44, borderRadius:13, background:color, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                <Icon size={20} color={iconColor}/>
              </div>
              <div style={{ fontSize:26, fontWeight:900, color:"#0f172a", letterSpacing:"-0.5px" }}>{val}</div>
              <div style={{ fontSize:13, color:"#64748b", marginTop:4 }} className={lang==="bn"?"bn":""}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs + Content */}
        <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:24 }}>
          <div style={{ background:"white", borderRadius:18, padding:"12px", border:"1px solid #f1f5f9", height:"fit-content" }}>
            {tabs.map(({ key, icon:Icon, label })=>(
              <button key={key} onClick={()=>setActiveTab(key)} className={`dashboard-nav-item${activeTab===key?" active":""} ${lang==="bn"?"bn":""}`} style={{ width:"100%" }}>
                <Icon size={17}/> {label}
              </button>
            ))}
          </div>
          <div style={{ background:"white", borderRadius:18, padding:"28px", border:"1px solid #f1f5f9", minHeight:400 }}>
            {activeTab==="myListings" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                  <h3 style={{ fontSize:17, fontWeight:700, color:"#0f172a" }} className={lang==="bn"?"bn":""}>{t.myListings}</h3>
                </div>
                {PROPERTIES.slice(0,2).map(prop=>(
                  <div key={prop.id} style={{ display:"flex", gap:14, alignItems:"center", padding:"14px 0", borderBottom:"1px solid #f8fafc" }}>
                    <div style={{ width:60, height:60, borderRadius:12, background:"linear-gradient(135deg,#dbeafe,#93c5fd)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Building2 size={22} color="#2563eb"/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14.5, fontWeight:600, color:"#0f172a", marginBottom:3 }} className={lang==="bn"?"bn":""}>{lang==="bn"?prop.titleBn:prop.title}</div>
                      <div style={{ fontSize:12.5, color:"#64748b" }} className={lang==="bn"?"bn":""}>{lang==="bn"?prop.areaBn:prop.area}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div className="price-text" style={{ fontSize:15, fontWeight:800 }}>{fmt(prop.price)}</div>
                      <div style={{ fontSize:11, color:"#10b981", fontWeight:600, marginTop:2 }}>Active</div>
                    </div>
                  </div>
                ))}
                <div style={{ textAlign:"center", padding:"32px 0 8px", color:"#94a3b8", fontSize:14 }}>
                  <Building2 size={30} color="#e2e8f0" style={{ marginBottom:8 }}/>
                  <p className={lang==="bn"?"bn":""}>{t.noListings}</p>
                  <p style={{ fontSize:13, marginTop:4 }} className={lang==="bn"?"bn":""}>{t.noListingsSub}</p>
                </div>
              </div>
            )}
            {activeTab!=="myListings" && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, color:"#94a3b8" }}>
                <Settings size={36} color="#e2e8f0" style={{ marginBottom:12 }}/>
                <p style={{ fontSize:15 }}>Coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AUTH PAGE
   ========================================================= */
function AuthPage({ lang, mode, setPage, onLogin }) {
  const t = TR[lang].auth;
  const isLogin = mode==="login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="page-wrap" style={{ paddingTop:64, minHeight:"100vh", background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 24px" }}>
      <div style={{ width:"100%", maxWidth:440 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <button onClick={()=>setPage("home")} style={{ display:"inline-block", marginBottom:28, background:"none", border:"none", cursor:"pointer" }}>
            <BashaLogo size={30} light={false}/>
          </button>
          <h1 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(24px,4vw,32px)", fontWeight:800, color:"#0f172a", marginBottom:8 }}>{isLogin?t.loginTitle:t.signupTitle}</h1>
          <p style={{ color:"#64748b", fontSize:15 }} className={lang==="bn"?"bn":""}>{isLogin?t.loginSub:t.signupSub}</p>
        </div>

        <div className="auth-card">
          <button style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:10, padding:"12px", borderRadius:12, border:"1.5px solid #e2e8f0", background:"white", fontSize:14.5, fontWeight:600, color:"#374151", marginBottom:22, cursor:"pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span className={lang==="bn"?"bn":""}>{t.google}</span>
          </button>

          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
            <div style={{ flex:1, height:1, background:"#f1f5f9" }}/>
            <span style={{ fontSize:12.5, color:"#94a3b8", fontWeight:500 }} className={lang==="bn"?"bn":""}>{t.orContinue}</span>
            <div style={{ flex:1, height:1, background:"#f1f5f9" }}/>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {!isLogin && (
              <div>
                <label style={{ display:"block", fontSize:13.5, fontWeight:600, color:"#374151", marginBottom:7 }} className={lang==="bn"?"bn":""}>{t.name}</label>
                <input className="input-field" placeholder="Tanvir Rahman" style={{ fontFamily:"'DM Sans',sans-serif" }}/>
              </div>
            )}
            <div>
              <label style={{ display:"block", fontSize:13.5, fontWeight:600, color:"#374151", marginBottom:7 }} className={lang==="bn"?"bn":""}>{t.email}</label>
              <div style={{ position:"relative" }}>
                <Mail size={15} color="#94a3b8" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }}/>
                <input className="input-field" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={{ paddingLeft:40, fontFamily:"'DM Sans',sans-serif" }}/>
              </div>
            </div>
            <div>
              <label style={{ display:"block", fontSize:13.5, fontWeight:600, color:"#374151", marginBottom:7 }} className={lang==="bn"?"bn":""}>{t.password}</label>
              <div style={{ position:"relative" }}>
                <Lock size={15} color="#94a3b8" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }}/>
                <input className="input-field" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{ paddingLeft:40, fontFamily:"'DM Sans',sans-serif" }}/>
              </div>
            </div>

            {isLogin && (
              <div style={{ textAlign:"right", marginTop:-6 }}>
                <button style={{ fontSize:13, color:"#2563eb", fontWeight:500, background:"none", border:"none", cursor:"pointer" }} className={lang==="bn"?"bn":""}>{t.forgotPw}</button>
              </div>
            )}

            <button
              onClick={onLogin}
              className="btn-trans btn-glow"
              style={{ background:"#1e40af", color:"white", padding:"13px", borderRadius:13, fontSize:15, fontWeight:700, marginTop:4, width:"100%" }}
            >
              <span className={lang==="bn"?"bn":""}>{isLogin?t.loginBtn:t.signupBtn}</span>
            </button>
          </div>

          <div style={{ textAlign:"center", marginTop:20 }}>
            <button onClick={()=>setPage(isLogin?"signup":"login")} style={{ fontSize:14, color:"#2563eb", fontWeight:500, background:"none", border:"none", cursor:"pointer" }} className={lang==="bn"?"bn":""}>{isLogin?t.toSignup:t.toLogin}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   404 PAGE
   ========================================================= */
function NotFoundPage({ lang, setPage }) {
  const t = TR[lang].notFound;
  return (
    <div className="page-wrap" style={{ paddingTop:64, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f8fafc", padding:"80px 24px" }}>
      <div style={{ textAlign:"center", maxWidth:480 }}>
        <div style={{ fontSize:80, marginBottom:12 }}>🏠</div>
        <h1 className={`display${lang==="bn"?" bn":""}`} style={{ fontSize:"clamp(28px,5vw,44px)", fontWeight:800, color:"#0f172a", marginBottom:12 }}>{t.title}</h1>
        <p style={{ color:"#64748b", fontSize:16, marginBottom:32 }} className={lang==="bn"?"bn":""}>{t.sub}</p>
        <button onClick={()=>setPage("home")} className="btn-trans btn-glow" style={{ background:"#1e40af", color:"white", padding:"14px 32px", borderRadius:14, fontSize:15.5, fontWeight:700 }}>
          <span className={lang==="bn"?"bn":""}>{t.btn}</span>
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */
export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [savedIds, setSavedIds] = useState([1,3]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [detailId, setDetailId] = useState(1);
  const [authMode, setAuthMode] = useState("login");
  const [toast, setToast] = useState("");

  const handleSave = useCallback((id) => {
    setSavedIds(prev => {
      const isSaved = prev.includes(id);
      showToast(isSaved ? (lang==="bn"?"সেভ তালিকা থেকে সরানো হয়েছে":"Removed from saved") : (lang==="bn"?"সেভ হয়েছে ✓":"Saved ✓"));
      return isSaved ? prev.filter(i=>i!==id) : [...prev, id];
    });
  }, [lang]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(()=>setToast(""), 2400);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("dashboard");
    showToast(lang==="bn" ? "সাইন ইন সফল হয়েছে ✓" : "Welcome to Bashabari ✓");
  };

  const navPage = (p) => {
    if ((p==="dashboard") && !isLoggedIn) { setAuthMode("login"); setPage("login"); return; }
    setPage(p);
  };

  // Inject Google Fonts
  useEffect(()=>{
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@700;800&family=Hind+Siliguri:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return ()=>{ try{document.head.removeChild(link);}catch{} };
  }, []);

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage lang={lang} setPage={navPage} savedIds={savedIds} onSave={handleSave}/>;
      case "listings": return <ListingsPage lang={lang} savedIds={savedIds} onSave={handleSave} setPage={navPage} setDetailId={setDetailId}/>;
      case "property": return <PropertyDetailPage propId={detailId} lang={lang} savedIds={savedIds} onSave={handleSave} setPage={navPage}/>;
      case "saved": return <SavedPage lang={lang} savedIds={savedIds} onSave={handleSave} setPage={navPage} setDetailId={setDetailId}/>;
      case "dashboard": return <DashboardPage lang={lang}/>;
      case "login": return <AuthPage lang={lang} mode="login" setPage={(p)=>{ if(p==="signup"){setAuthMode("signup");setPage("signup");}else{setPage(p);} }} onLogin={handleLogin}/>;
      case "signup": return <AuthPage lang={lang} mode="signup" setPage={(p)=>{ if(p==="login"){setAuthMode("login");setPage("login");}else{setPage(p);} }} onLogin={handleLogin}/>;
      default: return <NotFoundPage lang={lang} setPage={navPage}/>;
    }
  };

  return (
    <div style={{ minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{STYLES}</style>

      <Navbar
        page={page} setPage={navPage}
        lang={lang} setLang={setLang}
        isLoggedIn={isLoggedIn} setIsLoggedIn={(v)=>{ setIsLoggedIn(v); if(!v) setPage("home"); }}
        savedCount={savedIds.length}
      />

      <main>{renderPage()}</main>

      <MobileBottomNav page={page} setPage={navPage} savedCount={savedIds.length}/>

      <Toast msg={toast}/>
    </div>
  );
}
