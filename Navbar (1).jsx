import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Home, Search, Heart, LayoutDashboard, LogIn } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import LanguageToggle from '../ui/LanguageToggle'

const Logo = () => (
  <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
    <div style={{ width:38, height:38, background:'#0f1f3d', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="rgba(255,255,255,0.12)" stroke="#60a5fa" strokeWidth={1.5}/>
        <path d="M9 21V13h6v8" stroke="#93c5fd" strokeWidth={1.5} strokeLinecap="round"/>
        <circle cx={12} cy={8.5} r={1.5} fill="#60a5fa"/>
      </svg>
    </div>
    <span style={{ fontSize:17, fontWeight:700, color:'#0f1f3d', letterSpacing:-0.3 }}>
      Basha<span style={{ color:'#2563eb' }}>bari</span>
    </span>
  </Link>
)

export default function Navbar() {
  const { t } = useLang()
  const loc = useLocation()
  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { to:'/listings', label: t('nav_browse') },
    { to:'/saved',    label: t('nav_saved') },
    { to:'/dashboard',label: t('nav_dashboard') },
  ]

  const isActive = (path) => loc.pathname === path

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100, height:64,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        transition:'box-shadow 0.3s',
        display:'flex', alignItems:'center', padding:'0 24px', gap:16,
      }}>
        <Logo />

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:2, marginLeft:24 }} className="hidden-mobile">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding:'7px 14px', borderRadius:8, fontSize:14, fontWeight:500,
              color: isActive(l.to) ? '#0f1f3d' : '#64748b',
              background: isActive(l.to) ? '#f1f5f9' : 'transparent',
              textDecoration:'none', transition:'all 0.2s',
            }}
            onMouseEnter={e => { if(!isActive(l.to)) { e.target.style.color='#0f1f3d'; e.target.style.background='#f8fafc' }}}
            onMouseLeave={e => { if(!isActive(l.to)) { e.target.style.color='#64748b'; e.target.style.background='transparent' }}}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
          <LanguageToggle />
          <Link to="/login" className="hidden-mobile" style={{
            padding:'8px 18px', borderRadius:8, fontSize:14, fontWeight:500, cursor:'pointer',
            border:'1.5px solid #e2e8f0', background:'#fff', color:'#0f1f3d', textDecoration:'none',
            transition:'all 0.2s', display:'inline-flex', alignItems:'center', gap:6,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='#2563eb'; e.currentTarget.style.color='#2563eb' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.color='#0f1f3d' }}
          >
            <LogIn size={15}/> {t('nav_login')}
          </Link>
          <Link to="/signup" className="hidden-mobile" style={{
            padding:'8px 18px', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer',
            background:'#0f1f3d', color:'#fff', textDecoration:'none', transition:'all 0.2s', display:'inline-flex', alignItems:'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#1a3560' }}
          onMouseLeave={e => { e.currentTarget.style.background='#0f1f3d' }}
          >
            {t('nav_list')}
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ display:'none', background:'none', border:'none', cursor:'pointer', padding:6, borderRadius:8, color:'#0f1f3d' }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position:'fixed', top:64, left:0, right:0, bottom:0, zIndex:99,
          background:'rgba(0,0,0,0.4)', backdropFilter:'blur(4px)',
        }} onClick={() => setMobileOpen(false)}>
          <div style={{
            background:'#fff', padding:24, display:'flex', flexDirection:'column', gap:4,
            borderBottom:'1px solid #e2e8f0',
          }} onClick={e => e.stopPropagation()}>
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} style={{
                padding:'12px 16px', borderRadius:10, fontSize:15, fontWeight:500,
                color: isActive(l.to) ? '#0f1f3d' : '#64748b',
                background: isActive(l.to) ? '#f1f5f9' : 'transparent',
                textDecoration:'none',
              }}>
                {l.label}
              </Link>
            ))}
            <div style={{ height:1, background:'#f1f5f9', margin:'8px 0' }}/>
            <Link to="/login" onClick={() => setMobileOpen(false)} style={{ padding:'12px 16px', borderRadius:10, fontSize:15, fontWeight:500, color:'#64748b', textDecoration:'none' }}>
              {t('nav_login')}
            </Link>
            <Link to="/signup" onClick={() => setMobileOpen(false)} style={{ padding:'12px 16px', borderRadius:10, fontSize:15, fontWeight:600, color:'#fff', background:'#0f1f3d', textDecoration:'none', textAlign:'center' }}>
              {t('nav_list')}
            </Link>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <MobileBottomNav t={t} isActive={isActive} />

      <style>{`
        .hidden-mobile { }
        .show-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function MobileBottomNav({ t, isActive }) {
  const items = [
    { to:'/', icon:<Home size={22}/>, label: t('mn_home') },
    { to:'/listings', icon:<Search size={22}/>, label: t('mn_browse') },
    { to:'/saved', icon:<Heart size={22}/>, label: t('mn_saved') },
    { to:'/dashboard', icon:<LayoutDashboard size={22}/>, label: t('mn_profile') },
  ]
  return (
    <>
      <div style={{
        position:'fixed', bottom:0, left:0, right:0, zIndex:100,
        background:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)',
        borderTop:'1px solid #e2e8f0', display:'none', paddingBottom:'env(safe-area-inset-bottom)',
      }} className="mobile-bottom-nav">
        {items.map(item => (
          <Link key={item.to} to={item.to} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            padding:'10px 0', textDecoration:'none',
            color: isActive(item.to) ? '#2563eb' : '#94a3b8', transition:'color 0.2s',
          }}>
            {item.icon}
            <span style={{ fontSize:10, fontWeight:500 }}>{item.label}</span>
          </Link>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav { display: flex !important; }
          body { padding-bottom: 70px; }
        }
      `}</style>
    </>
  )
}
