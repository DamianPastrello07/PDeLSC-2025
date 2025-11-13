"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { supabase, type Appointment, type Study } from "@/lib/supabase"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"

export default function ClienteScreen() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"appointments" | "studies">("appointments")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [studies, setStudies] = useState<Study[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    if (activeTab === "appointments") {
      await fetchAppointments()
    } else {
      await fetchStudies()
    }
    setLoading(false)
  }

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_email", user?.email)
        .order("appointment_date", { ascending: true })

      if (error) throw error
      setAppointments(data || [])
    } catch (error: any) {
      Alert.alert("Error", "No se pudieron cargar los turnos")
    }
  }

  const fetchStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("studies")
        .select("*")
        .eq("patient_dni", user?.dni)
        .order("study_date", { ascending: false })

      if (error) throw error
      setStudies(data || [])
    } catch (error: any) {
      Alert.alert("Error", "No se pudieron cargar los estudios")
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
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
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-2xl font-bold text-primary">Portal del Paciente</Text>
            <Text className="text-sm text-secondary">
              Bienvenido, {user?.nombre} {user?.apellido}
            </Text>
          </View>
          <TouchableOpacity onPress={handleSignOut} className="bg-gray-100 px-4 py-2 rounded-lg">
            <Text className="text-destructive font-medium">Salir</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row mt-4 gap-2">
          <TouchableOpacity
            onPress={() => setActiveTab("appointments")}
            className={`flex-1 py-3 rounded-lg ${activeTab === "appointments" ? "bg-primary" : "bg-gray-100"}`}
          >
            <Text
              className={`text-center font-semibold ${activeTab === "appointments" ? "text-white" : "text-secondary"}`}
            >
              Mis Turnos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("studies")}
            className={`flex-1 py-3 rounded-lg ${activeTab === "studies" ? "bg-primary" : "bg-gray-100"}`}
          >
            <Text className={`text-center font-semibold ${activeTab === "studies" ? "text-white" : "text-secondary"}`}>
              Mis Estudios
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="p-4">
          {activeTab === "appointments" ? (
            <View>
              <Text className="text-lg font-semibold text-foreground mb-4">Turnos Programados</Text>
              {appointments.length === 0 ? (
                <View className="bg-white rounded-lg p-6 items-center">
                  <Text className="text-secondary text-center">No tienes turnos programados</Text>
                </View>
              ) : (
                appointments.map((appointment) => (
                  <View key={appointment.id} className="bg-white rounded-lg p-4 mb-3">
                    <View className="flex-row justify-between items-start mb-2">
                      <Text className="text-lg font-semibold text-foreground flex-1">{appointment.study_type}</Text>
                      <View
                        className={`px-3 py-1 rounded-full ${
                          appointment.status === "confirmado"
                            ? "bg-green-100"
                            : appointment.status === "completado"
                              ? "bg-blue-100"
                              : "bg-yellow-100"
                        }`}
                      >
                        <Text
                          className={`text-xs font-medium ${
                            appointment.status === "confirmado"
                              ? "text-green-700"
                              : appointment.status === "completado"
                                ? "text-blue-700"
                                : "text-yellow-700"
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-secondary mb-1">
                      Fecha: {new Date(appointment.appointment_date).toLocaleDateString()}
                    </Text>
                    <Text className="text-secondary mb-1">Hora: {appointment.appointment_time}</Text>
                    {appointment.notes && (
                      <Text className="text-sm text-secondary mt-2">Notas: {appointment.notes}</Text>
                    )}
                  </View>
                ))
              )}
            </View>
          ) : (
            <View>
              <Text className="text-lg font-semibold text-foreground mb-4">Estudios Realizados</Text>
              {studies.length === 0 ? (
                <View className="bg-white rounded-lg p-6 items-center">
                  <Text className="text-secondary text-center">No tienes estudios registrados</Text>
                </View>
              ) : (
                studies.map((study) => (
                  <View key={study.id} className="bg-white rounded-lg p-4 mb-3">
                    <Text className="text-lg font-semibold text-foreground mb-2">{study.study_type}</Text>
                    <Text className="text-secondary mb-1">
                      Fecha: {new Date(study.study_date).toLocaleDateString()}
                    </Text>
                    <Text className="text-secondary mb-1">Paciente: {study.patient_name}</Text>
                    {study.observations && (
                      <Text className="text-sm text-secondary mt-2">Observaciones: {study.observations}</Text>
                    )}
                  </View>
                ))
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
