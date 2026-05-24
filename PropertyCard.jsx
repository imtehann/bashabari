// src/components/cards/PropertyCard.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MapPin, BedDouble, Bath, Maximize2, BadgeCheck, MessageCircle } from 'lucide-react'
import { useSaved } from '../../context/SavedContext'
import { useLanguage } from '../../context/LanguageContext'
import { formatPrice, truncate, whatsappUrl } from '../../utils/formatters'

export default function PropertyCard({ property, index = 0 }) {
  const { toggleSave, isSaved } = useSaved()
  const { lang, t }             = useLanguage()
  const [imgLoaded, setImgLoaded] = useState(false)

  if (!property) return null

  const {
    id, title, titleBn, area, city, price, bedrooms, bathrooms, size,
    available, verified, negotiable, images, type, landlord,
  } = property

  const saved = isSaved(id)
  const displayTitle = lang === 'bn' && titleBn ? titleBn : title
  const whatsappMsg  = `Hi, I found your listing "${title}" on Bashabari and I'm interested. Can we chat?`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="card group h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-surface-muted shrink-0">
        {!imgLoaded && <div className="shimmer absolute inset-0" />}
        <img
          src={images?.[0]}
          alt={displayTitle}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {verified && (
            <span className="badge-verified badge text-[11px]">
              <BadgeCheck size={11} />
              {t.common.verified}
            </span>
          )}
          {!available && (
            <span className="badge bg-red-100 text-red-600 text-[11px]">
              {t.listings.rented}
            </span>
          )}
          {negotiable && available && (
            <span className="badge bg-amber-100 text-amber-700 text-[11px]">
              {t.listings.negotiable}
            </span>
          )}
        </div>

        {/* Save button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.preventDefault(); toggleSave(id, displayTitle) }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
                     flex items-center justify-center shadow-soft transition-all hover:scale-110"
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          <Heart
            size={15}
            className={saved ? 'text-red-500 fill-red-500' : 'text-slate-500'}
          />
        </motion.button>

        {/* Type pill */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-semibold bg-navy-900/75 text-white backdrop-blur-sm px-2.5 py-1 rounded-full capitalize">
            {type}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Location */}
        <div className="flex items-center gap-1 text-slate-400 text-xs mb-1.5">
          <MapPin size={11} />
          <span>{area}, {city}</span>
        </div>

        {/* Title */}
        <Link to={`/property/${id}`}>
          <h3 className="font-heading font-semibold text-navy-900 text-[15px] leading-snug
                         hover:text-brand-600 transition-colors line-clamp-2 mb-3">
            {displayTitle}
          </h3>
        </Link>

        {/* Specs */}
        <div className="flex items-center gap-3 text-slate-500 text-xs mb-4">
          <span className="flex items-center gap-1">
            <BedDouble size={12} className="text-brand-400" />
            {bedrooms} {lang === 'bn' ? 'বেড' : 'bed'}
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1">
            <Bath size={12} className="text-brand-400" />
            {bathrooms} {lang === 'bn' ? 'বাথ' : 'bath'}
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1">
            <Maximize2 size={12} className="text-brand-400" />
            {size} {lang === 'bn' ? 'বর্গফুট' : 'sqft'}
          </span>
        </div>

        {/* Landlord row */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={landlord.avatar}
            alt={landlord.name}
            className="w-6 h-6 rounded-full border border-surface-border object-cover"
          />
          <span className="text-xs text-slate-500">{landlord.name}</span>
          {landlord.verified && (
            <BadgeCheck size={13} className="text-emerald-500 ml-auto" />
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-surface-border">
          <div>
            <p className="text-[11px] text-slate-400 mb-0.5">{lang === 'bn' ? 'প্রতি মাসে' : 'per month'}</p>
            <p className="price-tag text-lg">{formatPrice(price, lang)}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={whatsappUrl(landlord.whatsapp, whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-100
                         flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} className="text-emerald-600" />
            </a>
            <Link
              to={`/property/${id}`}
              className="btn-secondary btn-sm btn text-xs"
            >
              {t.listings.details}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
