"use client"

import { View, Text, ScrollView, Alert } from "react-native"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react-native"
import { Picker } from "@react-native-picker/picker"

type Profile = {
  id: string
  email: string
  nombre: string
  apellido: string
  dni: string
  role: "admin" | "empleado" | "cliente"
  created_at: string
}

export default function UsersManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    loadProfiles()
    getCurrentUser()
  }, [])

  async function getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) setCurrentUserId(user.id)
  }

  async function loadProfiles() {
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProfiles(data || [])
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los usuarios")
    } finally {
      setIsLoading(false)
    }
  }

  async function updateUserRole(userId: string, newRole: string) {
    if (userId === currentUserId) {
      Alert.alert("Acción no permitida", "No puedes cambiar tu propio rol")
      return
    }

    try {
      const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", userId)

      if (error) throw error

      setProfiles(profiles.map((p) => (p.id === userId ? { ...p, role: newRole as Profile["role"] } : p)))

      Alert.alert("Éxito", "Rol actualizado correctamente")
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el rol")
    }
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loader2 size={32} color="#3b82f6" />
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-2xl font-bold mb-4">Gestión de Usuarios</Text>

      <View className="gap-4">
        {profiles.map((profile) => (
          <View key={profile.id} className="bg-card border border-border rounded-lg p-4">
            <Text className="font-bold text-lg">
              {profile.nombre} {profile.apellido}
            </Text>
            <Text className="text-muted-foreground">{profile.email}</Text>
            <Text className="text-muted-foreground">DNI: {profile.dni}</Text>

            <View className="mt-3">
              <Text className="font-medium mb-2">Rol:</Text>
              <View className="border border-border rounded-lg">
                <Picker
                  selectedValue={profile.role}
                  onValueChange={(value) => updateUserRole(profile.id, value)}
                  enabled={profile.id !== currentUserId}
                >
                  <Picker.Item label="Cliente" value="cliente" />
                  <Picker.Item label="Empleado" value="empleado" />
                  <Picker.Item label="Admin" value="admin" />
                </Picker>
              </View>
              {profile.id === currentUserId && <Text className="text-xs text-muted-foreground mt-1">(Tu cuenta)</Text>}
            </View>

            <Text className="text-xs text-muted-foreground mt-2">
              Registrado: {new Date(profile.created_at).toLocaleDateString("es-ES")}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
