"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase, googleAuth, facebookAuth, type UserProfile } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"
import AsyncStorage from "@react-native-async-storage/async-storage"

type AuthContextType = {
  session: Session | null
  user: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user.id)
        // Store tokens for API client
        storeTokens(session)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Auth state changed:", event)
      setSession(session)

      if (session?.user) {
        fetchUserProfile(session.user.id)
        await storeTokens(session)
      } else {
        setUser(null)
        setLoading(false)
        await clearTokens()
      }

      // Handle token refresh
      if (event === "TOKEN_REFRESHED") {
        console.log("[v0] Token refreshed")
        await storeTokens(session!)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const storeTokens = async (session: Session) => {
    try {
      await AsyncStorage.multiSet([
        ["access_token", session.access_token],
        ["refresh_token", session.refresh_token || ""],
        ["user_session", JSON.stringify(session)],
      ])
    } catch (error) {
      console.error("[v0] Error storing tokens:", error)
    }
  }

  const clearTokens = async () => {
    try {
      await AsyncStorage.multiRemove(["access_token", "refresh_token", "user_session"])
    } catch (error) {
      console.error("[v0] Error clearing tokens:", error)
    }
  }

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) throw error
      setUser(data)
    } catch (error) {
      console.error("[v0] Error fetching user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    try {
      await googleAuth.signIn()
    } catch (error) {
      console.error("[v0] Google sign in error:", error)
      throw error
    }
  }

  const signInWithFacebook = async () => {
    try {
      await facebookAuth.signIn()
    } catch (error) {
      console.error("[v0] Facebook sign in error:", error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    await clearTokens()
  }

  const refreshUser = async () => {
    if (session?.user) {
      await fetchUserProfile(session.user.id)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signInWithGoogle,
        signInWithFacebook,
        signUp,
        signOut,
        refreshUser,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
