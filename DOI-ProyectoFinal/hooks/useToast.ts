"use client"

import { useState, useCallback } from "react"
import { Alert } from "react-native"

export type ToastType = "success" | "error" | "info" | "warning"

export interface ToastOptions {
  title: string
  description?: string
  type?: ToastType
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([])

  const toast = useCallback((options: ToastOptions) => {
    const { title, description, type = "info" } = options

    // In React Native, we use Alert for toast-like notifications
    // For a more sophisticated solution, consider using react-native-toast-message
    Alert.alert(title, description, [{ text: "OK", style: type === "error" ? "destructive" : "default" }], {
      cancelable: true,
    })

    setToasts((prev) => [...prev, options])
  }, [])

  const success = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: "success" })
    },
    [toast],
  )

  const error = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: "error" })
    },
    [toast],
  )

  const info = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: "info" })
    },
    [toast],
  )

  const warning = useCallback(
    (title: string, description?: string) => {
      toast({ title, description, type: "warning" })
    },
    [toast],
  )

  return {
    toast,
    success,
    error,
    info,
    warning,
    toasts,
  }
}
