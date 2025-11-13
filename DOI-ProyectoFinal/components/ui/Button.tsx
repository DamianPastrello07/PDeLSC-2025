import { Pressable, Text, ActivityIndicator, View } from "react-native"
import type { ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
  onPress?: () => void
  variant?: "default" | "outline" | "destructive" | "ghost" | "secondary"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

export function Button({
  children,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
}: ButtonProps) {
  const baseClasses = "flex-row items-center justify-center rounded-lg"

  const variantClasses = {
    default: "bg-primary",
    secondary: "bg-secondary",
    outline: "border border-border bg-transparent",
    destructive: "bg-destructive",
    ghost: "bg-transparent",
  }

  const sizeClasses = {
    sm: "px-3 py-2",
    default: "px-4 py-3",
    lg: "px-6 py-4",
  }

  const textVariantClasses = {
    default: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    outline: "text-foreground",
    destructive: "text-destructive-foreground",
    ghost: "text-foreground",
  }

  const textSizeClasses = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-lg",
  }

  return (
    <Pressable
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled || loading ? "opacity-50" : ""}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" || variant === "ghost" ? "#000" : "#fff"} />
      ) : (
        <View className="flex-row items-center">
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          {typeof children === "string" ? (
            <Text className={`font-semibold ${textVariantClasses[variant]} ${textSizeClasses[size]}`}>{children}</Text>
          ) : (
            children
          )}
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  )
}
