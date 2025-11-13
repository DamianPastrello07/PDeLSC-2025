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
  ActivityIndicator,
} from "react-native"
import { useRouter } from "expo-router"
import { useAuth } from "@/contexts/AuthContext"
import { StatusBar } from "expo-status-bar"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginScreen() {
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null)
  const { signIn, signInWithGoogle, signInWithFacebook } = useAuth()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      await signIn(data.email, data.password)
      // Redirect handled by AuthContext
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setSocialLoading("google")
    try {
      await signInWithGoogle()
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión con Google")
    } finally {
      setSocialLoading(null)
    }
  }

  const handleFacebookSignIn = async () => {
    setSocialLoading("facebook")
    try {
      await signInWithFacebook()
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión con Facebook")
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 justify-center px-6 py-8">
          <View className="mb-8">
            <Text className="text-4xl font-bold text-primary mb-2">Bienvenido</Text>
            <Text className="text-lg text-secondary">Inicia sesión para continuar</Text>
          </View>

          <View className="space-y-4">
            {/* Email Input */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 text-base bg-white`}
                    placeholder="correo@ejemplo.com"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!loading}
                  />
                )}
              />
              {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>}
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Contraseña</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 text-base bg-white`}
                    placeholder="••••••••"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    editable={!loading}
                  />
                )}
              />
              {errors.password && <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>}
            </View>

            <TouchableOpacity onPress={() => router.push("/(auth)/forgot-password")} disabled={loading}>
              <Text className="text-primary text-right text-sm">¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className={`bg-primary rounded-lg py-4 items-center ${loading ? "opacity-50" : ""}`}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-base">Iniciar Sesión</Text>
              )}
            </TouchableOpacity>

            {/* Social Login Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500">O continúa con</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Login Buttons */}
            <View className="space-y-3">
              {/* Google Button */}
              <TouchableOpacity
                className="border border-gray-300 rounded-lg py-3 items-center flex-row justify-center"
                onPress={handleGoogleSignIn}
                disabled={!!socialLoading}
              >
                {socialLoading === "google" ? (
                  <ActivityIndicator color="#4285F4" />
                ) : (
                  <>
                    <Text className="text-base font-medium mr-2">🔵</Text>
                    <Text className="text-base font-medium">Google</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Facebook Button */}
              <TouchableOpacity
                className="border border-gray-300 rounded-lg py-3 items-center flex-row justify-center"
                onPress={handleFacebookSignIn}
                disabled={!!socialLoading}
              >
                {socialLoading === "facebook" ? (
                  <ActivityIndicator color="#1877F2" />
                ) : (
                  <>
                    <Text className="text-base font-medium mr-2">🔵</Text>
                    <Text className="text-base font-medium">Facebook</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-secondary">¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")} disabled={loading}>
                <Text className="text-primary font-semibold">Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
