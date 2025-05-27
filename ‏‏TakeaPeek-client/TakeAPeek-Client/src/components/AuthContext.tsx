"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string | number // הוסף את ה-ID
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  userId: string | number | null // הוסף getter נוח ל-ID
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {

  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const API_BASE_URL = "http://localhost:5293/Auth" // Update to your API URL

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        // פענח את ה-JWT token כדי לקבל את פרטי המשתמש האמיתיים
        const decodedToken = JSON.parse(atob(token.split(".")[1]))
        setUser({
          id: decodedToken.userId || decodedToken.id || decodedToken.sub,
          name: decodedToken.name || "צלם מקצועי",
          email: decodedToken.email || "user@example.com",
          role: decodedToken.role || "Editor",
        })
        setIsAuthenticated(true)
      } catch (error) {
        // אם יש בעיה עם ה-token, נקה אותו
        localStorage.removeItem("token")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch( `${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
console.log("Login successful, token:", data.token)
        // פענח את ה-token כדי לקבל את פרטי המשתמש
        const decodedToken = JSON.parse(atob(data.token.split(".")[1]))
        setUser({
          id: decodedToken.userId || decodedToken.id || decodedToken.sub,
          name: decodedToken.name || email.split("@")[0],
          email,
          role: decodedToken.role || "Editor",
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, roleName: "Editor" }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)

        // פענח את ה-token כדי לקבל את פרטי המשתמש
        const decodedToken = JSON.parse(atob(data.token.split(".")[1]))
        setUser({
          id: decodedToken.userId || decodedToken.id || decodedToken.sub,
          name,
          email,
          role: decodedToken.role || "Editor",
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userId: user?.id || null,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
