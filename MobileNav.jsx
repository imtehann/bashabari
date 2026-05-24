// src/components/layout/MobileNav.jsx
import { NavLink } from 'react-router-dom'
import { Home, Search, Heart, LayoutDashboard, LogIn } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth }     from '../../context/AuthContext'
import { useSaved }    from '../../context/SavedContext'

export default function MobileNav() {
  const { t }    = useLanguage()
  const { user } = useAuth()
  const { saved }= useSaved()

  const tabs = [
    { to: '/',          icon: Home,            label: lang => lang === 'bn' ? 'হোম' : 'Home' },
    { to: '/listings',  icon: Search,          label: lang => t.nav.listings },
    { to: '/saved',     icon: Heart,           label: lang => t.nav.saved, badge: saved.length > 0 ? saved.length : null, authRequired: true },
    { to: user ? '/dashboard' : '/login',
                        icon: user ? LayoutDashboard : LogIn,
                        label: lang => user ? t.nav.dashboard : t.nav.login },
  ]

  return (
    <nav className="mobile-nav md:hidden grid grid-cols-4">
      {tabs.map((tab, i) => {
        const Icon = tab.icon
        return (
          <NavLink
            key={i}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                isActive ? 'text-navy-900' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                  {tab.badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-500 text-white
                                     text-[9px] font-bold rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">{tab.label()}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
