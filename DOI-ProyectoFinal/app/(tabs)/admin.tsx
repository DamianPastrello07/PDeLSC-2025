"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert, Modal } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { supabase, type UserProfile } from "@/lib/supabase"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"
import { Picker } from "@react-native-picker/picker"

export default function AdminScreen() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [newRole, setNewRole] = useState<"admin" | "empleado" | "cliente">("cliente")
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error: any) {
      Alert.alert("Error", "No se pudieron cargar los usuarios")
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchUsers()
    setRefreshing(false)
  }

  const handleUpdateRole = async () => {
    if (!selectedUser) return

    try {
      const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", selectedUser.id)

      if (error) throw error

      Alert.alert("Éxito", "Rol actualizado correctamente")
      await fetchUsers()
      setModalVisible(false)
    } catch (error: any) {
      Alert.alert("Error", "No se pudo actualizar el rol")
    }
  }

  const handleSignOut = async () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar Sesión",
        onPress: async () => {
          await signOut()
          router.replace("/(auth)/login")
        },
      },
    ])
  }

  return (
    <View className="flex-1 bg-muted">
      <StatusBar style="auto" />

      {/* Header */}
      <View className="bg-white border-b border-gray-200 pt-12 pb-4 px-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-primary">Panel de Administración</Text>
            <Text className="text-sm text-secondary">
              Bienvenido, {user?.nombre} {user?.apellido}
            </Text>
          </View>
          <TouchableOpacity onPress={handleSignOut} className="bg-gray-100 px-4 py-2 rounded-lg">
            <Text className="text-destructive font-medium">Salir</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="p-4">
          <Text className="text-lg font-semibold text-foreground mb-4">Gestión de Usuarios</Text>
          {users.length === 0 ? (
            <View className="bg-white rounded-lg p-6 items-center">
              <Text className="text-secondary text-center">No hay usuarios registrados</Text>
            </View>
          ) : (
            users.map((userItem) => (
              <TouchableOpacity
                key={userItem.id}
                onPress={() => {
                  setSelectedUser(userItem)
                  setNewRole(userItem.role)
                  setModalVisible(true)
                }}
                className="bg-white rounded-lg p-4 mb-3"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-foreground">
                      {userItem.nombre} {userItem.apellido}
                    </Text>
                    <Text className="text-secondary text-sm">{userItem.email}</Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      userItem.role === "admin"
                        ? "bg-red-100"
                        : userItem.role === "empleado"
                          ? "bg-blue-100"
                          : "bg-green-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        userItem.role === "admin"
                          ? "text-red-700"
                          : userItem.role === "empleado"
                            ? "text-blue-700"
                            : "text-green-700"
                      }`}
                    >
                      {userItem.role.charAt(0).toUpperCase() + userItem.role.slice(1)}
                    </Text>
                  </View>
                </View>
                <Text className="text-secondary text-sm">DNI: {userItem.dni}</Text>
                <Text className="text-secondary text-sm">Tel: {userItem.telefono}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal for role update */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            {selectedUser && (
              <>
                <Text className="text-2xl font-bold text-foreground mb-4">Cambiar Rol de Usuario</Text>
                <View className="mb-4">
                  <Text className="text-foreground font-semibold mb-2">
                    {selectedUser.nombre} {selectedUser.apellido}
                  </Text>
                  <Text className="text-secondary text-sm mb-1">{selectedUser.email}</Text>
                  <Text className="text-secondary text-sm">Rol actual: {selectedUser.role}</Text>
                </View>

                <Text className="text-foreground font-medium mb-2">Nuevo Rol:</Text>
                <View className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
                  <Picker selectedValue={newRole} onValueChange={(value) => setNewRole(value)}>
                    <Picker.Item label="Cliente" value="cliente" />
                    <Picker.Item label="Empleado" value="empleado" />
                    <Picker.Item label="Admin" value="admin" />
                  </Picker>
                </View>

                <View className="gap-3">
                  <TouchableOpacity onPress={handleUpdateRole} className="bg-primary py-3 rounded-lg">
                    <Text className="text-white text-center font-semibold">Actualizar Rol</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-gray-200 py-3 rounded-lg">
                    <Text className="text-foreground text-center font-semibold">Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}
