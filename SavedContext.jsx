// src/context/SavedContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const SavedContext = createContext(null)
const STORAGE_KEY = 'bashabari_saved'

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {}
  }, [saved])

  const toggleSave = (propertyId, propertyTitle) => {
    setSaved(prev => {
      if (prev.includes(propertyId)) {
        toast('Removed from saved', { icon: '🗑️' })
        return prev.filter(id => id !== propertyId)
      } else {
        toast.success('Saved to your list!')
        return [...prev, propertyId]
      }
    })
  }

  const isSaved = (propertyId) => saved.includes(propertyId)

  return (
    <SavedContext.Provider value={{ saved, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  const ctx = useContext(SavedContext)
  if (!ctx) throw new Error('useSaved must be used within SavedProvider')
  return ctx
}
