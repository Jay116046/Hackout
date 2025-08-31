import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, googleProvider } from '../firebase'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsAuthenticated(!!currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    setUser(result.user)
    setIsAuthenticated(true)
    return result.user
  }

  const signUp = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    setUser(result.user)
    setIsAuthenticated(true)
    return result.user
  }

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    setUser(result.user)
    setIsAuthenticated(true)
    return result.user
  }

  const setUserRole = (role) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem('userData', JSON.stringify({ role }))
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('userData')
  }

  const value = {
    user,
    isAuthenticated,
    login,
    signUp,
    signInWithGoogle,
    setUserRole,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
