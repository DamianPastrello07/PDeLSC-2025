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
import { useAuth } from "@/contexts/AuthContext"
import { StatusBar } from "expo-status-bar"

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleRegister = async () => {
    // Validations
    if (Object.values(formData).some((val) => !val)) {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }

    if (formData.password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)
    try {
      await signUp(formData.email, formData.password, {
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: formData.dni,
        telefono: formData.telefono,
        role: "cliente",
      })
      Alert.alert("Éxito", "Registro exitoso. Por favor verifica tu email.")
      router.push("/(auth)/login")
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 px-6 py-8">
          <View className="mb-6">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary text-base">← Volver</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-3xl font-bold text-primary mb-2">Crear Cuenta</Text>
            <Text className="text-base text-secondary">Completa tus datos para registrarte</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Nombre</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                placeholder="Juan"
                value={formData.nombre}
                onChangeText={(text) => setFormData({ ...formData, nombre: text })}
                editable={!loading}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Apellido</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                placeholder="Pérez"
                value={formData.apellido}
                onChangeText={(text) => setFormData({ ...formData, apellido: text })}
                editable={!loading}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">DNI</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                placeholder="12345678"
                value={formData.dni}
                onChangeText={(text) => setFormData({ ...formData, dni: text })}
                keyboardType="numeric"
                editable={!loading}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Teléfono</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                placeholder="1234567890"
                value={formData.telefono}
                onChangeText={(text) => setFormData({ ...formData, telefono: text })}
                keyboardType="phone-pad"
                editable={!loading}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Contraseña</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                placeholder="••••••••"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry
                editable={!loading}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Confirmar Contraseña</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              className={`bg-primary rounded-lg py-4 items-center mt-4 ${loading ? "opacity-50" : ""}`}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text className="text-white font-semibold text-base">{loading ? "Registrando..." : "Registrarse"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
