"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native"
import { useRouter } from "expo-router"
import { supabase } from "@/lib/supabase"
import { StatusBar } from "expo-status-bar"

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa tu email")
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error

      Alert.alert("Éxito", "Se ha enviado un link de recuperación a tu email", [
        { text: "OK", onPress: () => router.back() },
      ])
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al enviar email de recuperación")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 justify-center px-6">
          <View className="mb-6">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary text-base">← Volver</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-8">
            <Text className="text-3xl font-bold text-primary mb-2">Recuperar Contraseña</Text>
            <Text className="text-base text-secondary">
              Ingresa tu email y te enviaremos instrucciones para recuperar tu contraseña
            </Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                placeholder="correo@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              className={`bg-primary rounded-lg py-4 items-center ${loading ? "opacity-50" : ""}`}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text className="text-white font-semibold text-base">
                {loading ? "Enviando..." : "Enviar Instrucciones"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
