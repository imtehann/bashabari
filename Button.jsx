// src/components/ui/Button.jsx
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const variants = {
  primary:   'bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-900 shadow-soft',
  secondary: 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500 shadow-soft',
  outline:   'bg-transparent text-navy-900 border border-surface-border hover:bg-surface-soft focus:ring-navy-900',
  ghost:     'bg-transparent text-slate-600 hover:bg-surface-muted hover:text-navy-900 focus:ring-slate-300',
  danger:    'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  emerald:   'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500',
}

const sizes = {
  xs:  'px-3 py-1.5 text-xs',
  sm:  'px-4 py-2 text-sm',
  md:  'px-5 py-2.5 text-sm',
  lg:  'px-7 py-3.5 text-base',
  xl:  'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  icon,
  iconRight,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) {
  const base = `inline-flex items-center justify-center gap-2 font-body font-semibold
    rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    cursor-pointer select-none ${fullWidth ? 'w-full' : ''}`

  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      whileHover={isDisabled ? {} : { y: -1 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span className="shrink-0">{iconRight}</span>
      )}
    </motion.button>
  )
}
