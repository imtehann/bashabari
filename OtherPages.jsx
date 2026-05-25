import { useLang } from '../context/LangContext'
import { useSaved } from '../context/SavedContext'
import { properties } from '../data/properties'
import PropertyCard from '../components/cards/PropertyCard'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'

export function SavedPage() {
  const { t } = useLang()
  const { ids } = useSaved()
  const navigate = useNavigate()
  const saved = properties.filter(p => ids.includes(p.id))

  return (
    <div style={{ paddingTop:64, minHeight:'100vh', background:'#f8fafc' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px' }}>
        <div style={{ marginBottom:36 }}>
          <h1 style={{ fontSize:28, fontWeight:700, color:'#0f1f3d', letterSpacing:-0.8, marginBottom:6 }}>{t('saved_h')}</h1>
          <p style={{ color:'#64748b', fontSize:15 }}>{t('saved_sub')}</p>
        </div>

        {saved.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 24px', background:'#fff', borderRadius:18, border:'1px solid #e2e8f0' }}>
            <div style={{ width:72, height:72, background:'#fef2f2', borderRadius:'50%', margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Heart size={32} color="#fca5a5"/>
            </div>
            <h3 style={{ fontSize:20, fontWeight:700, color:'#0f1f3d', marginBottom:10 }}>{t('saved_empty_h')}</h3>
            <p style={{ color:'#64748b', marginBottom:28, maxWidth:340, margin:'0 auto 28px' }}>{t('saved_empty_p')}</p>
            <button onClick={() => navigate('/listings')} style={{ padding:'12px 28px', background:'#0f1f3d', color:'#fff', border:'none', borderRadius:10, fontFamily:'inherit', fontWeight:600, cursor:'pointer', fontSize:15 }}>
              {t('saved_browse')}
            </button>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:20 }}>
            {saved.map(p => <PropertyCard key={p.id} property={p}/>)}
          </div>
        )}
      </div>
    </div>
  )
}

export function DashboardPage() {
  const { t } = useLang()
  const navigate = useNavigate()
  const myProps = properties.slice(0, 3)

  const stats = [
    { label: t('ds1'), value:'3', change:'↑ 1 this month', color:'#2563eb' },
    { label: t('ds2'), value:'847', change:'↑ 12% this week', color:'#059669' },
    { label: t('ds3'), value:'24', change:'5 new today', color:'#7c3aed' },
    { label: t('ds4'), value:'96%', change:'Excellent', color:'#f59e0b' },
  ]

  return (
    <div style={{ paddingTop:64, minHeight:'100vh', background:'#f8fafc' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px' }}>
        <div style={{ marginBottom:32, display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontSize:28, fontWeight:700, color:'#0f1f3d', letterSpacing:-0.8, marginBottom:6 }}>{t('dash_h')}</h1>
            <p style={{ color:'#64748b' }}>{t('dash_sub')}</p>
          </div>
          <button onClick={() => navigate('/signup')} style={{
            padding:'11px 24px', background:'#0f1f3d', color:'#fff', border:'none',
            borderRadius:10, fontFamily:'inherit', fontWeight:600, cursor:'pointer', fontSize:14,
          }}>
            {t('dash_add')}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:36 }} className="stats-grid">
          {stats.map(s => (
            <div key={s.label} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:'20px 22px' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:0.8, marginBottom:10 }}>{s.label}</div>
              <div style={{ fontSize:30, fontWeight:800, color:'#0f1f3d', letterSpacing:-1, marginBottom:6 }}>{s.value}</div>
              <div style={{ fontSize:12, color: s.color, fontWeight:500 }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:'2px solid #f1f5f9', marginBottom:28, gap:4 }}>
          {[t('dt1'), t('dt2'), t('dt3')].map((tab, i) => (
            <button key={tab} style={{
              padding:'10px 20px', fontSize:14, fontWeight:600,
              color: i === 0 ? '#2563eb' : '#94a3b8',
              borderBottom: i === 0 ? '2px solid #2563eb' : '2px solid transparent',
              background:'none', border:'none', borderBottomWidth:2,
              borderBottomStyle:'solid', borderBottomColor: i === 0 ? '#2563eb' : 'transparent',
              cursor:'pointer', fontFamily:'inherit', marginBottom:-2, transition:'color 0.2s',
            }}>
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:20 }}>
          {myProps.map(p => <PropertyCard key={p.id} property={p}/>)}
        </div>
      </div>
      <style>{`
        @media(max-width:768px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:480px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

function AuthLayout({ children }) {
  return (
    <div style={{ paddingTop:64, minHeight:'100vh', background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', padding:'88px 24px 40px' }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        {/* Mini logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:52, height:52, background:'#0f1f3d', borderRadius:14, margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 24 24" fill="none" width={28} height={28}>
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill="rgba(255,255,255,0.1)" stroke="#60a5fa" strokeWidth={1.5}/>
              <path d="M9 21V13h6v8" stroke="#93c5fd" strokeWidth={1.5} strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize:20, fontWeight:700, color:'#0f1f3d', letterSpacing:-0.4 }}>Basha<span style={{ color:'#2563eb' }}>bari</span></span>
        </div>
        <div style={{ background:'#fff', borderRadius:18, border:'1px solid #e2e8f0', padding:'36px 32px', boxShadow:'0 4px 24px rgba(0,0,0,0.07)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function FormInput({ label, type='text', placeholder, value, onChange }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{
        width:'100%', padding:'11px 14px', border:'1.5px solid #e2e8f0', borderRadius:9,
        fontSize:14, fontFamily:'inherit', outline:'none', transition:'border-color 0.2s', boxSizing:'border-box',
      }}
      onFocus={e => e.target.style.borderColor='#2563eb'}
      onBlur={e => e.target.style.borderColor='#e2e8f0'}
      />
    </div>
  )
}

export function LoginPage() {
  const { t } = useLang()
  const navigate = useNavigate()

  const handleLogin = () => {
    // Mock login
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <h2 style={{ fontSize:22, fontWeight:700, color:'#0f1f3d', marginBottom:6 }}>{t('login_h')}</h2>
      <p style={{ fontSize:14, color:'#64748b', marginBottom:28 }}>{t('login_sub')}</p>
      <FormInput label={t('login_email')} type="email" placeholder={t('login_email_ph')}/>
      <FormInput label={t('login_pass')} type="password" placeholder={t('login_pass_ph')}/>
      <div style={{ textAlign:'right', marginTop:-8, marginBottom:20 }}>
        <a href="#" style={{ fontSize:13, color:'#2563eb', textDecoration:'none' }}>{t('login_forgot')}</a>
      </div>
      <button onClick={handleLogin} style={{
        width:'100%', padding:'13px', background:'#0f1f3d', color:'#fff', border:'none',
        borderRadius:10, fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
        transition:'all 0.2s', marginBottom:16,
      }}
      onMouseEnter={e => e.currentTarget.style.background='#2563eb'}
      onMouseLeave={e => e.currentTarget.style.background='#0f1f3d'}
      >
        {t('login_btn')}
      </button>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
        <div style={{ flex:1, height:1, background:'#f1f5f9' }}/>
        <span style={{ fontSize:12, color:'#94a3b8', whiteSpace:'nowrap' }}>{t('login_or')}</span>
        <div style={{ flex:1, height:1, background:'#f1f5f9' }}/>
      </div>
      <button onClick={handleLogin} style={{
        width:'100%', padding:'12px', background:'#fff', color:'#374151', border:'1.5px solid #e2e8f0',
        borderRadius:10, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
        display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'all 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor='#d1d5db'}
      onMouseLeave={e => e.currentTarget.style.borderColor='#e2e8f0'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        {t('login_google')}
      </button>
      <p style={{ textAlign:'center', fontSize:13, color:'#94a3b8', marginTop:24 }}>
        {t('login_no_acc')}{' '}
        <button onClick={() => navigate('/signup')} style={{ color:'#2563eb', fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:13 }}>
          {t('login_signup')}
        </button>
      </p>
    </AuthLayout>
  )
}

export function SignupPage() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [role, setRole] = useState('tenant')

  const handleSignup = () => navigate('/dashboard')

  return (
    <AuthLayout>
      <h2 style={{ fontSize:22, fontWeight:700, color:'#0f1f3d', marginBottom:6 }}>{t('signup_h')}</h2>
      <p style={{ fontSize:14, color:'#64748b', marginBottom:24 }}>{t('signup_sub')}</p>
      <FormInput label={t('signup_name')} placeholder={t('signup_name_ph')}/>
      <FormInput label={t('signup_phone')} type="tel" placeholder={t('signup_phone_ph')}/>
      <FormInput label={t('signup_email')} type="email" placeholder={t('signup_email_ph')}/>
      <FormInput label={t('signup_pass')} type="password" placeholder={t('signup_pass_ph')}/>

      <div style={{ marginBottom:20 }}>
        <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:8 }}>{t('signup_iam')}</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[['tenant', t('signup_tenant'), '🏠'], ['landlord', t('signup_landlord'), '🔑']].map(([k, lbl, icon]) => (
            <button key={k} onClick={() => setRole(k)} style={{
              padding:'11px', borderRadius:9, fontSize:14, fontWeight:600, cursor:'pointer',
              fontFamily:'inherit', transition:'all 0.2s',
              background: role === k ? '#0f1f3d' : '#f8fafc',
              color: role === k ? '#fff' : '#64748b',
              border: `1.5px solid ${role === k ? '#0f1f3d' : '#e2e8f0'}`,
            }}>
              {icon} {lbl}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize:12, color:'#94a3b8', marginBottom:16, lineHeight:1.6 }}>{t('signup_terms')}</p>

      <button onClick={handleSignup} style={{
        width:'100%', padding:'13px', background:'#0f1f3d', color:'#fff', border:'none',
        borderRadius:10, fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.background='#2563eb'}
      onMouseLeave={e => e.currentTarget.style.background='#0f1f3d'}
      >
        {t('signup_btn')}
      </button>
      <p style={{ textAlign:'center', fontSize:13, color:'#94a3b8', marginTop:20 }}>
        {t('signup_has')}{' '}
        <button onClick={() => navigate('/login')} style={{ color:'#2563eb', fontWeight:600, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:13 }}>
          {t('signup_login')}
        </button>
      </p>
    </AuthLayout>
  )
}

export function NotFoundPage() {
  const { t } = useLang()
  const navigate = useNavigate()
  return (
    <div style={{ paddingTop:64, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'80px 24px', background:'#f8fafc' }}>
      <div style={{ fontSize:120, fontWeight:900, color:'#e2e8f0', letterSpacing:-8, lineHeight:1, marginBottom:8 }}>404</div>
      <h2 style={{ fontSize:26, fontWeight:700, color:'#0f1f3d', marginBottom:12 }}>{t('nf_h')}</h2>
      <p style={{ color:'#64748b', marginBottom:32, fontSize:16 }}>{t('nf_p')}</p>
      <button onClick={() => navigate('/')} style={{ padding:'13px 32px', background:'#0f1f3d', color:'#fff', border:'none', borderRadius:10, fontFamily:'inherit', fontWeight:700, cursor:'pointer', fontSize:15 }}>
        {t('nf_btn')}
      </button>
    </div>
  )
}

// Need useState import at top
import { useState } from 'react'
