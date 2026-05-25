import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { useLang } from '../../context/LangContext'
import { properties } from '../../data/properties'
import PropertyCard from '../../components/cards/PropertyCard'

const AREAS = ['Dhanmondi','Gulshan','Mirpur','Mohammadpur','Banani','Uttara','Bashundhara','Lalmatia']

function FilterSelect({ label, value, onChange, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:0.8, marginBottom:8 }}>{label}</label>
      <div style={{ position:'relative' }}>
        <select value={value} onChange={e => onChange(e.target.value)} style={{
          width:'100%', padding:'10px 36px 10px 14px', border:'1.5px solid #e2e8f0',
          borderRadius:9, fontSize:14, fontFamily:'inherit', color:'#0f172a',
          outline:'none', appearance:'none', background:'#fff', cursor:'pointer', transition:'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor='#2563eb'}
        onBlur={e => e.target.style.borderColor='#e2e8f0'}
        >
          {children}
        </select>
        <ChevronDown size={15} color="#94a3b8" style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
      </div>
    </div>
  )
}

export default function ListingsPage() {
  const { t } = useLang()
  const [sp] = useSearchParams()

  const [filters, setFilters] = useState({
    type: sp.get('type') || '',
    area: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    verified: '',
    sort: 'default',
  })
  const [search, setSearch] = useState(sp.get('q') || '')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const set = (k, v) => setFilters(f => ({ ...f, [k]: v }))
  const clear = () => { setFilters({ type:'', area:'', minPrice:'', maxPrice:'', beds:'', verified:'', sort:'default' }); setSearch('') }

  const results = useMemo(() => {
    let r = [...properties]
    if (filters.type)     r = r.filter(p => p.type === filters.type)
    if (filters.area)     r = r.filter(p => p.area === filters.area)
    if (filters.beds)     r = r.filter(p => filters.beds === '4' ? p.beds >= 4 : p.beds === +filters.beds)
    if (filters.verified) r = r.filter(p => p.verified)
    if (filters.minPrice) r = r.filter(p => p.price >= +filters.minPrice)
    if (filters.maxPrice) r = r.filter(p => p.price <= +filters.maxPrice)
    if (search) r = r.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.area.toLowerCase().includes(search.toLowerCase()))
    if (filters.sort === 'price-asc')  r.sort((a,b) => a.price - b.price)
    if (filters.sort === 'price-desc') r.sort((a,b) => b.price - a.price)
    if (filters.sort === 'newest')     r.sort((a,b) => a.dateAdded - b.dateAdded)
    return r
  }, [filters, search])

  const Sidebar = () => (
    <aside style={{
      width:264, flexShrink:0, background:'#fff',
      borderRight:'1px solid #e2e8f0', padding:24,
      position:'sticky', top:64, height:'calc(100vh - 64px)', overflowY:'auto',
    }} className="sidebar-desktop">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <span style={{ fontSize:16, fontWeight:700, color:'#0f1f3d' }}>{t('filt_title')}</span>
        <button onClick={clear} style={{ fontSize:12, color:'#64748b', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', fontWeight:500 }}>{t('filt_clear')}</button>
      </div>

      <FilterSelect label={t('filt_type')} value={filters.type} onChange={v => set('type', v)}>
        <option value="">{t('fall_type')}</option>
        <option value="apartment">{t('chip_apartment')}</option>
        <option value="family">{t('chip_family')}</option>
        <option value="bachelor">{t('chip_bachelor')}</option>
        <option value="sublet">{t('chip_sublet')}</option>
      </FilterSelect>

      <FilterSelect label={t('filt_area')} value={filters.area} onChange={v => set('area', v)}>
        <option value="">{t('fall_area')}</option>
        {AREAS.map(a => <option key={a}>{a}</option>)}
      </FilterSelect>

      <div style={{ marginBottom:20 }}>
        <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:0.8, marginBottom:8 }}>{t('filt_price')}</label>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[['minPrice', t('fmin')], ['maxPrice', t('fmax')]].map(([k, ph]) => (
            <input key={k} type="number" value={filters[k]} onChange={e => set(k, e.target.value)}
              placeholder={ph} style={{
                padding:'10px 12px', border:'1.5px solid #e2e8f0', borderRadius:9,
                fontSize:14, fontFamily:'inherit', outline:'none', width:'100%', transition:'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor='#2563eb'}
              onBlur={e => e.target.style.borderColor='#e2e8f0'}
            />
          ))}
        </div>
      </div>

      <FilterSelect label={t('filt_beds')} value={filters.beds} onChange={v => set('beds', v)}>
        <option value="">{t('fall_bed')}</option>
        <option value="1">{t('f1b')}</option>
        <option value="2">{t('f2b')}</option>
        <option value="3">{t('f3b')}</option>
        <option value="4">{t('f4b')}</option>
      </FilterSelect>

      <FilterSelect label={t('filt_ver')} value={filters.verified} onChange={v => set('verified', v)}>
        <option value="">{t('fall_ver')}</option>
        <option value="true">{t('fver_only')}</option>
      </FilterSelect>
    </aside>
  )

  return (
    <div style={{ paddingTop:64, display:'flex', minHeight:'100vh', background:'#f8fafc' }}>
      <Sidebar />

      <main style={{ flex:1, padding:28, maxWidth:'100%', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:700, color:'#0f1f3d', letterSpacing:-0.5 }}>
              {results.length} {t('res_found')}
            </h1>
          </div>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder={t('search_ph')}
              style={{ padding:'9px 16px', border:'1.5px solid #e2e8f0', borderRadius:9, fontSize:14, fontFamily:'inherit', outline:'none', width:220, transition:'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor='#2563eb'}
              onBlur={e => e.target.style.borderColor='#e2e8f0'}
            />
            <div style={{ position:'relative' }}>
              <select value={filters.sort} onChange={e => set('sort', e.target.value)} style={{
                padding:'9px 36px 9px 14px', border:'1.5px solid #e2e8f0', borderRadius:9,
                fontSize:13, fontFamily:'inherit', outline:'none', appearance:'none', background:'#fff', cursor:'pointer',
              }}>
                <option value="default">{t('sort_rel')}</option>
                <option value="price-asc">{t('sort_pa')}</option>
                <option value="price-desc">{t('sort_pd')}</option>
                <option value="newest">{t('sort_new')}</option>
              </select>
              <ChevronDown size={14} color="#94a3b8" style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 24px' }}>
            <div style={{ fontSize:56, marginBottom:16, opacity:0.25 }}>🔍</div>
            <h3 style={{ fontSize:20, fontWeight:600, color:'#0f1f3d', marginBottom:8 }}>{t('no_res_h')}</h3>
            <p style={{ color:'#64748b', marginBottom:24 }}>{t('no_res_p')}</p>
            <button onClick={clear} style={{ padding:'10px 24px', background:'#0f1f3d', color:'#fff', border:'none', borderRadius:9, fontFamily:'inherit', fontWeight:600, cursor:'pointer', fontSize:14 }}>
              {t('filt_clear')}
            </button>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:20 }}>
            {results.map(p => <PropertyCard key={p.id} property={p}/>)}
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 768px) { .sidebar-desktop { display: none !important; } }
      `}</style>
    </div>
  )
}
