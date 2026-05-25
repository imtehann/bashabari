import { useNavigate } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, ShieldCheck, Heart } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { useSaved } from '../../context/SavedContext'
import { useToast } from '../../context/ToastContext'

const BADGE_COLORS = {
  Premium: { bg:'#eff6ff', color:'#1d4ed8' },
  Luxury:  { bg:'#fdf4ff', color:'#7e22ce' },
  Family:  { bg:'#f0fdf4', color:'#15803d' },
  Popular: { bg:'#fff7ed', color:'#c2410c' },
  New:     { bg:'#ecfdf5', color:'#059669' },
  Budget:  { bg:'#f8fafc', color:'#475569' },
  Bachelor:{ bg:'#eff6ff', color:'#2563eb' },
  Sublet:  { bg:'#fdf4ff', color:'#9333ea' },
}

export default function PropertyCard({ property }) {
  const { t, lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const { add } = useToast()
  const navigate = useNavigate()
  const saved = isSaved(property.id)

  const title = lang === 'bn' ? property.titleBn : property.title
  const area  = lang === 'bn' ? property.areaBn  : property.area
  const bc = BADGE_COLORS[property.badge] || BADGE_COLORS.Budget

  const handleSave = (e) => {
    e.stopPropagation()
    toggle(property.id)
    add(saved ? t('toast_unsaved') : t('toast_saved'), saved ? 'info' : 'success')
  }

  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      style={{
        background:'#fff', borderRadius:16, overflow:'hidden',
        border:'1px solid #e2e8f0', cursor:'pointer', transition:'all 0.25s',
        boxShadow:'0 1px 4px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor='transparent' }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor='#e2e8f0' }}
    >
      {/* Image */}
      <div style={{ position:'relative', height:200 }}>
        <div className={property.img} style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg viewBox="0 0 80 60" width={80} height={60} fill="none" style={{ opacity:0.25 }}>
            <rect x={10} y={25} width={60} height={35} rx={3} fill="#fff"/>
            <path d="M5 28L40 5l35 23" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"/>
            <rect x={28} y={38} width={12} height={22} rx={2} fill="#0f1f3d"/>
            <rect x={44} y={38} width={16} height={14} rx={2} fill="#0f1f3d"/>
          </svg>
        </div>

        {/* Badge */}
        <div style={{
          position:'absolute', top:12, left:12,
          background: bc.bg, color: bc.color,
          fontSize:11, fontWeight:700, padding:'4px 10px',
          borderRadius:999, letterSpacing:0.3,
        }}>
          {property.badge}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          style={{
            position:'absolute', top:10, right:10,
            width:34, height:34, borderRadius:'50%',
            background:'rgba(255,255,255,0.92)',
            backdropFilter:'blur(8px)',
            border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.2s', boxShadow:'0 2px 8px rgba(0,0,0,0.12)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform='scale(1.12)'}
          onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
        >
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} stroke={saved ? '#ef4444' : '#64748b'} />
        </button>

        {/* Views */}
        <div style={{
          position:'absolute', bottom:10, right:12,
          background:'rgba(0,0,0,0.5)', color:'#fff',
          fontSize:11, fontWeight:500, padding:'3px 8px',
          borderRadius:999, backdropFilter:'blur(6px)',
        }}>
          👁 {property.views}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:'16px 18px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#94a3b8', marginBottom:6 }}>
          <MapPin size={11}/> <span>{area}, Dhaka</span>
          {property.floor && <span style={{ marginLeft:'auto', fontSize:11, color:'#94a3b8' }}>{property.floor} Floor</span>}
        </div>

        <h3 style={{ fontSize:15, fontWeight:600, color:'#0f1f3d', margin:'0 0 10px', lineHeight:1.35, letterSpacing:-0.2 }}>
          {title}
        </h3>

        <div style={{ fontSize:22, fontWeight:700, color:'#2563eb', marginBottom:10, letterSpacing:-0.5 }}>
          ৳{property.price.toLocaleString()}
          <span style={{ fontSize:13, fontWeight:400, color:'#94a3b8' }}>{t('per_mo')}</span>
        </div>

        {property.verified && (
          <div style={{
            display:'inline-flex', alignItems:'center', gap:5,
            background:'#f0fdf4', color:'#059669',
            fontSize:11, fontWeight:600, padding:'4px 10px',
            borderRadius:999, marginBottom:12,
          }}>
            <ShieldCheck size={12}/> {t('verified_ll')}
          </div>
        )}

        <div style={{
          display:'flex', gap:14, fontSize:12, color:'#64748b',
          borderTop:'1px solid #f1f5f9', paddingTop:12, marginTop: property.verified ? 0 : 12,
        }}>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><Bed size={13}/> {property.beds} {t('beds')}</span>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><Bath size={13}/> {property.baths} {t('baths')}</span>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><Square size={13}/> {property.sqft} {t('sqft')}</span>
          <div style={{ marginLeft:'auto', display:'flex', gap:2 }}>
            {'★'.repeat(Math.round(property.rating))}
            <span style={{ color:'#94a3b8', marginLeft:3 }}>{property.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
