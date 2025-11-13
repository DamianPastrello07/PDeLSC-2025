import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import * as AuthSession from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import "react-native-url-polyfill/auto"

// Required for expo-auth-session
WebBrowser.maybeCompleteAuthSession()

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Social Auth Configuration
const redirectTo = AuthSession.makeRedirectUri()

// Google OAuth Configuration
export const googleAuth = {
  async signIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    })

    if (error) throw error

    if (data?.url) {
      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo)

      if (result.type === "success") {
        const url = result.url
        const params = new URL(url).searchParams
        const accessToken = params.get("access_token")
        const refreshToken = params.get("refresh_token")

        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
        }
      }
    }
  },
}

// Facebook OAuth Configuration
export const facebookAuth = {
  async signIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    })

    if (error) throw error

    if (data?.url) {
      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo)

      if (result.type === "success") {
        const url = result.url
        const params = new URL(url).searchParams
        const accessToken = params.get("access_token")
        const refreshToken = params.get("refresh_token")

        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
        }
      }
    }
  },
}

// Types
export type UserProfile = {
  id: string
  email: string
  nombre: string
  apellido: string
  dni: string
  telefono: string
  role: "admin" | "empleado" | "cliente"
  created_at: string
}

export type Patient = {
  id: string
  nombre: string
  apellido: string
  dni: string
  fecha_nacimiento: string
  telefono: string
  email: string
  direccion: string
  obra_social: string
  created_at: string
}

export type Appointment = {
  id: string
  patient_name: string
  patient_email: string
  patient_phone: string
  appointment_date: string
  appointment_time: string
  study_type: string
  status: "solicitado" | "confirmado" | "completado"
  notes?: string
  assigned_to?: string
  created_at: string
}

export type Study = {
  id: string
  patient_dni: string
  patient_name: string
  study_type: string
  study_date: string
  observations: string
  created_at: string
}

export type StudyImage = {
  id: string
  study_id: string
  image_url: string
  thumbnail_url: string
  created_at: string
}
