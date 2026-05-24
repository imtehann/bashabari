// src/components/ui/EmptyState.jsx
import { motion } from 'framer-motion'
import Button from './Button'

export default function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-muted flex items-center justify-center mb-5 text-slate-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-heading font-semibold text-navy-900 mb-2">{title}</h3>
      {subtitle && <p className="body-md max-w-xs mb-6">{subtitle}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} size="md">{actionLabel}</Button>
      )}
    </motion.div>
  )
}
