// src/components/footer/Footer.jsx
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

function FooterLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.1"/>
      <path d="M20 8L28 16V30H23V23H17V30H12V16L20 8Z" fill="white" opacity="0.9"/>
      <path d="M12 16L20 8L28 16" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

export default function Footer() {
  const { t, lang } = useLanguage()
  const f = t.footer

  const links = {
    [f.company]: [
      { label: f.about, to: '/about' },
      { label: f.careers, to: '/careers' },
      { label: f.blog, to: '/blog' },
      { label: f.press, to: '/press' },
    ],
    [f.product]: [
      { label: f.how_it_works, to: '/how-it-works' },
      { label: f.pricing, to: '/pricing' },
      { label: f.safety, to: '/safety' },
      { label: f.support, to: '/support' },
    ],
    [f.legal]: [
      { label: f.privacy, to: '/privacy' },
      { label: f.terms, to: '/terms' },
      { label: f.cookies, to: '/cookies' },
    ],
  }

  return (
    <footer className="bg-navy-950 text-white">
      {/* Main footer */}
      <div className="container-app py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <FooterLogo />
              <span className="font-heading font-bold text-xl text-white">
                {lang === 'bn' ? 'বাশাবাড়ি' : 'Bashabari'}
              </span>
            </div>
            <p className={`text-slate-400 text-sm leading-relaxed mb-5 max-w-xs ${lang === 'bn' ? 'font-bangla' : ''}`}>
              {f.tagline}
            </p>
            <p className={`text-xs text-slate-500 mb-6 ${lang === 'bn' ? 'font-bangla' : ''}`}>
              {f.cities}
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16}/>, href: '#' },
                { icon: <Instagram size={16}/>, href: '#' },
                { icon: <Twitter size={16}/>, href: '#' },
                { icon: <Linkedin size={16}/>, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-sm text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`text-sm text-slate-400 hover:text-white transition-colors ${lang === 'bn' ? 'font-bangla' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a href="mailto:hello@bashabari.com" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <Mail size={14} /> hello@bashabari.com
          </a>
          <a href="tel:+8801700000000" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <Phone size={14} /> +880 1700-000000
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-app py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className={`text-xs text-slate-500 ${lang === 'bn' ? 'font-bangla' : ''}`}>{f.rights}</p>
          <p className={`text-xs text-slate-600 ${lang === 'bn' ? 'font-bangla' : ''}`}>{f.made_in}</p>
        </div>
      </div>
    </footer>
  )
}
