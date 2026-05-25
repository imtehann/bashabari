import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'

const Logo = () => (
  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
    <div style={{ width:36, height:36, background:'rgba(255,255,255,0.1)', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="rgba(255,255,255,0.1)" stroke="#60a5fa" strokeWidth={1.5}/>
        <path d="M9 21V13h6v8" stroke="#93c5fd" strokeWidth={1.5} strokeLinecap="round"/>
      </svg>
    </div>
    <span style={{ fontSize:18, fontWeight:700, color:'#fff', letterSpacing:-0.3 }}>
      Basha<span style={{ color:'#60a5fa' }}>bari</span>
    </span>
  </div>
)

export default function Footer() {
  const { t } = useLang()

  const col1 = [
    { to:'/listings', label: t('fl_browse') },
    { to:'/signup',   label: t('fl_list') },
    { to:'/dashboard',label: t('fl_dash') },
    { to:'/saved',    label: t('fl_saved') },
  ]
  const col3 = [t('fl_about'), t('fl_safety'), t('fl_contact'), t('fl_privacy')]
  const areas = ['Dhanmondi','Gulshan','Mirpur','Mohammadpur','Banani','Uttara']

  return (
    <footer style={{ background:'#0f1f3d', color:'rgba(255,255,255,0.65)', padding:'64px 24px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:48 }} className="footer-grid">
          <div>
            <Logo />
            <p style={{ fontSize:14, lineHeight:1.8, maxWidth:260, marginBottom:24 }}>{t('foot_tag')}</p>
            <div style={{ display:'flex', gap:10 }}>
              {['Facebook','Instagram','LinkedIn'].map(s => (
                <button key={s} style={{
                  padding:'7px 14px', borderRadius:8, fontSize:12, fontWeight:500, cursor:'pointer',
                  background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)',
                  color:'rgba(255,255,255,0.6)', transition:'all 0.2s', fontFamily:'inherit',
                }}
                onMouseEnter={e => e.currentTarget.style.color='#fff'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.6)'}
                >{s}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize:12, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:1, marginBottom:16 }}>{t('fp')}</h4>
            {col1.map(l => (
              <Link key={l.to} to={l.to} style={{ display:'block', fontSize:14, color:'rgba(255,255,255,0.6)', textDecoration:'none', marginBottom:10, transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='#fff'}
              onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}
              >{l.label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize:12, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:1, marginBottom:16 }}>{t('fa')}</h4>
            {areas.map(a => (
              <Link key={a} to="/listings" style={{ display:'block', fontSize:14, color:'rgba(255,255,255,0.6)', textDecoration:'none', marginBottom:10, transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='#fff'}
              onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}
              >{a}</Link>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize:12, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:1, marginBottom:16 }}>{t('fc')}</h4>
            {col3.map(l => (
              <a key={l} href="#" style={{ display:'block', fontSize:14, color:'rgba(255,255,255,0.6)', textDecoration:'none', marginBottom:10, transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='#fff'}
              onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}
              >{l}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:24, textAlign:'center', fontSize:13 }}>
          {t('foot_copy')}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
