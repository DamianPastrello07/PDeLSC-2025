"use client"

import { Redirect } from "expo-router"
import { useAuth } from "@/contexts/AuthContext"
import { View, ActivityIndicator } from "react-native"

export default function Index() {
  const { session, user, loading } = useAuth()

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    )
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />
  }

  // Redirect based on role
  if (user?.role === "admin") {
    return <Redirect href="/(tabs)/admin" />
  } else if (user?.role === "empleado") {
    return <Redirect href="/(tabs)/empleado" />
  } else {
    return <Redirect href="/(tabs)/cliente" />
  }
}
