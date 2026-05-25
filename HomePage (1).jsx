import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronRight, ShieldCheck, Zap, MapPin, Eye, ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { properties, testimonials } from '../../data/properties'
import PropertyCard from '../../components/cards/PropertyCard'
import Footer from '../../components/layout/Footer'

const CHIPS = [
  { key:'all',       tkChip:'chip_all' },
  { key:'apartment', tkChip:'chip_apartment' },
  { key:'family',    tkChip:'chip_family' },
  { key:'bachelor',  tkChip:'chip_bachelor' },
  { key:'sublet',    tkChip:'chip_sublet' },
]

const STATS = [
  { num:'2,400+', tk:'stat_a' },
  { num:'98%',    tk:'stat_b' },
  { num:'12+',    tk:'stat_c' },
  { num:'4.9★',   tk:'stat_d' },
]

const TRUST = [
  { icon:<ShieldCheck size={22} color="#2563eb"/>, tkH:'t1h', tkP:'t1p' },
  { icon:'🛡️',  tkH:'t2h', tkP:'t2p' },
  { icon:<Zap size={22} color="#2563eb"/>, tkH:'t3h', tkP:'t3p' },
  { icon:<MapPin size={22} color="#2563eb"/>, tkH:'t4h', tkP:'t4p' },
]

