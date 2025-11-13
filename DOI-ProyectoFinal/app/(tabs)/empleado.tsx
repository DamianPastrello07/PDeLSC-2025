"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert, Modal } from "react-native"
import { useAuth } from "@/contexts/AuthContext"
import { supabase, type Appointment, type Patient } from "@/lib/supabase"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"

export default function EmpleadoScreen() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"appointments" | "patients" | "upload">("appointments")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    if (activeTab === "appointments") {
      await fetchAppointments()
    } else if (activeTab === "patients") {
      await fetchPatients()
    }
  }

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true })

      if (error) throw error
      setAppointments(data || [])
    } catch (error: any) {
      Alert.alert("Error", "No se pudieron cargar los turnos")
    }
  }

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase.from("patients").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setPatients(data || [])
    } catch (error: any) {
      Alert.alert("Error", "No se pudieron cargar los pacientes")
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  const handleUpdateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("appointments").update({ status: newStatus }).eq("id", appointmentId)

      if (error) throw error

      Alert.alert("Éxito", "Estado del turno actualizado")
      await fetchAppointments()
      setModalVisible(false)
    } catch (error: any) {
      Alert.alert("Error", "No se pudo actualizar el estado")
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
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-2xl font-bold text-primary">Panel de Empleado</Text>
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
              className={`text-center font-semibold text-xs ${
                activeTab === "appointments" ? "text-white" : "text-secondary"
              }`}
            >
              Turnos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("patients")}
            className={`flex-1 py-3 rounded-lg ${activeTab === "patients" ? "bg-primary" : "bg-gray-100"}`}
          >
            <Text
              className={`text-center font-semibold text-xs ${
                activeTab === "patients" ? "text-white" : "text-secondary"
              }`}
            >
              Pacientes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("upload")}
            className={`flex-1 py-3 rounded-lg ${activeTab === "upload" ? "bg-primary" : "bg-gray-100"}`}
          >
            <Text
              className={`text-center font-semibold text-xs ${
                activeTab === "upload" ? "text-white" : "text-secondary"
              }`}
            >
              Estudios
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="p-4">
          {activeTab === "appointments" && (
            <View>
              <Text className="text-lg font-semibold text-foreground mb-4">Gestión de Turnos</Text>
              {appointments.length === 0 ? (
                <View className="bg-white rounded-lg p-6 items-center">
                  <Text className="text-secondary text-center">No hay turnos registrados</Text>
                </View>
              ) : (
                appointments.map((appointment) => (
                  <TouchableOpacity
                    key={appointment.id}
                    onPress={() => {
                      setSelectedAppointment(appointment)
                      setModalVisible(true)
                    }}
                    className="bg-white rounded-lg p-4 mb-3"
                  >
                    <View className="flex-row justify-between items-start mb-2">
                      <Text className="text-lg font-semibold text-foreground flex-1">{appointment.patient_name}</Text>
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
                    <Text className="text-secondary mb-1">Estudio: {appointment.study_type}</Text>
                    <Text className="text-secondary mb-1">
                      Fecha: {new Date(appointment.appointment_date).toLocaleDateString()}
                    </Text>
                    <Text className="text-secondary">Hora: {appointment.appointment_time}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          {activeTab === "patients" && (
            <View>
              <Text className="text-lg font-semibold text-foreground mb-4">Lista de Pacientes</Text>
              {patients.length === 0 ? (
                <View className="bg-white rounded-lg p-6 items-center">
                  <Text className="text-secondary text-center">No hay pacientes registrados</Text>
                </View>
              ) : (
                patients.map((patient) => (
                  <View key={patient.id} className="bg-white rounded-lg p-4 mb-3">
                    <Text className="text-lg font-semibold text-foreground mb-2">
                      {patient.nombre} {patient.apellido}
                    </Text>
                    <Text className="text-secondary mb-1">DNI: {patient.dni}</Text>
                    <Text className="text-secondary mb-1">Tel: {patient.telefono}</Text>
                    <Text className="text-secondary mb-1">Email: {patient.email}</Text>
                    {patient.obra_social && <Text className="text-secondary">Obra Social: {patient.obra_social}</Text>}
                  </View>
                ))
              )}
            </View>
          )}

          {activeTab === "upload" && (
            <View className="bg-white rounded-lg p-6">
              <Text className="text-lg font-semibold text-foreground mb-2">Cargar Estudios</Text>
              <Text className="text-secondary text-center">
                La carga de estudios requiere permisos de cámara y galería. Esta funcionalidad estará disponible
                próximamente.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal for appointment details */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            {selectedAppointment && (
              <>
                <Text className="text-2xl font-bold text-foreground mb-4">Detalles del Turno</Text>
                <View className="mb-4">
                  <Text className="text-secondary mb-1">Paciente: {selectedAppointment.patient_name}</Text>
                  <Text className="text-secondary mb-1">Email: {selectedAppointment.patient_email}</Text>
                  <Text className="text-secondary mb-1">Teléfono: {selectedAppointment.patient_phone}</Text>
                  <Text className="text-secondary mb-1">Estudio: {selectedAppointment.study_type}</Text>
                  <Text className="text-secondary mb-1">
                    Fecha: {new Date(selectedAppointment.appointment_date).toLocaleDateString()}
                  </Text>
                  <Text className="text-secondary mb-1">Hora: {selectedAppointment.appointment_time}</Text>
                </View>

                <Text className="text-lg font-semibold text-foreground mb-3">Cambiar Estado</Text>
                <View className="gap-3 mb-4">
                  <TouchableOpacity
                    onPress={() => handleUpdateAppointmentStatus(selectedAppointment.id, "confirmado")}
                    className="bg-green-500 py-3 rounded-lg"
                  >
                    <Text className="text-white text-center font-semibold">Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleUpdateAppointmentStatus(selectedAppointment.id, "completado")}
                    className="bg-blue-500 py-3 rounded-lg"
                  >
                    <Text className="text-white text-center font-semibold">Completado</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-gray-200 py-3 rounded-lg">
                  <Text className="text-foreground text-center font-semibold">Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}
