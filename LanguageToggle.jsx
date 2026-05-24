// src/components/ui/LanguageToggle.jsx
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function LanguageToggle({ compact = false }) {
  const { lang, setLanguage } = useLanguage()

  return (
    <div
      className={`relative flex items-center bg-slate-100 rounded-full p-0.5 ${
        compact ? 'h-8' : 'h-9'
      }`}
      role="group"
      aria-label="Language switcher"
    >
      {/* Sliding pill */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-navy-900 shadow-sm"
        animate={{ left: lang === 'en' ? '2px' : '50%', right: lang === 'en' ? '50%' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />

      {/* EN button */}
      <button
        onClick={() => setLanguage('en')}
        className={`relative z-10 px-3.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
          compact ? 'py-1' : 'py-1.5'
        } ${lang === 'en' ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>

      {/* BN button */}
      <button
        onClick={() => setLanguage('bn')}
        className={`relative z-10 px-3.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
          compact ? 'py-1' : 'py-1.5'
        } ${lang === 'bn' ? 'text-white' : 'text-slate-500 hover:text-slate-800'} font-bangla`}
        aria-pressed={lang === 'bn'}
      >
        বাং
      </button>
    </div>
  )
}
