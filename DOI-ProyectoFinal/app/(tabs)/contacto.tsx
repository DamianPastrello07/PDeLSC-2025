"use client"

import { View, Text, ScrollView, TextInput, Pressable, Alert } from "react-native"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Mail, Phone, MapPin, Send } from "lucide-react-native"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras"),
  apellido: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras"),
  email: z.string().email("Email inválido"),
  telefono: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/^[0-9\s\-+$$$$]+$/, "Solo números"),
  mensaje: z.string().min(10, "Mínimo 10 caracteres"),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactoScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      mensaje: "",
    },
  })

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        mensaje: data.mensaje,
        estado: "pendiente",
      })

      if (error) throw error

      Alert.alert("Mensaje enviado", "Nos pondremos en contacto contigo pronto")
      reset()
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el mensaje")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-primary/10 px-4 py-8">
        <Text className="text-3xl font-bold text-center text-foreground mb-3">Contáctanos</Text>
        <Text className="text-center text-muted-foreground">Estamos aquí para ayudarte</Text>
      </View>

      <View className="px-4 py-8 gap-6">
        {/* Contact Info */}
        <View className="gap-4">
          <View className="flex-row items-center gap-3 bg-card border border-border rounded-lg p-4">
            <Phone size={24} color="#3b82f6" />
            <View>
              <Text className="font-semibold">Teléfono</Text>
              <Text className="text-muted-foreground">223 123 4567</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 bg-card border border-border rounded-lg p-4">
            <Mail size={24} color="#3b82f6" />
            <View>
              <Text className="font-semibold">Email</Text>
              <Text className="text-muted-foreground">info@doi.com.ar</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 bg-card border border-border rounded-lg p-4">
            <MapPin size={24} color="#3b82f6" />
            <View>
              <Text className="font-semibold">Dirección</Text>
              <Text className="text-muted-foreground">San Martín 123, Mar del Plata</Text>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View className="bg-card border border-border rounded-lg p-4">
          <Text className="text-xl font-bold mb-4">Envíanos un mensaje</Text>

          <View className="gap-4">
            <View>
              <Text className="mb-2 font-medium">Nombre *</Text>
              <Controller
                control={control}
                name="nombre"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-border rounded-lg px-3 py-2 bg-background"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Juan"
                  />
                )}
              />
              {errors.nombre && <Text className="text-destructive text-sm mt-1">{errors.nombre.message}</Text>}
            </View>

            <View>
              <Text className="mb-2 font-medium">Apellido *</Text>
              <Controller
                control={control}
                name="apellido"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-border rounded-lg px-3 py-2 bg-background"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Pérez"
                  />
                )}
              />
              {errors.apellido && <Text className="text-destructive text-sm mt-1">{errors.apellido.message}</Text>}
            </View>

            <View>
              <Text className="mb-2 font-medium">Email *</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-border rounded-lg px-3 py-2 bg-background"
                    value={value}
                    onChangeText={onChange}
                    placeholder="juan@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && <Text className="text-destructive text-sm mt-1">{errors.email.message}</Text>}
            </View>

            <View>
              <Text className="mb-2 font-medium">Teléfono *</Text>
              <Controller
                control={control}
                name="telefono"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-border rounded-lg px-3 py-2 bg-background"
                    value={value}
                    onChangeText={onChange}
                    placeholder="223 123 4567"
                    keyboardType="phone-pad"
                  />
                )}
              />
              {errors.telefono && <Text className="text-destructive text-sm mt-1">{errors.telefono.message}</Text>}
            </View>

            <View>
              <Text className="mb-2 font-medium">Mensaje *</Text>
              <Controller
                control={control}
                name="mensaje"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-border rounded-lg px-3 py-2 bg-background"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Escribe tu mensaje aquí..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                )}
              />
              {errors.mensaje && <Text className="text-destructive text-sm mt-1">{errors.mensaje.message}</Text>}
            </View>

            <Pressable
              className="bg-primary px-6 py-3 rounded-lg flex-row items-center justify-center"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Send size={16} color="white" className="mr-2" />
              <Text className="text-primary-foreground font-semibold">
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
