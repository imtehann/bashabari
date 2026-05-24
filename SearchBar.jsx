// src/components/search/SearchBar.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Home, DollarSign, BedDouble, SlidersHorizontal, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'

export default function SearchBar({ hero = false, initialValues = {} }) {
  const { t, lang } = useLanguage()
  const navigate    = useNavigate()

  const [query,    setQuery]    = useState(initialValues.query || '')
  const [type,     setType]     = useState(initialValues.type  || '')
  const [budget,   setBudget]   = useState(initialValues.budget || '')
  const [beds,     setBeds]     = useState(initialValues.beds  || '')
  const [showMore, setShowMore] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query)  params.set('q',      query)
    if (type)   params.set('type',   type)
    if (budget) params.set('budget', budget)
    if (beds)   params.set('beds',   beds)
    navigate(`/listings?${params.toString()}`)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const clear = () => {
    setQuery(''); setType(''); setBudget(''); setBeds('')
  }

  const types   = Object.entries(t.search.types)
  const budgets = Object.entries(t.search.budgets)
  const bedOpts = Object.entries(t.search.beds)

  if (hero) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-3xl"
      >
        {/* Main search row */}
        <div className="glass rounded-2xl p-2 shadow-glass">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t.search.placeholder}
                className="flex-1 bg-transparent text-navy-900 placeholder-slate-400 text-sm
                           outline-none font-body py-2.5"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="h-8 w-px bg-surface-border shrink-0 hide-mobile" />

            {/* Type quick select */}
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="hide-mobile bg-transparent text-sm text-slate-600 outline-none cursor-pointer pr-2 py-2 font-body"
            >
              {types.map(([k, v]) => (
                <option key={k} value={k === 'all' ? '' : k}>{v}</option>
              ))}
            </select>

            <div className="h-8 w-px bg-surface-border shrink-0 hide-mobile" />

            <button
              onClick={() => setShowMore(v => !v)}
              className="hide-mobile flex items-center gap-1.5 text-sm text-slate-600 hover:text-navy-900 py-2 px-2"
            >
              <SlidersHorizontal size={15} />
              <span className="text-sm font-medium">{t.search.filters}</span>
            </button>

            <Button onClick={handleSearch} size="md" className="shrink-0 px-6">
              <Search size={15} />
              {t.search.btn}
            </Button>
          </div>

          {/* Extended filters */}
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-surface-border px-1">
                  <div>
                    <label className="input-label">{t.search.budget}</label>
                    <select value={budget} onChange={e => setBudget(e.target.value)} className="input py-2.5 text-sm">
                      {budgets.map(([k, v]) => (
                        <option key={k} value={k === 'all' ? '' : k}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">{t.search.bedrooms}</label>
                    <select value={beds} onChange={e => setBeds(e.target.value)} className="input py-2.5 text-sm">
                      {bedOpts.map(([k, v]) => (
                        <option key={k} value={k === 'any' ? '' : k.replace('four', '4').replace('three','3').replace('two','2').replace('one','1')}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-2 px-1 pb-1">
                  <button onClick={clear} className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1">
                    <X size={12} /> {t.search.clear}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

  // Compact version for listings page
  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex items-center gap-2 input flex-1 min-w-48">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder={t.search.placeholder}
          className="flex-1 bg-transparent outline-none text-sm font-body placeholder-slate-400"
        />
      </div>
      <select value={type} onChange={e => setType(e.target.value)} className="input w-auto text-sm">
        {types.map(([k, v]) => (
          <option key={k} value={k === 'all' ? '' : k}>{v}</option>
        ))}
      </select>
      <select value={budget} onChange={e => setBudget(e.target.value)} className="input w-auto text-sm">
        {budgets.map(([k, v]) => (
          <option key={k} value={k === 'all' ? '' : k}>{v}</option>
        ))}
      </select>
      <Button onClick={handleSearch} size="md">
        <Search size={15} />
        {t.search.btn}
      </Button>
    </div>
  )
}