export default function HomePage() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeChip, setActiveChip] = useState('all')

  const handleSearch = () => navigate(`/listings?q=${query}&type=${activeChip === 'all' ? '' : activeChip}`)

  return (
    <div style={{ paddingTop:64 }}>

      {/* ── HERO ───────────────────────────────────────── */}
      <section style={{
        background:'linear-gradient(135deg, #0f1f3d 0%, #1a3560 55%, #0e2a52 100%)',
        color:'#fff', padding:'80px 24px 96px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        {/* Radial glow */}
        <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:800, height:400, background:'radial-gradient(ellipse, rgba(37,99,235,0.25) 0%, transparent 70%)', pointerEvents:'none' }}/>
        {/* Grid pattern */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }}/>

        <div style={{ position:'relative' }}>
          {/* Badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)',
            borderRadius:999, padding:'7px 18px', fontSize:13, marginBottom:32,
            backdropFilter:'blur(8px)',
          }}>
            <div style={{ width:7, height:7, background:'#4ade80', borderRadius:'50%', animation:'pulse 2s infinite' }}/>
            <span>{t('hero_badge')}</span>
          </div>

          <h1 style={{ fontSize:'clamp(36px,6vw,68px)', fontWeight:700, lineHeight:1.08, marginBottom:22, letterSpacing:-2, textWrap:'balance' }}>
            {t('hero_h1a')}<br/>
            <span style={{ color:'#60a5fa' }}>{t('hero_h1b')}</span>
          </h1>

          <p style={{ fontSize:18, color:'rgba(255,255,255,0.68)', maxWidth:520, margin:'0 auto 40px', lineHeight:1.75 }}>
            {t('hero_sub')}
          </p>

          {/* Search bar */}
          <div style={{
            background:'#fff', borderRadius:14, padding:'8px 8px 8px 20px',
            display:'flex', alignItems:'center', gap:12,
            maxWidth:640, margin:'0 auto 16px',
            boxShadow:'0 16px 48px rgba(0,0,0,0.2)',
          }}>
            <Search size={18} color="#94a3b8" style={{ flexShrink:0 }}/>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder={t('search_ph')}
              style={{ flex:1, border:'none', outline:'none', fontSize:15, fontFamily:'inherit', color:'#0f172a', background:'transparent' }}
            />
            <button onClick={handleSearch} style={{
              background:'#0f1f3d', color:'#fff', border:'none', borderRadius:10,
              padding:'11px 24px', fontSize:14, fontWeight:600, cursor:'pointer',
              fontFamily:'inherit', transition:'all 0.2s', whiteSpace:'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background='#2563eb'}
            onMouseLeave={e => e.currentTarget.style.background='#0f1f3d'}
            >
              {t('search_btn')}
            </button>
          </div>

          {/* Chips */}
          <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap' }}>
            {CHIPS.map(c => (
              <button key={c.key} onClick={() => setActiveChip(c.key)} style={{
                padding:'7px 18px', borderRadius:999, fontSize:13, fontWeight:500,
                cursor:'pointer', border:'1px solid',
                background: activeChip === c.key ? '#2563eb' : 'rgba(255,255,255,0.08)',
                borderColor: activeChip === c.key ? '#2563eb' : 'rgba(255,255,255,0.15)',
                color: activeChip === c.key ? '#fff' : 'rgba(255,255,255,0.75)',
                transition:'all 0.2s', fontFamily:'inherit', backdropFilter:'blur(8px)',
              }}>
                {t(c.tkChip)}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display:'flex', gap:48, justifyContent:'center', marginTop:56, flexWrap:'wrap' }}>
            {STATS.map(s => (
              <div key={s.tk} style={{ textAlign:'center' }}>
                <div style={{ fontSize:30, fontWeight:800, letterSpacing:-1 }}>{s.num}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.48)', marginTop:3 }}>{t(s.tk)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ──────────────────────────── */}
      <section style={{ padding:'80px 24px', maxWidth:1280, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#2563eb', textTransform:'uppercase', letterSpacing:1.2, marginBottom:12 }}>{t('feat_eye')}</div>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#0f1f3d', letterSpacing:-1, marginBottom:16 }}>{t('feat_h')}</h2>
          <p style={{ fontSize:16, color:'#64748b', maxWidth:520, margin:'0 auto' }}>{t('feat_sub')}</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:22 }}>
          {properties.slice(0,6).map(p => <PropertyCard key={p.id} property={p}/>)}
        </div>

        <div style={{ textAlign:'center', marginTop:44 }}>
          <button onClick={() => navigate('/listings')} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'12px 28px', borderRadius:10, fontSize:15, fontWeight:600,
            border:'1.5px solid #e2e8f0', background:'#fff', color:'#0f1f3d',
            cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#0f1f3d'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#0f1f3d' }}
          onMouseLeave={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#0f1f3d'; e.currentTarget.style.borderColor='#e2e8f0' }}
          >
            {t('view_all')} <ArrowRight size={16}/>
          </button>
        </div>
      </section>

      {/* ── TRUST SECTION ──────────────────────────────── */}
      <section style={{ background:'#f8fafc', padding:'80px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#2563eb', textTransform:'uppercase', letterSpacing:1.2, marginBottom:12 }}>{t('trust_eye')}</div>
            <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#0f1f3d', letterSpacing:-1, marginBottom:16 }}>{t('trust_h')}</h2>
            <p style={{ fontSize:16, color:'#64748b', maxWidth:500, margin:'0 auto' }}>{t('trust_sub')}</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:18 }}>
            {TRUST.map((item, i) => (
              <div key={i} style={{
                background:'#fff', border:'1px solid #e2e8f0', borderRadius:16,
                padding:28, textAlign:'center', transition:'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
              >
                <div style={{ width:52, height:52, background:'#eff6ff', borderRadius:13, margin:'0 auto 18px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, color:'#0f1f3d', marginBottom:8 }}>{t(item.tkH)}</h3>
                <p style={{ fontSize:13, color:'#64748b', lineHeight:1.7 }}>{t(item.tkP)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section style={{ padding:'80px 24px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#2563eb', textTransform:'uppercase', letterSpacing:1.2, marginBottom:12 }}>{t('rev_eye')}</div>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:700, color:'#0f1f3d', letterSpacing:-1, marginBottom:16 }}>{t('rev_h')}</h2>
          <p style={{ fontSize:16, color:'#64748b', maxWidth:480, margin:'0 auto' }}>{t('rev_sub')}</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
          {testimonials.map(r => (
            <div key={r.id} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:28 }}>
              <div style={{ color:'#f59e0b', fontSize:15, marginBottom:14, letterSpacing:2 }}>★★★★★</div>
              <p style={{ fontSize:14, color:'#475569', lineHeight:1.8, marginBottom:20 }}>
                {lang === 'bn' ? r.textBn : r.text}
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:42, height:42, borderRadius:'50%', background:r.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, flexShrink:0 }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:'#0f1f3d' }}>{r.author}</div>
                  <div style={{ fontSize:12, color:'#94a3b8' }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section style={{
        background:'linear-gradient(135deg, #0f1f3d 0%, #1a3560 60%, #0e2a52 100%)',
        color:'#fff', padding:'88px 24px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 50% 110%, rgba(37,99,235,0.22) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'relative' }}>
          <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:700, marginBottom:18, letterSpacing:-1.2 }}>{t('cta_h')}</h2>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.65)', marginBottom:40, maxWidth:460, margin:'0 auto 36px' }}>{t('cta_sub')}</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/signup')} style={{
              padding:'13px 32px', borderRadius:10, fontSize:15, fontWeight:700,
              background:'#2563eb', color:'#fff', border:'none', cursor:'pointer',
              fontFamily:'inherit', transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#1d4ed8'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background='#2563eb'; e.currentTarget.style.transform='translateY(0)' }}
            >{t('cta_a')}</button>
            <button onClick={() => navigate('/listings')} style={{
              padding:'13px 32px', borderRadius:10, fontSize:15, fontWeight:600,
              background:'transparent', color:'rgba(255,255,255,0.8)',
              border:'1.5px solid rgba(255,255,255,0.25)', cursor:'pointer',
              fontFamily:'inherit', transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.6)'; e.currentTarget.style.color='#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'; e.currentTarget.style.color='rgba(255,255,255,0.8)' }}
            >{t('cta_b')}</button>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  )
}
