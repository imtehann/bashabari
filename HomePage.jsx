// src/pages/home/HomePage.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, BadgeCheck, ShieldCheck, Handshake,
  MessageCircleHeart, Star, ChevronRight, TrendingUp,
  Home, Building2, Users,
} from 'lucide-react'
import { useLanguage }   from '../../context/LanguageContext'
import { getFeatured, STATS, TESTIMONIALS } from '../../data/properties'
import PropertyCard      from '../../components/cards/PropertyCard'
import SearchBar         from '../../components/search/SearchBar'
import Button            from '../../components/ui/Button'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// ─── Animated counter ──────────────────────────────────────────────────
function StatItem({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="font-heading font-bold text-3xl sm:text-4xl text-white mb-1">{value}</p>
      <p className="text-sm text-blue-200">{label}</p>
    </motion.div>
  )
}

// ─── Section header ────────────────────────────────────────────────────
function SectionHeader({ badge, title, subtitle, lang }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {badge && (
        <span className={`label-sm mb-3 inline-block text-brand-500 ${lang === 'bn' ? 'font-bangla' : ''}`}>
          {badge}
        </span>
      )}
      <h2 className={`heading-lg text-navy-900 mb-4 ${lang === 'bn' ? 'font-bangla' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`body-lg ${lang === 'bn' ? 'font-bangla' : ''}`}>{subtitle}</p>
      )}
    </div>
  )
}

// ─── Trust card ────────────────────────────────────────────────────────
const TRUST_ICONS = [BadgeCheck, ShieldCheck, Handshake, MessageCircleHeart]

function TrustCard({ icon: Icon, title, desc, index, lang }) {
  const { ref, inView } = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-6 group hover:border-brand-200 transition-all"
    >
      <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center mb-4
                      group-hover:bg-navy-900 transition-colors">
        <Icon size={22} className="text-navy-900 group-hover:text-white transition-colors" />
      </div>
      <h3 className={`font-heading font-semibold text-navy-900 mb-2 ${lang === 'bn' ? 'font-bangla' : ''}`}>
        {title}
      </h3>
      <p className={`text-sm text-slate-500 leading-relaxed ${lang === 'bn' ? 'font-bangla' : ''}`}>
        {desc}
      </p>
    </motion.div>
  )
}

// ─── Testimonial card ───────────────────────────────────────────────────
function TestimonialCard({ testimonial, index, lang }) {
  const { ref, inView } = useScrollReveal()
  const text = lang === 'bn' ? testimonial.textBn : testimonial.text
  const name = lang === 'bn' ? testimonial.nameBn : testimonial.name
  const role = lang === 'bn' ? testimonial.roleBn : testimonial.role

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-6 flex flex-col gap-4"
    >
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className={`text-slate-600 text-sm leading-relaxed flex-1 ${lang === 'bn' ? 'font-bangla' : ''}`}>
        "{text}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-surface-border">
        <img src={testimonial.avatar} alt={name}
          className="w-10 h-10 rounded-full object-cover border border-surface-border" />
        <div>
          <p className={`font-semibold text-navy-900 text-sm ${lang === 'bn' ? 'font-bangla' : ''}`}>{name}</p>
          <p className={`text-xs text-slate-400 ${lang === 'bn' ? 'font-bangla' : ''}`}>{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main HomePage ──────────────────────────────────────────────────────
export default function HomePage() {
  const { t, lang } = useLanguage()
  const featured    = getFeatured()
  const { ref: ctaRef, inView: ctaInView } = useScrollReveal()

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-800 to-navy-700 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        {/* Soft blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

        <div className="container-app relative z-10 py-20 sm:py-28 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20
                         rounded-full px-4 py-1.5 text-sm text-blue-200 mb-8"
            >
              <BadgeCheck size={14} className="text-emerald-400" />
              <span className={lang === 'bn' ? 'font-bangla' : ''}>{t.hero.badge}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`heading-xl text-white mb-6 ${lang === 'bn' ? 'font-bangla' : ''}`}
            >
              {t.hero.heading1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-brand-400">
                {t.hero.heading2}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className={`text-lg sm:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed ${lang === 'bn' ? 'font-bangla' : ''}`}
            >
              {t.hero.subheading}
            </motion.p>

            {/* Search */}
            <div className="flex justify-center mb-10">
              <SearchBar hero />
            </div>

            {/* Quick type pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-center gap-2 flex-wrap"
            >
              <span className="text-xs text-blue-300 mr-1">
                {lang === 'bn' ? 'দ্রুত খুঁজুন:' : 'Quick:'}
              </span>
              {['Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Mirpur'].map(area => (
                <Link
                  key={area}
                  to={`/listings?q=${area}`}
                  className="text-xs bg-white/10 hover:bg-white/20 border border-white/20
                             text-white px-3 py-1.5 rounded-full transition-all"
                >
                  {area}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48V24C240 0 480 0 720 16C960 32 1200 48 1440 24V48H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────── */}
      <section className="bg-navy-900 py-8">
        <div className="container-app">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <StatItem value={STATS.listings}  label={t.hero.stats.listings} />
            <StatItem value={STATS.cities}    label={t.hero.stats.cities} />
            <StatItem value={STATS.landlords} label={t.hero.stats.landlords} />
            <StatItem value={STATS.renters}   label={t.hero.stats.renters} />
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ───────────────────────────────── */}
      <section className="section-padding bg-surface-soft">
        <div className="container-app">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className={`label-sm text-brand-500 block mb-2 ${lang === 'bn' ? 'font-bangla' : ''}`}>
                {lang === 'bn' ? 'বাছাই করা বাসা' : 'Handpicked for you'}
              </span>
              <h2 className={`heading-lg text-navy-900 ${lang === 'bn' ? 'font-bangla' : ''}`}>
                {t.listings.featured}
              </h2>
            </div>
            <Link to="/listings" className="hide-mobile">
              <Button variant="ghost" size="sm" iconRight={<ArrowRight size={16} />}>
                {t.listings.view_all}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/listings">
              <Button variant="outline" size="md" iconRight={<ArrowRight size={16} />}>
                {t.listings.view_all}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ───────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-app">
          <SectionHeader
            badge={lang === 'bn' ? 'কেন বাশাবাড়ি' : 'Why Bashabari'}
            title={t.trust.title}
            subtitle={t.trust.subtitle}
            lang={lang}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.trust.items.map((item, i) => (
              <TrustCard
                key={i}
                icon={TRUST_ICONS[i]}
                title={item.title}
                desc={item.desc}
                index={i}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="section-padding bg-surface-soft">
        <div className="container-app">
          <SectionHeader
            badge={lang === 'bn' ? 'মাত্র ৩ ধাপে' : 'Simple 3 steps'}
            title={lang === 'bn' ? 'কীভাবে কাজ করে' : 'How Bashabari Works'}
            lang={lang}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                step: '01',
                title:   lang === 'bn' ? 'খুঁজুন' : 'Search',
                titleBn: 'খুঁজুন',
                desc:    lang === 'bn' ? 'এলাকা, ধরন বা বাজেট দিয়ে হাজারো যাচাইকৃত বাসা ফিল্টার করুন।'
                       : 'Filter thousands of verified listings by area, type, or budget.',
                icon: <Home size={24} />,
              },
              {
                step: '02',
                title:   lang === 'bn' ? 'সরাসরি যোগাযোগ করুন' : 'Connect Directly',
                desc:    lang === 'bn' ? 'কোনো দালাল ছাড়াই সরাসরি যাচাইকৃত মালিকদের সাথে WhatsApp বা কলে কথা বলুন।'
                       : 'Talk to verified landlords directly via WhatsApp or call — no broker needed.',
                icon: <MessageCircleHeart size={24} />,
              },
              {
                step: '03',
                title:   lang === 'bn' ? 'চলে যান' : 'Move In',
                desc:    lang === 'bn' ? 'নিশ্চিত করুন, বাসা পরিদর্শন করুন এবং সহজেই উঠে পড়ুন।'
                       : 'Confirm your interest, visit the property, and move in stress-free.',
                icon: <Building2 size={24} />,
              },
            ].map((item, i) => {
              const { ref, inView } = useScrollReveal()
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 text-white flex items-center justify-center mb-4 mx-auto">
                    {item.icon}
                  </div>
                  <div className="font-heading font-bold text-4xl text-slate-100 mb-3 -mt-1 select-none">{item.step}</div>
                  <h3 className={`font-heading font-semibold text-navy-900 mb-2 ${lang === 'bn' ? 'font-bangla' : ''}`}>{item.title}</h3>
                  <p className={`text-sm text-slate-500 leading-relaxed ${lang === 'bn' ? 'font-bangla' : ''}`}>{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-app">
          <SectionHeader
            badge={lang === 'bn' ? 'সত্যিকারের অভিজ্ঞতা' : 'Real stories'}
            title={t.testimonials.title}
            subtitle={t.testimonials.subtitle}
            lang={lang}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t2, i) => (
              <TestimonialCard key={t2.id} testimonial={t2} index={i} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <section className="section-padding bg-navy-950">
        <div className="container-app">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-brand-600 to-navy-800 p-10 sm:p-14 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className={`heading-lg text-white mb-4 ${lang === 'bn' ? 'font-bangla' : ''}`}>
                {t.cta.find_title}
              </h2>
              <p className={`text-blue-100 mb-8 leading-relaxed ${lang === 'bn' ? 'font-bangla' : ''}`}>
                {t.cta.find_subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/listings">
                  <Button variant="secondary" size="lg" iconRight={<ArrowRight size={18} />}>
                    {t.cta.find_btn}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="lg"
                    className="border-white/40 text-white hover:bg-white/10 hover:text-white">
                    {t.cta.list_btn}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
