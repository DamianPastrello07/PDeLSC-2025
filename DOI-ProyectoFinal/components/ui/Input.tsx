"use client"

import { TextInput, Text, View } from "react-native"
import type { ReactNode } from "react"

type InputProps = {
  label?: string
  value: string
  onChangeText: (text: string) => void
  onBlur?: () => void
  placeholder?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  secureTextEntry?: boolean
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
  multiline?: boolean
  numberOfLines?: number
  editable?: boolean
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  className?: string
}

export function Input({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  editable = true,
  autoCapitalize = "sentences",
  className = "",
}: InputProps) {
  return (
    <View className="gap-2">
      {label && <Text className="font-medium text-sm text-foreground">{label}</Text>}

      <View className="relative">
        {leftIcon && <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">{leftIcon}</View>}

        <TextInput
          className={`border rounded-lg px-3 py-2 bg-background text-base ${
            error ? "border-destructive" : "border-border"
          } ${multiline ? "min-h-[80px]" : ""} ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""} ${className}`}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          autoCapitalize={autoCapitalize}
          textAlignVertical={multiline ? "top" : "center"}
        />

        {rightIcon && <View className="absolute right-3 top-1/2 -translate-y-1/2 z-10">{rightIcon}</View>}
      </View>

      {error && <Text className="text-destructive text-sm">{error}</Text>}
      {helperText && !error && <Text className="text-muted-foreground text-sm">{helperText}</Text>}
    </View>
  )
}
