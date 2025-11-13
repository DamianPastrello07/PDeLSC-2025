"use client"

import { Tabs, Redirect } from "expo-router"
import { useAuth } from "@/contexts/AuthContext"
import { View, ActivityIndicator } from "react-native"

export default function TabsLayout() {
  const { session, loading } = useAuth()

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

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="admin"
        options={{
          href: null, // Hidden by default
        }}
      />
      <Tabs.Screen
        name="empleado"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="cliente"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}
