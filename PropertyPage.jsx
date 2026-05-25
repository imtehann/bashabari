import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Bed, Bath, Square, ShieldCheck, Phone, Share2, Heart } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { useSaved } from '../../context/SavedContext'
import { useToast } from '../../context/ToastContext'
import { properties } from '../../data/properties'

export default function PropertyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const { add } = useToast()

  const p = properties.find(x => x.id === +id)

  if (!p) return (
    <div style={{ paddingTop:64, display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:64, opacity:0.2 }}>🏠</div>
      <h2 style={{ fontSize:22, fontWeight:600, color:'#0f1f3d' }}>Property not found</h2>
      <button onClick={() => navigate('/listings')} style={{ padding:'10px 24px', background:'#0f1f3d', color:'#fff', border:'none', borderRadius:9, fontFamily:'inherit', fontSize:14, cursor:'pointer', fontWeight:600 }}>
        {t('back')}
      </button>
    </div>
  )

  const saved = isSaved(p.id)
  const title = lang === 'bn' ? p.titleBn : p.title
  const area  = lang === 'bn' ? p.areaBn  : p.area
  const desc  = lang === 'bn' ? p.descBn  : p.desc

  const handleSave = () => { toggle(p.id); add(saved ? t('toast_unsaved') : t('toast_saved')) }
  const handleWA   = () => { add(t('toast_wa')); window.open(`https://wa.me/880${p.phone}?text=Hi, I saw your listing "${p.title}" on Bashabari and I'm interested.`, '_blank') }
  const handleCall = () => add(t('toast_call'))

  const related = properties.filter(x => x.area === p.area && x.id !== p.id).slice(0, 3)

  return (
    <div style={{ paddingTop:64, background:'#f8fafc', minHeight:'100vh' }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'28px 24px' }}>

        {/* Back */}
        <button onClick={() => navigate(-1)} style={{
          display:'inline-flex', alignItems:'center', gap:8, background:'none', border:'none',
          cursor:'pointer', color:'#64748b', fontSize:14, fontFamily:'inherit', fontWeight:500,
          marginBottom:24, padding:'6px 0', transition:'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color='#0f1f3d'}
        onMouseLeave={e => e.currentTarget.style.color='#64748b'}
        >
          <ArrowLeft size={16}/> {t('back')}
        </button>

        {/* Gallery */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gridTemplateRows:'240px 240px', gap:8, borderRadius:18, overflow:'hidden', marginBottom:36 }} className="gallery">
          <div className={p.img} style={{ gridRow:'1/3', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 120 90" width={120} fill="none" style={{ opacity:0.2 }}>
              <rect x={15} y={38} width={90} height={52} rx={4} fill="#fff"/>
              <path d="M5 42L60 8l55 34" stroke="#fff" strokeWidth={6} strokeLinecap="round"/>
              <rect x={42} y={57} width={18} height={33} rx={3} fill="#0f1f3d"/>
              <rect x={66} y={57} width={24} height={21} rx={3} fill="#0f1f3d"/>
            </svg>
          </div>
          {[1,2].map(i => (
            <div key={i} className={p.img} style={{ display:'flex', alignItems:'center', justifyContent:'center', filter:'brightness(0.88)' }}>
              <svg viewBox="0 0 60 45" width={60} fill="none" style={{ opacity:0.2 }}>
                <rect x={8} y={19} width={44} height={26} rx={2} fill="#fff"/>
                <path d="M3 21L30 4l27 17" stroke="#fff" strokeWidth={3} strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:32 }} className="detail-grid">

          {/* Left */}
          <div>
            {p.verified && (
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#f0fdf4', color:'#059669', fontSize:12, fontWeight:700, padding:'5px 12px', borderRadius:999, marginBottom:14 }}>
                <ShieldCheck size={13}/> {t('verified_ll')}
              </div>
            )}
            <h1 style={{ fontSize:'clamp(22px,3vw,32px)', fontWeight:700, color:'#0f1f3d', letterSpacing:-0.8, marginBottom:10 }}>{title}</h1>
            <div style={{ display:'flex', alignItems:'center', gap:6, color:'#64748b', fontSize:14, marginBottom:28 }}>
              <MapPin size={15}/> {area}, Dhaka &nbsp;·&nbsp; {p.floor} Floor &nbsp;·&nbsp; ★{p.rating} &nbsp;·&nbsp; <Eye size={13}/> {p.views} views
            </div>

            {/* Features */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:32 }}>
              {[
                [p.beds, t('beds'), <Bed size={18} color="#2563eb"/>],
                [p.baths, t('baths'), <Bath size={18} color="#2563eb"/>],
                [p.sqft, t('sqft'), <Square size={18} color="#2563eb"/>],
              ].map(([val, lbl, icon]) => (
                <div key={lbl} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'16px', textAlign:'center' }}>
                  <div style={{ display:'flex', justifyContent:'center', marginBottom:6 }}>{icon}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:'#0f1f3d', letterSpacing:-0.5 }}>{val}</div>
                  <div style={{ fontSize:11, color:'#94a3b8', textTransform:'uppercase', letterSpacing:0.5, marginTop:2 }}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom:28 }}>
              <h2 style={{ fontSize:17, fontWeight:700, color:'#0f1f3d', marginBottom:12 }}>{t('about_prop')}</h2>
              <p style={{ fontSize:15, color:'#475569', lineHeight:1.85 }}>{desc}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 style={{ fontSize:17, fontWeight:700, color:'#0f1f3d', marginBottom:14 }}>{t('amenities')}</h2>
              <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>
                {p.amenities.map(a => (
                  <span key={a} style={{ background:'#eff6ff', color:'#1d4ed8', fontSize:13, fontWeight:500, padding:'7px 14px', borderRadius:999 }}>
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact Card */}
          <div>
            <div style={{
              background:'#fff', border:'1px solid #e2e8f0', borderRadius:18,
              padding:28, position:'sticky', top:88,
              boxShadow:'0 4px 24px rgba(0,0,0,0.07)',
            }}>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:32, fontWeight:800, color:'#2563eb', letterSpacing:-1 }}>
                  ৳{p.price.toLocaleString()}
                  <span style={{ fontSize:15, fontWeight:400, color:'#94a3b8' }}>{t('per_mo')}</span>
                </div>
                <div style={{ fontSize:13, color:'#94a3b8', marginTop:4 }}>
                  {t('sec_dep')}: ৳{(p.price * 2).toLocaleString()}
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 0', borderTop:'1px solid #f1f5f9', borderBottom:'1px solid #f1f5f9', marginBottom:20 }}>
                <div style={{
                  width:50, height:50, borderRadius:'50%',
                  background:'#0f1f3d', color:'#fff', display:'flex',
                  alignItems:'center', justifyContent:'center',
                  fontSize:16, fontWeight:700, flexShrink:0,
                }}>
                  {p.landlord.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:'#0f1f3d' }}>{p.landlord}</div>
                  <div style={{ fontSize:12, color: p.verified ? '#059669' : '#94a3b8', fontWeight:500 }}>
                    {p.verified ? '✓ Verified Landlord' : 'Unverified'}
                  </div>
                </div>
              </div>

              <button onClick={handleCall} style={{
                width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                padding:'13px', borderRadius:10, fontSize:15, fontWeight:600,
                background:'#0f1f3d', color:'#fff', border:'none', cursor:'pointer',
                fontFamily:'inherit', transition:'all 0.2s', marginBottom:10,
              }}
              onMouseEnter={e => e.currentTarget.style.background='#1a3560'}
              onMouseLeave={e => e.currentTarget.style.background='#0f1f3d'}
              >
                <Phone size={16}/> {t('call_ll')}
              </button>

              <button onClick={handleWA} style={{
                width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                padding:'13px', borderRadius:10, fontSize:15, fontWeight:600,
                background:'#25D366', color:'#fff', border:'none', cursor:'pointer',
                fontFamily:'inherit', transition:'all 0.2s', marginBottom:10,
              }}
              onMouseEnter={e => { e.currentTarget.style.background='#22c55e'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='#25D366'; e.currentTarget.style.transform='translateY(0)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.112 1.532 5.84L0 24l6.335-1.51A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.892 0-3.659-.5-5.186-1.377l-.371-.221-3.862.919.961-3.738-.243-.389A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                {t('wa_btn')}
              </button>

              <button onClick={handleSave} style={{
                width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                padding:'11px', borderRadius:10, fontSize:14, fontWeight:600,
                background:'transparent', color: saved ? '#ef4444' : '#64748b',
                border:`1.5px solid ${saved ? '#fecdd3' : '#e2e8f0'}`,
                cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s',
              }}>
                <Heart size={15} fill={saved ? '#ef4444' : 'none'} stroke={saved ? '#ef4444' : '#64748b'}/>
                {saved ? t('saved_btn') : t('save_btn')}
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop:56 }}>
            <h2 style={{ fontSize:20, fontWeight:700, color:'#0f1f3d', marginBottom:20 }}>More in {area}</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:18 }}>
              {related.map(rp => <PropertyCard key={rp.id} property={rp}/>)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gallery { grid-template-columns: 1fr !important; grid-template-rows: 220px !important; }
          .gallery > div:nth-child(2), .gallery > div:nth-child(3) { display: none; }
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
