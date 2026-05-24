// src/utils/formatters.js

/**
 * Format price with Bengali taka symbol
 */
export function formatPrice(amount, locale = 'en') {
  if (locale === 'bn') {
    const bn = amount.toLocaleString('bn-BD')
    return `৳${bn}`
  }
  return `৳${amount.toLocaleString('en-US')}`
}

/**
 * Format number with locale-specific digits
 */
export function formatNumber(num, locale = 'en') {
  if (locale === 'bn') return num.toLocaleString('bn-BD')
  return num.toLocaleString('en-US')
}

/**
 * Format size in sqft
 */
export function formatSize(sqft, locale = 'en') {
  if (locale === 'bn') return `${sqft.toLocaleString('bn-BD')} বর্গফুট`
  return `${sqft.toLocaleString('en-US')} sqft`
}

/**
 * Truncate string
 */
export function truncate(str, length = 120) {
  if (!str) return ''
  return str.length > length ? str.slice(0, length) + '...' : str
}

/**
 * Generate WhatsApp URL
 */
export function whatsappUrl(phone, message = '') {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}

/**
 * Format date
 */
export function formatDate(dateStr, locale = 'en') {
  const date = new Date(dateStr)
  if (locale === 'bn') {
    return date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Get property type label
 */
export function getTypeLabel(type, lang = 'en') {
  const labels = {
    en: { apartment: 'Apartment', house: 'House', sublet: 'Sublet', hostel: 'Hostel', office: 'Office' },
    bn: { apartment: 'অ্যাপার্টমেন্ট', house: 'বাড়ি', sublet: 'সাবলেট', hostel: 'হোস্টেল', office: 'অফিস' },
  }
  return labels[lang]?.[type] || type
}

/**
 * Budget range filter helper
 */
export function matchesBudget(price, budget) {
  switch (budget) {
    case 'under5k':   return price < 5000
    case '5k_10k':    return price >= 5000 && price <= 10000
    case '10k_20k':   return price > 10000 && price <= 20000
    case '20k_35k':   return price > 20000 && price <= 35000
    case 'above35k':  return price > 35000
    default:          return true
  }
}

/**
 * Stars to array for rendering
 */
export function starsArray(rating) {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating))
}

/**
 * Debounce
 */
export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
