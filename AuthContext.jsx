// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext(null)

// Admin emails (in production, use Firestore roles)
const ADMIN_EMAILS = ['admin@bashabari.com', 'imtehan@bashabari.com']

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid:         firebaseUser.uid,
          email:       firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL:    firebaseUser.photoURL,
          isAdmin:     ADMIN_EMAILS.includes(firebaseUser.email),
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const signup = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    return cred
  }

  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider())

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
