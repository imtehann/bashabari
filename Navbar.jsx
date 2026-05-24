// src/components/navbar/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Heart, LayoutDashboard, LogOut, LogIn,
  Plus, Shield, User, ChevronDown,
} from 'lucide-react'
import { useLanguage }  from '../../context/LanguageContext'
import { useAuth }      from '../../context/AuthContext'
import { useSaved }     from '../../context/SavedContext'
import LanguageToggle   from '../ui/LanguageToggle'
import Button           from '../ui/Button'
import toast            from 'react-hot-toast'

// Logo SVG inline
function BashabariLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#0F172A"/>
      <path d="M20 8L28 16V30H23V23H17V30H12V16L20 8Z" fill="white" opacity="0.9"/>
      <path d="M20 8L28 16" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 16L20 8L28 16" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

export default function Navbar() {
  const { t, lang }           = useLanguage()
  const { user, logout }      = useAuth()
  const { saved }             = useSaved()
  const navigate              = useNavigate()

  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [dropdown,  setDropdown]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleLogout = async () => {
    await logout()
    toast('Signed out. See you soon!', { icon: '👋' })
    navigate('/')
    setDropdown(false)
  }

  const navLinks = [
    { to: '/listings',  label: t.nav.listings },
  ]

  const activeClass = 'text-navy-900 font-semibold'
  const inactiveClass = 'text-slate-500 hover:text-navy-900'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-nav'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <nav className="container-app h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <BashabariLogo size={34} />
            <span className="font-heading font-bold text-navy-900 text-lg tracking-tight">
              {lang === 'bn' ? 'বাশাবাড়ি' : 'Bashabari'}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? activeClass : inactiveClass}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/saved"
                className={({ isActive }) =>
                  `text-sm font-medium flex items-center gap-1.5 transition-colors ${isActive ? activeClass : inactiveClass}`
                }
              >
                <Heart size={14} />
                {t.nav.saved}
                {saved.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {saved.length}
                  </span>
                )}
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium flex items-center gap-1.5 transition-colors ${isActive ? activeClass : inactiveClass}`
                }
              >
                <LayoutDashboard size={14} />
                {t.nav.dashboard}
              </NavLink>
            )}
            {user?.isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-sm font-medium flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 ${isActive ? 'font-bold' : ''}`
                }
              >
                <Shield size={14} />
                {t.nav.admin}
              </NavLink>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdown(v => !v)}
                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl
                             hover:bg-surface-muted transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-navy-900 flex items-center justify-center">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {user.displayName?.[0] || user.email[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-navy-900 max-w-[80px] truncate">
                    {user.displayName || user.email.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                <AnimatePresence>
                  {dropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setDropdown(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl
                                   shadow-glass border border-surface-border z-20 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-surface-border">
                          <p className="text-xs font-semibold text-navy-900 truncate">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/dashboard" onClick={() => setDropdown(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-surface-soft transition-colors">
                            <LayoutDashboard size={15} /> {t.nav.dashboard}
                          </Link>
                          <Link to="/saved" onClick={() => setDropdown(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-surface-soft transition-colors">
                            <Heart size={15} /> {t.nav.saved}
                          </Link>
                          {user.isAdmin && (
                            <Link to="/admin" onClick={() => setDropdown(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-emerald-600 hover:bg-surface-soft transition-colors">
                              <Shield size={15} /> {t.nav.admin}
                            </Link>
                          )}
                          <button onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                            <LogOut size={15} /> {t.nav.logout}
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">{t.nav.login}</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm" icon={<Plus size={14} />}>
                    {t.nav.signup}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle compact />
            <button
              onClick={() => setOpen(v => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-muted transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-900/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 md:hidden
                         shadow-glass flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <BashabariLogo size={28} />
                  <span className="font-heading font-bold text-navy-900">
                    {lang === 'bn' ? 'বাশাবাড়ি' : 'Bashabari'}
                  </span>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted">
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-surface-muted'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                {user && (
                  <>
                    <NavLink to="/saved" onClick={() => setOpen(false)}
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-surface-muted'}`}>
                      <Heart size={16} /> {t.nav.saved}
                      {saved.length > 0 && <span className="ml-auto badge-new badge text-[10px]">{saved.length}</span>}
                    </NavLink>
                    <NavLink to="/dashboard" onClick={() => setOpen(false)}
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-surface-muted'}`}>
                      <LayoutDashboard size={16} /> {t.nav.dashboard}
                    </NavLink>
                    {user.isAdmin && (
                      <NavLink to="/admin" onClick={() => setOpen(false)}
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-emerald-600 transition-colors ${isActive ? 'bg-emerald-50' : 'hover:bg-emerald-50'}`}>
                        <Shield size={16} /> {t.nav.admin}
                      </NavLink>
                    )}
                  </>
                )}
              </div>

              {/* Drawer footer */}
              <div className="px-4 py-4 border-t border-surface-border">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {user.displayName?.[0] || user.email[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{user.displayName || 'User'}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[180px]">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} /> {t.nav.logout}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" size="md" fullWidth>{t.nav.login}</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      <Button variant="primary" size="md" fullWidth icon={<Plus size={14} />}>
                        {t.nav.signup}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
